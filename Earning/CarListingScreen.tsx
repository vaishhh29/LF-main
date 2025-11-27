import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { width } = Dimensions.get("window");

/* ---------------------------
   Animated Toggle Switch
---------------------------- */
const PillToggle = ({ value, onToggle }) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onToggle}>
      <View
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? "#7C3AED" : "#C9C9C9" },
        ]}
      >
        <Animated.View
          style={[styles.toggleThumb, { transform: [{ translateX }] }]}
        />
      </View>
    </TouchableOpacity>
  );
};

/* ---------------------------
   Car Card
---------------------------- */
const CarCard = ({ car, onToggleLock, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: car?.images?.[0] }} style={styles.carImage} />
      </View>

      <View style={styles.cardHeader}>
        <View style={styles.lockBadge}>
          <Image
            source={require("./assets/car1.png")}
            style={[styles.lockIcon, { tintColor: car.isLocked ? "#DC2626" : "#7C3AED" }]}
          />
          <Text
            style={[
              styles.lockText,
              { color: car.isLocked ? "#DC2626" : "#7C3AED" },
            ]}
          >
            {car.isLocked ? "Locked" : "Unlocked"}
          </Text>
        </View>

        <PillToggle value={!car.isLocked} onToggle={onToggleLock} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.carTitle} numberOfLines={1}>
              {car.registrationDetails?.carBrand}
            </Text>
            <Text style={styles.carType}> {car.carInfo?.type}</Text>
          </View>

          <TouchableOpacity style={styles.moreBtn}>
            <Image
              source={require("./assets/more.png")}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.carId}>Car ID : {car.registrationDetails?.licenseNumber}</Text>
        <View style={styles.dottedLine} />

        <View style={styles.priceRow}>
          <Image
            source={require("./assets/money.png")}
            style={styles.moneyIcon}
          />
          <Text style={styles.price}>
            ₹ {200}
            <Text style={styles.perHour}> / hour</Text>
          </Text>

          <Text style={styles.dot}>•</Text>
          <Text style={styles.statusText}>
            {car.onRent ? "On Rent" : "Available"}
          </Text>
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.statsRow}>
          <Text style={styles.statsText}>
            Bookings : <Text style={styles.statsValue}>{2}</Text>
          </Text>

          <Text style={styles.statsText1}>
            Earnings : <Text style={styles.statsValue2}>₹ {2000}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ---------------------------
   Main Screen
---------------------------- */
export default function CarListingScreen() {
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("cars")
      .onSnapshot((snapshot) => {

        const carList = snapshot.docs.map((doc) => {
          const data = doc.data();

          const imagesArray = data.carImages
            ? Object.values(data.carImages)
            : [];

          return {
            id: doc.id,
            carDetails: data.carDetails ?? {},
            images: imagesArray,
            registrationDetails: data.registrationDetails ?? {},
            personalDetails: data.personalDetails ?? {},
            isLocked: data.carDetails?.isLocked ?? true,
            bookings: data.carDetails?.bookings ?? 0,
            earnings: data.carDetails?.earnings ?? 0,
            onRent: data.carDetails?.onRent ?? false,
          };
        });

        setCars(carList);
        setAllCars(carList);

        // Extract brands list
        const uniqueBrands = [...new Set(carList.map(c => c.registrationDetails?.carBrand))];
        setBrands(uniqueBrands);
      });

    return () => unsubscribe();
  }, []);

  const applyBrandFilter = (brand) => {
    setSelectedBrand(brand);
    setShowFilter(false);

    if (brand === "ALL") {
      setCars(allCars);
      return;
    }

    const filtered = allCars.filter(c => c.registrationDetails?.carBrand === brand);
    setCars(filtered);
  };

  const toggleLock = (index) => {
    const copy = [...cars];
    copy[index].isLocked = !copy[index].isLocked;
    setCars(copy);
  };

  const goToCarInList = (car) => {
    navigation.navigate("CarInList", { car , carId: car.id });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Image
            source={require("./assets/filter.png")}
            style={styles.iconSm}
          />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.notificationWrapper}>
          <Image source={require("./assets/bell.png")} style={styles.iconMd} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* DROPDOWN (option 3) */}
      {showFilter && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => applyBrandFilter("ALL")}
          >
            <Text style={styles.dropdownText}>All Cars</Text>
          </TouchableOpacity>

          {brands.map((brand, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => applyBrandFilter(brand)}
            >
              <Text style={styles.dropdownText}>{brand}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.addCarBtn}
          onPress={() => navigation.navigate("CarListDetailsScreen")}
        >
          <View style={styles.plusWrap}>
            <Image
              source={require("./assets/plus.png")}
              style={styles.plusIcon}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.addTitle}>ADD CAR</Text>
            <Text style={styles.addSub}>List your next car</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <View style={styles.hr} />
          <Text style={styles.sectionTitle}>MY CARS</Text>
          <View style={styles.hr} />
        </View>

        {cars.length > 0 ? (
          cars.map((car, index) => (
            <CarCard
              key={index}
              car={car}
              onToggleLock={() => toggleLock(index)}
              onPress={() => goToCarInList(car)}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 40, fontSize: 16 }}>
            No cars found.
          </Text>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "white" },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 19,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },

  iconSm: { width: 25, height: 18, tintColor: "#6B7280", marginRight: 8 },
  iconMd: { width: 22, height: 30, tintColor: "black" },
  filterText: { color: "#585858", fontSize: 14 },

  notificationWrapper: { position: "relative" },

  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#664896",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  dropdown: {
    marginTop: -10,
    marginLeft: 20,
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 5,
    zIndex: 10,
    paddingVertical: 6,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  dropdownText: {
    fontSize: 14,
    color: "#333",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 28,
  },

  addCarBtn: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 18,
  },

  plusWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  plusIcon: { width: 20, height: 20, tintColor: "#fff" },

  addTitle: { color: "#fff", fontWeight: "700", fontSize: 14 },
  addSub: { color: "#F1EAFE", fontSize: 12, marginTop: 2 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 3,
  },

  hr: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  sectionTitle: {
    marginHorizontal: 12,
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },

  /* Card Styles */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEF0F3",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  imageWrap: {
    width: "95%",
    height: 200,
    backgroundColor: "#ccc",
    margin: 10,
    borderRadius: 14,
    overflow: "hidden",
  },

  carImage: { width: "100%", height: "100%", resizeMode: "cover" },

  cardHeader: {
    paddingHorizontal: 16,
    marginTop: -59,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFFCC",
    width: "90%",
    height: 40,
    borderRadius: 12,
    marginLeft: 20,
  },

  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  lockIcon: { width: 25, height: 20, marginRight: 8 },

  lockText: { fontSize: 16, fontWeight: "700" },

  toggleTrack: {
    width: 52,
    height: 30,
    borderRadius: 18,
    padding: 3,
    justifyContent: "center",
  },

  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },

  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  carTitle: { fontSize: 16, fontWeight: "800", color: "#111827" },
  carType: { fontSize: 12, color: "#6B7280" },

  moreBtn: { padding: 6 },
  moreIcon: { width: 16, height: 16, tintColor: "#9CA3AF" },

  carId: { fontSize: 12, color: "#333333", marginTop: 6 },

  dottedLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DADADA",
    marginVertical: 8,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  moneyIcon: { width: 16, height: 16, tintColor: "#F59E0B", marginRight: 6 },

  price: { fontSize: 16, fontWeight: "800", color: "#111827" },
  perHour: { fontSize: 13, color: "#6B7280" },

  dot: { fontSize: 25, color: "black", marginHorizontal: 6, marginBottom: 2 },

  statusText: { fontSize: 13, fontWeight: "700", color: "#0B970E" },

  statsRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statsText: { fontSize: 14, color: "#4D4D4D" },
  statsValue: { fontWeight: "700" },

  statsText1: { fontSize: 16, color: "#4D4D4D", fontWeight: "800" },
  statsValue2: { fontWeight: "800", color: "#4D4D4D" },
});

