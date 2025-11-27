import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HandoverRequestScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    start: "484",
    end: "1122",
  });

  const [checks, setChecks] = useState({
    returned: true,
    inspected: true,
    cleaned: true,
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks({ ...checks, [key]: !checks[key] });
  };

  const handleEndTrip = () => {
    navigation.navigate("RideSummary"); // or your next screen
  };

  const carImages = [
    require("./assets/carre.png"),
    require("./assets/carre.png"),
    require("./assets/carre.png"),
    require("./assets/carre.png"),
    require("./assets/carre.png"),
    require("./assets/carre.png"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("./assets/chevron-left.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Handover req.</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Need Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- AMOUNT CARD ---------- */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to be Collected</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amountValue}>₹489.56</Text>
            <Image
              source={require("./assets/info.png")}
              style={styles.infoIcon}
            />
          </View>
        </View>

        {/* ---------- HANDOVER ILLUSTRATION ---------- */}
        <View style={styles.handoverSection}>
          <Image
            source={require("./assets/handover.png")}
            style={styles.handoverImage}
            resizeMode="contain"
          />
        </View>

        {/* ---------- DURATION BOX ---------- */}
        <View style={styles.durationBox}>
          <Text style={styles.durationLabel}>DURATION OF USE</Text>
          <Text style={styles.durationValue}>1 Hr 58 Mins</Text>
        </View>

        {/* ---------- TRACK BOOKING ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track booking</Text>
          {["Booking confirmed", "Vehicle Handover", "Ongoing", "Return & Handover"].map(
            (step, index) => (
              <View key={index} style={styles.trackRow}>
                <View style={styles.trackLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      index <= 2 ? styles.stepDone : styles.stepIdle,
                    ]}
                  >
                    {index <= 2 ? (
                      <Image
                        source={require("./assets/check.png")}
                        style={styles.checkIcon}
                      />
                    ) : (
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    )}
                  </View>
                  {index !== 3 && <View style={styles.stepLine} />}
                </View>
                <View style={styles.trackRight}>
                  <Text style={styles.trackLabel}>{step}</Text>
                  <Text style={styles.trackTime}>20 min ago</Text>
                </View>
              </View>
            )
          )}
        </View>

        {/* ---------- CAR IMAGES ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Images</Text>
          <Text style={styles.sectionSubtitle}>
            To ensure trust and security on our platform, we ask customers to
            share a few images of the vehicle before handover.
          </Text>

          <View style={styles.imageGrid}>
            {carImages.map((img, i) => (
              <TouchableOpacity key={i} style={styles.imageCard}>
                <Image
                  source={img}
                  style={styles.carImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ---------- SPEEDOMETER ---------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Speedometer</Text>

          <View style={styles.speedRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Start</Text>
              <TextInput
                style={styles.inputBox}
                keyboardType="numeric"
                value={inputs.start}
                onChangeText={(t) => setInputs({ ...inputs, start: t })}
              />
            </View>
            <View style={{ width: 20 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>End</Text>
              <TextInput
                style={styles.inputBox}
                keyboardType="numeric"
                value={inputs.end}
                onChangeText={(t) => setInputs({ ...inputs, end: t })}
              />
            </View>
          </View>

          {/* ---------- CHECKBOXES ---------- */}
          {[
            { label: "Car returned", key: "returned" },
            { label: "Car inspected", key: "inspected" },
            { label: "Car cleaned", key: "cleaned" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.checkItem}
              onPress={() => toggleCheck(item.key as keyof typeof checks)}
            >
              <Text style={styles.checkLabel}>{item.label}</Text>
              <View
                style={[
                  styles.checkbox,
                  checks[item.key as keyof typeof checks] && styles.checkboxChecked,
                ]}
              >
                {checks[item.key as keyof typeof checks] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- END TRIP BUTTON ---------- */}
        <TouchableOpacity style={styles.endButton} onPress={handleEndTrip}>
          <Text style={styles.endButtonText}>End Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HandoverRequestScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /** HEADER **/
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backIcon: { width: 24, height: 24, tintColor: "#111827" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827",marginRight:60 },
  helpButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  helpText: { color: "#6D38E8", fontWeight: "500",fontSize:12 },

  /** AMOUNT CARD **/
  amountCard: {
    backgroundColor: "#6D38E8",
    alignItems: "center",
    paddingVertical: 16,
  },
  amountLabel: { color: "#E9D5FF", fontSize: 13 },
  amountRow: { flexDirection: "row", alignItems: "center" },
  amountValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
  infoIcon: { width: 14, height: 14, marginLeft: 6, tintColor: "#fff" },

  /** HANDOVER IMAGE **/
  handoverSection: {
    alignItems: "center"
  },
  handoverImage: { width:300, height:250 },

  /** DURATION BOX **/
  durationBox: {
    backgroundColor: "#F8F7FF",
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "#E5E0FF",
    width:"85%",
  },
  durationLabel: { color: "#6B21A8", fontSize: 12, fontWeight: "600" },
  durationValue: { color: "#6D38E8", fontSize: 16, fontWeight: "700" },

  /** TRACK **/
  section: { paddingHorizontal: 16, marginTop: 10, marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827",margin:20 },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    
    marginBottom: 14,
  },
  trackRow: { flexDirection: "row", alignItems: "flex-start" },
  trackLeft: { alignItems: "center", marginRight: 14 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDone: { backgroundColor: "#6D38E8", borderColor: "#6D38E8" },
  stepIdle: { backgroundColor: "#FFF", borderColor: "#D1D5DB" },
  stepLine: {
    width: 2,
    height: 34,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  trackRight: { flex: 1, paddingTop: 4 },
  trackLabel: { fontSize: 14, fontWeight: "500", color: "#111827" },
  trackTime: { fontSize: 12, color: "#9CA3AF", marginBottom: 10 },

  /** CAR IMAGES **/
  imageGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  imageCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  carImage: { width: "100%", height: "100%" },

  /** SPEEDOMETER **/
  speedRow: { flexDirection: "row", marginBottom: 16 },
  inputLabel: { color: "#6B7280", fontSize: 13, marginBottom: 4 },
  inputBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  /** CHECKBOXES **/
  checkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  checkLabel: { fontSize: 15, color: "#111827" },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6D38E8",
    borderColor: "#6D38E8",
  },
  checkmark: { color: "#FFF", fontSize: 14, fontWeight: "bold" },

  /** END TRIP **/
  endButton: {
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    alignItems: "center",
  },
  endButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
