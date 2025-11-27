import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function CarInList() {
  const route = useRoute();
  const navigation = useNavigation();

  const { carId, userId, car: passedCar } = route.params || {};

  const [car, setCar] = useState(passedCar || null);
  const [menuVisible, setMenuVisible] = useState(false);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: "none" } });

    return () =>
      parent?.setOptions({
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0.5,
          borderTopColor: "#E0E0E0",
        },
      });
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      const uid = userId || currentUser.uid;
      const cid = carId || "car1";

      try {
        const doc = await firestore()
          .collection("users")
          .doc(uid)
          .collection("cars")
          .doc(cid)
          .get();

        if (doc.exists) {
          setCar(doc.data());
        } else {
          console.log("No car found:", uid, cid);
        }
      } catch (err) {
        console.log("Error loading car:", err);
      }
    };

    fetchCar();
  }, []);

  if (!car) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No car data found</Text>
      </View>
    );
  }

  const data = car;

  const ICONS = {
    1: require("./assets/airbag.png"),
    2: require("./assets/airbag.png"),
    3: require("./assets/airbag.png"),
    4: require("./assets/airbag.png"),
    5: require("./assets/venti.png"),
    6: require("./assets/camera.png"),
    7: require("./assets/airbag.png"),
    8: require("./assets/venti.png"),
    9: require("./assets/parking.png"),
    10: require("./assets/voice.png"),
    11: require("./assets/repair.png"),
    12: require("./assets/powerString.png"),
    13: require("./assets/music.png"),
    14: require("./assets/wifi.png"),
  };

  const features = data?.carDetails?.selectedFeatures || [];
  const safety = features.filter(f => f.category === "SAFETY");
  const driving = features.filter(f => f.category === "DRIVING");
  const entertainment = features.filter(f => f.category === "ENTERTAINMENT");

  const handleDelete = () => {
    setMenuVisible(false);

    setTimeout(() => {
      Alert.alert(
        "Delete Car",
        "Are you sure you want to delete this car?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await firestore()
                  .collection("users")
                  .doc(userId)
                  .collection("cars")
                  .doc(carId)
                  .delete();

                navigation.navigate("CarListingScreen");
              } catch (err) {
                Alert.alert("Error", "Failed to delete car.");
              }
            },
          },
        ]
      );
    }, 150);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Car details</Text>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Text style={styles.dots}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* CAR TOP CARD */}
        <View style={styles.topCard}>
          <Image source={{ uri: data.carImages?.image1 }} style={styles.carImage} />

          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.carName}>{data.registrationDetails?.carBrand}</Text>
            <Text style={styles.carId}>ID : {data.registrationDetails?.licenseNumber}</Text>
          </View>
        </View>

        {/* INFO CARD */}
        <View style={styles.infoCard}>
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoText}>Bookings : 2</Text>
            <Text style={styles.infoArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={[styles.infoRow, { backgroundColor: "#FFF4F4" }]}>
            <Text style={styles.infoText}>Earnings : ₹ 2000</Text>
            <Text style={styles.infoArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View style={styles.rowBetween1}>
          <Text style={styles.label}>About car</Text>
          <Text style={styles.value1}>{data.carDetails?.description}</Text>
        </View>

        {/* DETAILS */}
        <View style={styles.rowBetween}>
          <Text style={styles.label}>License number</Text>
          <Text style={styles.value}>{data.registrationDetails?.licenseNumber}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>RC Book</Text>
          <Image
            source={{ uri: data.registrationDetails?.rcBookImage }}
            style={styles.rcImage}
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Car color</Text>
          <Text style={styles.value}>{data.registrationDetails?.carColor}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Car registration</Text>
          <Text style={styles.value}>{data.registrationDetails?.yearOfRegistration}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>FASTag Enabled</Text>
          <Text style={styles.value}>{data.carDetails?.fastag}</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Home delivery services?</Text>
          <Text style={styles.value}>{data.carDetails?.delivery}</Text>
        </View>

        {/* CAR IMAGES */}
        <View style={styles.rowImages}>
          <Text style={[styles.sectionTitle, styles.leftTitle]}>Car Images</Text>

          <View style={styles.imageGridRight}>
            {Object.values(data.carImages || {}).map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.gridImg} />
            ))}
          </View>
        </View>

        {/* FEATURES */}
        {safety.length > 0 && (
          <View style={styles.rowImages}>
            <Text style={[styles.sectionTitle, styles.leftTitle]}>Safety</Text>
            <View style={styles.imageGridRight}>
              {safety.map((item) => (
                <View key={item.id} style={styles.squareBox}>
                  <Image source={ICONS[item.id]} style={styles.squareIcon} />
                  <Text style={styles.squareLabel}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {driving.length > 0 && (
          <View style={styles.rowImages}>
            <Text style={[styles.sectionTitle, styles.leftTitle]}>Driving</Text>
            <View style={styles.imageGridRight}>
              {driving.map((item) => (
                <View key={item.id} style={styles.squareBox}>
                  <Image source={ICONS[item.id]} style={styles.squareIcon} />
                  <Text style={styles.squareLabel}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {entertainment.length > 0 && (
          <View style={styles.rowImages}>
            <Text style={[styles.sectionTitle, styles.leftTitle]}>Entertainment</Text>
            <View style={styles.imageGridRight}>
              {entertainment.map((item) => (
                <View key={item.id} style={styles.squareBox}>
                  <Image source={ICONS[item.id]} style={styles.squareIcon} />
                  <Text style={styles.squareLabel}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* POPUP MENU */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.popupOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.popupMenu}>
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Editcar", {
                  car: data,
                  carId,
                  userId,
                });
              }}
            >
              <Text style={styles.popupText}>Edit car</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popupItem} onPress={handleDelete}>
              <Text style={[styles.popupText, { color: "red" }]}>Delete car</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  backArrow: { fontSize: 24, fontWeight: "600" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  dots: { fontSize: 26, fontWeight: "600" },
  topCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    elevation: 4,
  },
  carImage: { width: 80, height: 80, borderRadius: 12 },
  carName: { fontSize: 18, fontWeight: "700" },
  carId: { color: "#666", marginTop: 4 },

  infoCard: {
    width: "100%",
    borderRadius: 16,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  infoText: { fontSize: 16, fontWeight: "700" },
  infoArrow: { fontSize: 22, color: "#444" },
  divider: { height: 1, backgroundColor: "#DDD" },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  rowBetween1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  label: { fontSize: 15, fontWeight: "600" },
  value: { fontSize: 15, color: "#333" },
  value1: {
    fontSize: 12,
    color: "#333",
    marginLeft: 20,
    padding: 10,
    textAlign: "justify",
    width: "68%",
  },

  rcImage: { width: 80, height: 50, borderRadius: 6 },

  rowImages: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  leftTitle: { width: "32%", fontSize: 12 },

  imageGridRight: {
    width: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  gridImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 10,
  },

  squareBox: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  squareIcon: { width: 20, height: 20, marginBottom: 8 },
  squareLabel: { fontSize: 10, fontWeight: "600", textAlign: "center" },

  popupOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 70,
    paddingRight: 16,
  },
  popupMenu: {
    width: 160,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 6,
  },
  popupItem: { paddingVertical: 10, paddingHorizontal: 16 },
  popupText: { fontSize: 15, fontWeight: "600" },
});
