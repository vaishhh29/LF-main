import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";

// constants
const TABS = ["ID Proof", "Car image", "Car details"];

const CAR_MODELS = [
  "Ford Mustang",
  "Honda Civic",
  "Toyota Camry",
  "Tesla Model 3",
  "BMW 3 Series",
  "Mercedes C-Class",
  "Audi A4",
  "Hyundai Elantra",
  "Maruti Swift",
  "Tata Nexon",
];

const CAR_BRANDS = [
  "Ford",
  "Honda",
  "Toyota",
  "Tesla",
  "BMW",
  "Mercedes",
  "Audi",
  "Hyundai",
  "Maruti",
  "Tata",
];

const YEARS = [
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
];

const COLORS = [
  "White",
  "Black",
  "Silver",
  "Gray",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
];

const KM_OPTIONS = [1000, 2000, 4000, 6000, 8000];

const LICENSE_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;

// dropdown modal
const DropdownModal = ({ visible, data, title, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity
      style={styles.dropdownOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownTitle}>{title}</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

export default function CarListDetailsScreen() {
  const navigation = useNavigation();

  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [rcBookImage, setRcBookImage] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [yearOfRegistration, setYearOfRegistration] = useState("");
  const [carColor, setCarColor] = useState("");
  const [kilometers, setKilometers] = useState(1000);
  const [showTooltip, setShowTooltip] = useState(false);

  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadRCFromStorage();
  }, []);

  useEffect(() => {
    // small pulse animation when kms changes
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  }, [kilometers, fadeAnim]);

  const loadRCFromStorage = async () => {
    try {
      const saved = await AsyncStorage.getItem("rcBookImage");
      if (saved) setRcBookImage(saved);
    } catch (e) {
      // ignore
      console.warn("Failed to load RC image from storage", e);
    }
  };

  const validateLicense = (text) => {
    const upper = text.toUpperCase();
    setLicenseNumber(upper);
    if (upper && !LICENSE_REGEX.test(upper)) {
      setLicenseError("License number is incorrect");
    } else {
      setLicenseError("");
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8 },
      (response) => {
        if (response?.assets?.[0]?.uri) {
          const uri = response.assets[0].uri;
          setRcBookImage(uri);
          AsyncStorage.setItem("rcBookImage", uri).catch(() => {});
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        } else if (response?.errorCode) {
          Alert.alert("Error", response.errorMessage || "Failed to pick image");
        }
      }
    );
  };

  const validateForm = () => {
    if (!licenseNumber) {
      Alert.alert("Error", "Enter license number");
      return false;
    }
    if (licenseError) {
      Alert.alert("Error", "Invalid license number");
      return false;
    }
    if (!rcBookImage) {
      Alert.alert("Error", "Upload RC Book");
      return false;
    }
    if (!carModel) {
      Alert.alert("Error", "Select car model");
      return false;
    }
    if (!carBrand) {
      Alert.alert("Error", "Select car brand");
      return false;
    }
    if (!yearOfRegistration) {
      Alert.alert("Error", "Select year");
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    navigation.navigate("CarDetailListingScreen", {
      registrationDetails: {
        licenseNumber,
        carModel,
        carBrand,
        yearOfRegistration,
        carColor,
        kilometers,
        rcBookImage,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("./assets/back.png")} style={styles.backIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* stepper */}
      <View style={styles.tabContainer}>
        {TABS.map((label, index) => (
          <React.Fragment key={index}>
            <View style={styles.tabItem}>
              <Text style={[styles.tabText, index === 0 && styles.tabTextActive]}>
                {label}
              </Text>

              <View style={[styles.tabCircle, index === 0 && styles.tabCircleActive]}>
                {index === 0 ? (
                  <View style={styles.tabDot} />
                ) : (
                  <View style={styles.tabEmptyInner} />
                )}
              </View>
            </View>

            {index < TABS.length - 1 && <View style={styles.tabLine} />}
          </React.Fragment>
        ))}
      </View>

      {/* body */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 16 }}>
        {/* license */}
        <Text style={styles.label}>Car License Number *</Text>
        <TextInput
          style={[styles.input, licenseError && styles.inputError]}
          placeholder="Enter (DL04AN1234)"
          placeholderTextColor="#999"
          value={licenseNumber}
          onChangeText={validateLicense}
          autoCapitalize="characters"
        />

        {licenseError ? (
          <Text style={styles.errorText}>{licenseError}</Text>
        ) : (
          <Text style={styles.hintText}>Enter in "DL04AN1234" format</Text>
        )}

        {/* RC Book */}
        <Text style={styles.label}>RC Book *</Text>
        <TouchableOpacity style={styles.uploadCard} onPress={handleImageUpload}>
          {rcBookImage ? (
            <Image source={{ uri: rcBookImage }} style={styles.uploadedImage} />
          ) : (
            <>
              <Image
                source={require("./assets/upload2.png")}
                style={styles.uploadCardIcon}
              />
              <Text style={styles.uploadCardText}>Click to Upload RC</Text>
            </>
          )}
        </TouchableOpacity>

        {/* car model + brand */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Car Model</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowModelDropdown(true)}
            >
              <Text style={styles.selectText}>
                {carModel || "Select"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Car Brand</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowBrandDropdown(true)}
            >
              <Text style={styles.selectText}>
                {carBrand || "Select"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* year + color */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Year of Registration</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowYearDropdown(true)}
            >
              <Text style={styles.selectText}>
                {yearOfRegistration || "Select"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.halfField}>
            <Text style={styles.label}>Car Color</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowColorDropdown(true)}
            >
              <Text style={styles.selectText}>
                {carColor || "Select"}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* kms */}
        <Text style={styles.label}>Car Kilometers</Text>

        <View style={styles.sliderContainer}>
          <View style={styles.kmLabels}>
            {KM_OPTIONS.map((km) => (
              <Animated.Text
                key={km}
                style={[
                  styles.kmLabel,
                  {
                    opacity: fadeAnim,
                    color: kilometers === km ? "#7C3AED" : "#444",
                    fontWeight: kilometers === km ? "700" : "500",
                  },
                ]}
              >
                {km}
              </Animated.Text>
            ))}
          </View>

          <Slider
            style={{ width: "100%" }}
            minimumValue={1000}
            maximumValue={8000}
            step={2000}
            value={kilometers}
            onValueChange={setKilometers}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="#7C3AED"
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      {/* dropdown modals */}
      <DropdownModal
        visible={showModelDropdown}
        data={CAR_MODELS}
        title="Select Car Model"
        onSelect={setCarModel}
        onClose={() => setShowModelDropdown(false)}
      />

      <DropdownModal
        visible={showBrandDropdown}
        data={CAR_BRANDS}
        title="Select Car Brand"
        onSelect={setCarBrand}
        onClose={() => setShowBrandDropdown(false)}
      />

      <DropdownModal
        visible={showYearDropdown}
        data={YEARS}
        title="Select Year"
        onSelect={setYearOfRegistration}
        onClose={() => setShowYearDropdown(false)}
      />

      <DropdownModal
        visible={showColorDropdown}
        data={COLORS}
        title="Select Color"
        onSelect={setCarColor}
        onClose={() => setShowColorDropdown(false)}
      />
    </SafeAreaView>
  );
}

// styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  backIcon: { width: 30, height: 30 },

  saveButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  saveButtonText: { color: "#fff", fontWeight: "600" },

  tabContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  tabItem: { flex: 1, alignItems: "center" },

  tabText: { fontSize: 12, color: "#666", marginBottom: 6 },

  tabTextActive: { color: "#000", fontWeight: "700" },

  tabCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  tabCircleActive: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#EDE9FE",
    borderColor: "transparent",
  },

  tabEmptyInner: {
    width: 10,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },

  tabDot: {
    width: 10,
    height: 10,
    backgroundColor: "#7C3AED",
    borderRadius: 5,
  },

  tabLine: {
    height: 2,
    backgroundColor: "#E5E7EB",
    flex: 1,
    marginBottom: 10,
  },

  scrollView: { flex: 1 },

  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },

  inputError: { borderColor: "red" },

  hintText: { color: "#999", marginBottom: 20 },

  errorText: { color: "red", marginBottom: 20 },

  uploadCard: {
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  uploadCardIcon: {
    width: 40,
    height: 40,
    tintColor: "#7C3AED",
    marginBottom: 10,
  },

  uploadCardText: { color: "#7C3AED", fontWeight: "600" },

  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  row: { flexDirection: "row", marginBottom: 16 },

  halfField: { flex: 1 },

  selectContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: { fontSize: 15 },

  dropdownIcon: {},

  sliderContainer: { marginVertical: 20 },

  kmLabels: { flexDirection: "row", justifyContent: "space-between" },

  kmLabel: { fontSize: 12 },

  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  continueButton: {
    backgroundColor: "#7C3AED",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingBottom: 20,
  },

  dropdownTitle: {
    padding: 15,
    fontWeight: "700",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  dropdownItemText: { fontSize: 16 },
});
