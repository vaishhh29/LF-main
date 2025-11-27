import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    Alert,
    Platform,
    ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

/* -------------------------------
   NEW: HIDE TABS ON THIS SCREEN
--------------------------------*/
export default function Editcar() {
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const parent = navigation.getParent();
        parent?.setOptions({ tabBarStyle: { display: "none" } });

        return () => {
            parent?.setOptions({ tabBarStyle: { display: "flex" } });
        };
    }, []);

    const incomingCar = route?.params?.car;
    const carId = route?.params?.carId; // <-- Important

    /**
     * Defaults / master lists
     */
    const CAR_MODELS = [
        "Ford Mustang",
        "Honda Civic",
        "Toyota Camry",
        "Toyota Corolla",
        "BMW 3 Series",
        "Maruti Swift",
    ];
    const CAR_BRANDS = ["Ford", "Honda", "Toyota", "BMW", "Maruti"];
    const YEARS = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
    const COLORS = ["White", "Black", "Silver", "Gray", "Red", "Blue", "Purple"];
    const KM_OPTIONS = [1000, 2000, 4000, 6000, 8000];


    // FALLBACK (firestore shape)
    const fallback = {
        carDetails: {
            description: "",
            fastag: "Yes",
            delivery: "Yes",
            selectedFeatures: [],
        },
        registrationDetails: {
            licenseNumber: "",
            carBrand: "",
            carModel: "",
            carYear: "",
            carColor: "",
            kilometers: 1000,
            rcBookImage: "",
        },
        carImages: {},
        personalDetails: {},
    };

    // Animated opacity (keeps your UI the same)
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Loading
    const [loading, setLoading] = useState(true);

    // Local state mapped from Firestore schema
    const [personalDetails, setPersonalDetails] = useState(fallback.personalDetails);
    const [carDetails, setCarDetails] = useState(fallback.carDetails);
    const [registrationDetails, setRegistrationDetails] = useState(fallback.registrationDetails);
    const [images, setImages] = useState(Object.values(fallback.carImages || {}));

    // UI-specific states (for easier binding)
    const [license, setLicense] = useState("");
    const [rcImage, setRcImage] = useState<string | null>(null);
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    const [kilometers, setKilometers] = useState(1000);
    const [about, setAbout] = useState("");
    const [fastag, setFastag] = useState(true);
    const [delivery, setDelivery] = useState(true);

    // Feature sets
    const [safetyFeatures, setSafetyFeatures] = useState(new Set<string>());
    const [drivingFeatures, setDrivingFeatures] = useState(new Set<string>());
    const [entFeatures, setEntFeatures] = useState(new Set<string>());

    // Dropdown / modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<string[]>([]);
    const [modalTitle, setModalTitle] = useState("");
    const [modalTarget, setModalTarget] = useState<"model" | "brand" | "year" | "color" | null>(null);

    // popup
    const [menuVisible, setMenuVisible] = useState(false);

    // Master feature lists (icons referenced by your assets)
    const SAFETY_LIST = [
        { id: 1, name: "Front Airbags", icon: require("./assets/airbag.png") },
        { id: 2, name: "Side Airbags", icon: require("./assets/airbag.png") },
        { id: 3, name: "Back Airbags", icon: require("./assets/airbag.png") },
        { id: 5, name: "Ventilated Seats", icon: require("./assets/venti.png") },
        { id: 6, name: "360 View Camera", icon: require("./assets/camera.png") },
    ];
    const DRIVING_LIST = [
        { id: 7, name: "Keyless Entry", icon: require("./assets/airbag.png") },
        { id: 8, name: "Spacious Interiors", icon: require("./assets/venti.png") },
        { id: 9, name: "Parking Assist", icon: require("./assets/parking.png") },
        { id: 10, name: "Voice Control", icon: require("./assets/voice.png") },
        { id: 11, name: "Repair", icon: require("./assets/repair.png") },
        { id: 12, name: "powerString", icon: require("./assets/powerString.png") },
    ];
    const ENT_LIST = [
        { id: 13, name: "Music System", icon: require("./assets/music.png") },
        { id: 14, name: "Wifi Connect", icon: require("./assets/wifi.png") },
    ];

    const toggleSet = (setFn: (s: Set<string>) => void, setRef: Set<string>, value: string) => {
        const copy = new Set(setRef);
        if (copy.has(value)) copy.delete(value);
        else copy.add(value);
        setFn(copy);
    };

    // --- Helper safe conversion for Firestore (avoid undefined) ---
    const safe = (v: any) => (v === undefined ? null : v);

    // --- convert Firestore carImages map -> array for UI ---
    const mapToArray = (mapObj: Record<string, any> | undefined) => {
        if (!mapObj) return [];
        // sort by image1, image2...
        const keys = Object.keys(mapObj).sort((a, b) => {
            const na = parseInt(a.replace("image", ""), 10) || 0;
            const nb = parseInt(b.replace("image", ""), 10) || 0;
            return na - nb;
        });
        return keys.map((k) => mapObj[k]);
    };

    // --- convert images array -> map image1/image2 for Firestore ---
    const arrayToMap = (arr: string[]) => {
        const m: Record<string, any> = {};
        arr.forEach((uri, i) => {
            m[`image${i + 1}`] = safe(uri);
        });
        return m;
    };

    // --- load Firestore doc for current user and map into state ---
    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            setLoading(true);
            try {
                const user = auth().currentUser;
                if (!user) {
                    // if not logged in, but incomingCar provided, use it
                    if (incomingCar) {
                        hydrateFromIncoming(incomingCar);
                    }
                    setLoading(false);
                    return;
                }
                const uid = user.uid;
                if (!carId) {
                  console.log("❌ ERROR: carId not passed into Editcar");
                  return;
                }
                const doc = await firestore()
                    .collection("users")
                    .doc(uid)
                    .collection("cars")
                    .doc(carId)
                    .get();
                const data = doc.exists ? doc.data() : null;

                // if no data but incomingCar present, use incomingCar
                const payload = data || incomingCar || fallback;

                if (mounted) hydrateFromIncoming(payload);
            } catch (err) {
                console.log("Load error", err);
                if (incomingCar) hydrateFromIncoming(incomingCar);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadData();

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // populate component state from payload (incomingCar or firestore doc)
    const hydrateFromIncoming = (payload: any) => {
        const pd = payload.personalDetails || {};
        const cd = payload.carDetails || {};
        const rd = payload.registrationDetails || {};
        const ci = payload.carImages || {};

        setPersonalDetails(pd);
        setCarDetails(cd);
        setRegistrationDetails(rd);

        // UI states
        setLicense(rd.licenseNumber || "");
        setRcImage(rd.rcBookImage || null);
        setModel(rd.carModel || "");
        setBrand(rd.carBrand || "");
       setYear(rd.yearOfRegistration || rd.carYear || "");
        setColor(rd.carColor || "");
        setKilometers(rd.kilometers || 1000);

        setAbout(cd.description || "");
        setFastag(cd.fastag === "Yes");
        setDelivery(cd.delivery === "Yes");

        const imagesArr = mapToArray(ci);
        setImages(imagesArr);

        // selectedFeatures into sets
        const selected = cd.selectedFeatures || [];
        setSafetyFeatures(new Set(selected.filter((f) => f.category === "SAFETY").map((f) => f.name)));
        setDrivingFeatures(new Set(selected.filter((f) => f.category === "DRIVING").map((f) => f.name)));
        setEntFeatures(new Set(selected.filter((f) => f.category === "ENTERTAINMENT").map((f) => f.name)));
    };

    // pick image (rc or car)
    const pickImage = async (type: "rc" | "car" = "car") => {
        try {
            const res = await launchImageLibrary({
                mediaType: "photo",
                quality: 0.8,
                selectionLimit: 1,
            });
            const uri = res?.assets?.[0]?.uri;
            if (!uri) return;
            if (type === "rc") {
                setRcImage(uri);
                await AsyncStorage.setItem("rcImage", uri);
            } else {
                setImages((p) => [uri, ...p].slice(0, 6)); // keep max 6
            }
        } catch (err) {
            console.warn("Image pick error", err);
        }
    };

    // remove image
    const removeImageAt = (index: number) => {
        Alert.alert("Remove Image", "Remove this image?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => setImages((p) => p.filter((_, i) => i !== index)),
            },
        ]);
    };

    // dropdown open
    const openDropdown = (target: "model" | "brand" | "year" | "color") => {
        if (target === "model") setModalData(CAR_MODELS);
        if (target === "brand") setModalData(CAR_BRANDS);
        if (target === "year") setModalData(YEARS);
        if (target === "color") setModalData(COLORS);

        setModalTarget(target);
        setModalTitle(
            target === "model" ? "Select Model" : target === "brand" ? "Select Brand" : target === "year" ? "Select Year" : "Select Color"
        );
        setModalVisible(true);
    };

    const selectFromModal = (value: string) => {
        if (modalTarget === "model") setModel(value);
        if (modalTarget === "brand") setBrand(value);
        if (modalTarget === "year") setYear(value);
        if (modalTarget === "color") setColor(value);
        setModalVisible(false);
    };

    // build selectedFeatures array for Firestore
    const buildSelectedFeatures = () => {
        const arr: any[] = [];
        Array.from(safetyFeatures).forEach((name) => {
            const f = SAFETY_LIST.find((x) => x.name === name);
            arr.push({ id: safe(f?.id), name, category: "SAFETY" });
        });
        Array.from(drivingFeatures).forEach((name) => {
            const f = DRIVING_LIST.find((x) => x.name === name);
            arr.push({ id: safe(f?.id), name, category: "DRIVING" });
        });
        Array.from(entFeatures).forEach((name) => {
            const f = ENT_LIST.find((x) => x.name === name);
            arr.push({ id: safe(f?.id), name, category: "ENTERTAINMENT" });
        });
        return arr;
    };

    // SAVE handler -> updates Firestore (and optionally AsyncStorage)
    const handleSave = async () => {
        // minimal validation
        if (!model || !brand || !year) {
            Alert.alert("Please select model, brand and year");
            return;
        }

        const user = auth().currentUser;
        if (!user) {
            Alert.alert("Not logged in");
            return;
        }
        const uid = user.uid;

        // prepare payloads (no undefined allowed)
        const personalDetailsPayload = {
            firstName: safe(personalDetails.firstName),
            lastName: safe(personalDetails.lastName),
            email: safe(personalDetails.email),
            contact: safe(personalDetails.contact),
            fullAddress: safe(personalDetails.fullAddress),
            profilepic: safe(personalDetails.profilepic),
            frontAadhar: safe(personalDetails.frontAadhar),
            BackAadhar: safe(personalDetails.BackAadhar),
            DOB: safe(personalDetails.DOB),
            Gender: safe(personalDetails.Gender),
            aadharNumber: safe(personalDetails.aadharNumber),
            location: safe(personalDetails.location),
            plotNo: safe(personalDetails.plotNo),
            landmark: safe(personalDetails.landmark),
            photoURL: safe(personalDetails.photoURL),
            provider: safe(personalDetails.provider),
        };

        const registrationDetailsPayload = {
            licenseNumber: safe(license),
            carBrand: safe(brand),
            carModel: safe(model),
            carYear: safe(year),
            carColor: safe(color),
            kilometers: safe(kilometers),
            rcBookImage: safe(rcImage),
        };

        const carDetailsPayload = {
            description: safe(about),
            delivery: delivery ? "Yes" : "No",
            fastag: fastag ? "Yes" : "No",
            selectedFeatures: buildSelectedFeatures(),
        };

        const carImagesMap = arrayToMap(images);

        try {
            setLoading(true);
            await firestore()
            .collection("users")
            .doc(uid)
            .collection("cars")
            .doc(carId)
            .update({
                personalDetails: personalDetailsPayload,
                registrationDetails: registrationDetailsPayload,
                carDetails: carDetailsPayload,
                carImages: carImagesMap,
            });
        

            // optional: persist to AsyncStorage
            AsyncStorage.setItem(`car_${uid}`, JSON.stringify({
                personalDetails: personalDetailsPayload,
                registrationDetails: registrationDetailsPayload,
                carDetails: carDetailsPayload,
                carImages: carImagesMap,
            })).catch(() => { });

            // navigate back — pass updated object so CarInList updates UI immediately
            navigation.navigate("CarInList", {
                car: {
                    personalDetails: personalDetailsPayload,
                    registrationDetails: registrationDetailsPayload,
                    carDetails: carDetailsPayload,
                    carImages: carImagesMap,
                    images,
                },
            });
        } catch (err: any) {
            console.log("Save error", err);
            Alert.alert("Error saving car", err?.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setMenuVisible(false);
        Alert.alert("Delete Car", "Are you sure you want to delete this car?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    // optional: clear local saved
                    try {
                        const user = auth().currentUser;
                        if (user) await AsyncStorage.removeItem(`car_${user.uid}`);
                    } catch { }
                    navigation.navigate("CarListingScreen" as never);
                },
            },
        ]);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.safe, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#7C3AED" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Car details</Text>

                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Text style={styles.dots}>⋮</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Edit car details</Text>
                <Text style={styles.smallHint}>Not editable</Text>

                {/* License */}
                <Text style={styles.label}>Car License Number *</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: "#F3F4F6" }]}
                    value={license}
                    onChangeText={setLicense}
                />

                {/* RC Book */}
                <Text style={styles.label}>RC book *</Text>
                <TouchableOpacity
                    style={styles.uploadCard}
                    activeOpacity={0.8}
                    onPress={() => pickImage("rc")}
                >
                    {rcImage ? (
                        <Image source={{ uri: rcImage }} style={styles.uploadedImage} />
                    ) : (
                        <Text style={styles.uploadHint}>Tap to upload RC book (front)</Text>
                    )}
                </TouchableOpacity>

                {/* Model / Brand */}
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Car Model</Text>
                        <TouchableOpacity
                            style={styles.select}
                            onPress={() => openDropdown("model")}
                        >
                            <Text style={model ? styles.selectTxt : styles.placeholder}>
                                {model || "Select"}
                            </Text>
                            <Text style={styles.chev}>▾</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.label}>Car Brand</Text>
                        <TouchableOpacity
                            style={styles.select}
                            onPress={() => openDropdown("brand")}
                        >
                            <Text style={brand ? styles.selectTxt : styles.placeholder}>
                                {brand || "Select"}
                            </Text>
                            <Text style={styles.chev}>▾</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Year & Color */}
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Year of registration</Text>
                        <TouchableOpacity
                            style={styles.select}
                            onPress={() => openDropdown("year")}
                        >
                            <Text style={year ? styles.selectTxt : styles.placeholder}>
                                {year || "Select"}
                            </Text>
                            <Text style={styles.chev}>▾</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.label}>Car color</Text>
                        <TouchableOpacity
                            style={styles.select}
                            onPress={() => openDropdown("color")}
                        >
                            <Text style={color ? styles.selectTxt : styles.placeholder}>
                                {color || "Select"}
                            </Text>
                            <Text style={styles.chev}>▾</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Car Images */}
                <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Car Images</Text>
                <Text style={styles.editableHint}>Editable</Text>

                <View style={styles.carImagesContainer}>
                    {images.slice(0, 6).map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            onLongPress={() => removeImageAt(index)}
                            style={styles.carImageBox}
                        >
                            <Image source={{ uri }} style={styles.carImage} />
                        </TouchableOpacity>
                    ))}

                    {images.length < 6 && (
                        <TouchableOpacity
                            style={[styles.carImageBox, styles.addImageBox]}
                            onPress={() => pickImage("car")}
                        >
                            <Text style={styles.addPlus}>＋</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* KM slider */}
                <Text style={[styles.label]}>Car kilometers driven</Text>
                <View style={styles.sliderContainer}>
                    <View style={styles.kmLabels}>
                        {KM_OPTIONS.map((km) => (
                            <Animated.Text
                                key={km}
                                style={[
                                    styles.kmLabel,
                                    {
                                        opacity: fadeAnim,
                                        fontWeight: kilometers === km ? "700" : "500",
                                        color: kilometers === km ? "#7C3AED" : "#374151",
                                    },
                                ]}
                            >
                                {km}km{km >= 2000 ? "s" : ""}
                            </Animated.Text>
                        ))}
                    </View>

                    <View style={styles.gradientSliderContainer}>
                        <LinearGradient
                            colors={["#7C3AED", "#a070f4ff", "#d4b3f8ff"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientTrack}
                        />

                        <View style={styles.dotsContainer}>
                            {KM_OPTIONS.map((_, index) => (
                                <View key={index} style={styles.dot} />
                            ))}
                        </View>

                        <Slider
                            style={styles.slider}
                            minimumValue={1000}
                            maximumValue={8000}
                            step={1000}
                            value={kilometers}
                            onValueChange={setKilometers}
                            minimumTrackTintColor="transparent"
                            maximumTrackTintColor="transparent"
                            thumbTintColor="#5900f4ff"
                        />
                    </View>
                </View>

                {/* About */}
                <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Car description & features</Text>
                <Text style={styles.editableHint}>Editable</Text>

                <Text style={styles.label}>About your car</Text>
                <TextInput
                    style={[styles.input, { height: 110, textAlignVertical: "top" }]}
                    placeholder="Tell your guests about your car"
                    value={about}
                    onChangeText={setAbout}
                    multiline
                    maxLength={500}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <Text style={styles.helpSmall}>{about.length}/500</Text>
                    <TouchableOpacity><Text style={styles.link}>see examples</Text></TouchableOpacity>
                </View>

                {/* FASTag & Delivery radios */}
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.label}>FASTag Enabled</Text>
                    <View style={styles.radioRow}>
                        <TouchableOpacity style={styles.radioBtn} onPress={() => setFastag(true)}>
                            <View style={[styles.radioOuter, fastag && styles.radioActive]}>
                                {fastag && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => setFastag(false)}>
                            <View style={[styles.radioOuter, !fastag && styles.radioActive]}>
                                {!fastag && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={styles.label}>Do you offer home delivery services?</Text>
                    <View style={styles.radioRow}>
                        <TouchableOpacity style={styles.radioBtn} onPress={() => setDelivery(true)}>
                            <View style={[styles.radioOuter, delivery && styles.radioActive]}>
                                {delivery && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => setDelivery(false)}>
                            <View style={[styles.radioOuter, !delivery && styles.radioActive]}>
                                {!delivery && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Features */}
                <Text style={[styles.sectionSubTitle, { marginTop: 18 }]}>Select Car Features</Text>

                <Text style={styles.featureCategory}>SAFETY</Text>
                <View style={styles.featureGrid}>
                    {SAFETY_LIST.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.featureCard, safetyFeatures.has(item.name) && styles.featureCardActive]}
                            onPress={() => toggleSet(setSafetyFeatures, safetyFeatures, item.name)}
                        >
                            <Image source={item.icon} style={styles.featureIcon} />
                            <Text style={styles.featureLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.featureCategory}>DRIVING</Text>
                <View style={styles.featureGrid}>
                    {DRIVING_LIST.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.featureCard, drivingFeatures.has(item.name) && styles.featureCardActive]}
                            onPress={() => toggleSet(setDrivingFeatures, drivingFeatures, item.name)}
                        >
                            <Image source={item.icon} style={styles.featureIcon} />
                            <Text style={styles.featureLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.featureCategory}>ENTERTAINMENT</Text>
                <View style={styles.featureGridTwo}>
                    {ENT_LIST.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.featureCard, entFeatures.has(item.name) && styles.featureCardActive]}
                            onPress={() => toggleSet(setEntFeatures, entFeatures, item.name)}
                        >
                            <Image source={item.icon} style={styles.featureIcon} />
                            <Text style={styles.featureLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Footer Save */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveTxt}>SAVE CHANGES</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for dropdowns */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>{modalTitle}</Text>
                        <FlatList
                            data={modalData}
                            keyExtractor={(i) => i}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalRow} onPress={() => selectFromModal(item)}>
                                    <Text style={styles.modalRowText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* popup menu */}
            <Modal transparent visible={menuVisible} animationType="fade">
                <TouchableOpacity style={styles.popupOverlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
                    <View style={styles.popupMenu}>
                        <TouchableOpacity style={styles.popupItem} onPress={() => { setMenuVisible(false); Alert.alert("Edit", "You are already on Edit car."); }}>
                            <Text style={styles.popupText}>Edit car details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.popupItem} onPress={handleDelete}>
                            <Text style={[styles.popupText, { color: "red" }]}>Delete car</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}

/* ---------------------- Styles ---------------------- */
/* Keep same styles you had — I've included them unchanged below (so UI remains identical) */
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "ios" ? 20 : 16,
        paddingBottom: 12,
        backgroundColor: "#fff",
    },
    backArrow: { fontSize: 20, fontWeight: "600" },
    headerTitle: { fontSize: 18, fontWeight: "800", marginRight: 145 },
    dots: { fontSize: 20 },

    container: {
        paddingHorizontal: 15,
        paddingBottom: 23,
        marginTop: 15
    },

    smallHint: { color: "#9CA3AF", marginTop: 6, marginBottom: 6 },

    label: { marginTop: 12, fontWeight: "700", color: "#111827" },
    input: {
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#E6E7EB",
        backgroundColor: "#fff",
    },

    carImagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 10,
    },

    carImageBox: {
        width: "31%",         // 3 in a row
        aspectRatio: 1,       // square
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#F3F4F6",
        marginBottom: 12,
    },

    carImage: {
        width: "100%",
        height: "100%",
        borderRadius: 12,
    },

    addImageBox: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
    },

    addPlus: {
        fontSize: 32,
        color: "#7C3AED",
        fontWeight: "800",
        marginTop: -4,
    },

    uploadCard: {
        marginTop: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E6E7EB",
        padding: 8,
        backgroundColor: "#fff",
        height: 120,
        justifyContent: "center",
    },
    uploadedImage: { width: "100%", height: "100%", borderRadius: 8, resizeMode: "cover" },
    uploadHint: { color: "#9CA3AF" },

    row: { flexDirection: "row", gap: 12, marginTop: 6 },
    half: { flex: 1 },

    select: {
        marginTop: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E6E7EB",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectTxt: { color: "#111827" },
    placeholder: { color: "#9CA3AF" },
    chev: { color: "#6B7280" },

    sectionTitle: { fontSize: 16, fontWeight: "800", marginTop: 8 },
    editableHint: { color: "#9CA3AF", fontSize: 12, marginTop: 4 },

    imagesRow: { flexDirection: "row", marginTop: 8 },
    addTxt: { fontSize: 12, color: "#6B7280" },

    imageGrid: { flexDirection: "row", flexWrap: "wrap", flex: 1 },
    imgWrap: { marginRight: 10, marginBottom: 10 },
    gridImg: { width: 70, height: 70, borderRadius: 10 },

    sliderContainer: {
        marginBottom: 5,
        marginTop: 20,
    },

    kmLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingHorizontal: 4,
    },

    kmLabel: {
        fontSize: 13,
        color: "#374151",
        fontWeight: "500",
        minWidth: 30,
        textAlign: "center",
    },

    gradientSliderContainer: {
        position: "relative",
        height: 50,
        justifyContent: "center",
        marginTop: 15,
    },

    gradientTrack: {
        position: "absolute",
        height: 5,
        width: "100%",
        borderRadius: 50,
        backgroundColor: "#E5E7EB",
    },

    dotsContainer: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#fff",
        opacity: 0.9,
    },

    slider: {
        width: "100%",
        height: 40,
    },

    largeThumb: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#5900f4ff",
        borderWidth: 6,
        borderColor: "#FFFFFF",
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 10,
    },

    sectionSubTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
    helpSmall: { color: "#9CA3AF" },
    link: { color: "#7C3AED", fontWeight: "600" },

    radioRow: { flexDirection: "row", marginTop: 8, gap: 12 },
    radioBtn: { flexDirection: "row", alignItems: "center", marginRight: 16 },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    radioInner: { width: 10, height: 10, borderRadius: 6, backgroundColor: "#fff" },
    radioActive: { backgroundColor: "#7C3AED", borderColor: "#7C3AED" },
    radioText: { fontSize: 14 },

    featureCategory: {
        fontSize: 14,
        marginTop: 20,
        fontWeight: "700",
        color: "#4B5563",
        marginBottom: 10,
    },

    featureGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    featureCard: {
        width: "31%",
        backgroundColor: "#FFF",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },

    featureCardActive: {
        borderColor: "#7C3AED",
        backgroundColor: "#F0E8FF",
    },

    featureIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginBottom: 8,
    },

    featureLabel: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        color: "#374151",
        lineHeight: 18,
    },
    featureGridTwo: {
        flexDirection: "row",
        gap: 10
    },

    footer: {
        padding: 12,
        borderTopWidth: 1,
        borderColor: "#F3F4F6",
        backgroundColor: "#fff",
    },
    saveBtn: {
        backgroundColor: "#7C3AED",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    saveTxt: { color: "#fff", fontWeight: "700" },

    // modal & popup menu
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        maxHeight: "60%",
        paddingVertical: 8,
    },
    modalTitle: { fontWeight: "700", fontSize: 16, paddingHorizontal: 12, paddingBottom: 8 },
    modalRow: { paddingHorizontal: 12, paddingVertical: 12, borderTopWidth: 1, borderColor: "#F3F4F6" },
    modalRowText: { fontSize: 15 },

    popupOverlay: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 70,
        paddingRight: 16,
        backgroundColor: "transparent",
    },
    popupMenu: {
        width: 180,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 8,
        elevation: 6,
    },
    popupItem: { paddingVertical: 10, paddingHorizontal: 14 },
    popupText: { fontSize: 15, fontWeight: "600" },
});
