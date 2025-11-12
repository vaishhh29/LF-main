import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  Modal,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UpcomingBookingDetailScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const hiddenInputRef = useRef<TextInput>(null);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => hiddenInputRef.current?.focus(), 300);
    });
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require("./assets/chevron-left.png")} style={styles.backIcon} />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Booking details</Text>
          <Text style={styles.headerSub}>Booking ID : LF123456789</Text>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Image source={require("./assets/whatsapp.png")} style={styles.contactIcon} />
          <Text style={styles.contactText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- CONTENT ---------- */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* ---------- TIMELINE CARD ---------- */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineRow}>
            <View style={styles.dateSection}>
              <Image source={require("./assets/up-arrow.png")} style={styles.arrowIcon} />
              <View>
                <Text style={styles.dateText}>Thu, 12 Feb</Text>
                <Text style={styles.timeText}>10:00 AM</Text>
              </View>
            </View>

            <Image source={require("./assets/car.png")} style={styles.carIcon} />

            <View style={styles.dateSection}>
              <View>
                <Text style={styles.dateText}>Thu, 14 Feb</Text>
                <Text style={styles.timeText}>12:00 PM</Text>
              </View>
              <Image source={require("./assets/down-arrow.png")} style={styles.arrowIcon} />
            </View>
          </View>

          <View style={styles.timeLineProgress}>
            <View style={[styles.dot, { backgroundColor: "#22C55E" }]} />
            <View style={styles.line} />
            <Image source={require("./assets/clock.png")} style={styles.clockIcon} />
            <Text style={styles.durationText}>13h 45m</Text>
            <View style={styles.line} />
            <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
          </View>
        </View>

        {/* ---------- USER DETAILS ---------- */}
        <Text style={styles.sectionTitle}>User details</Text>
        <TouchableOpacity style={styles.userCard}>
          <Image source={require("./assets/avatar.png")} style={styles.userAvatar} />
          <Text style={styles.userName}>Ranga raya reddy</Text>
          <Image source={require("./assets/chevron-left.png")} style={styles.arrowRight} />
        </TouchableOpacity>

        {/* ---------- TRACK BOOKING ---------- */}
        <Text style={styles.sectionTitle}>Track booking</Text>
        <View style={styles.trackContainer}>
          {["Booking confirmed", "Vehicle Handover", "Ongoing", "Return & Handover"].map((step, index) => (
            <View key={index} style={styles.trackRow}>
              <View style={styles.trackLeft}>
                <View
                  style={[
                    styles.stepCircle,
                    index === 0
                      ? styles.stepDone
                      : index === 1
                        ? styles.stepActive
                        : styles.stepIdle,
                  ]}
                >
                  {index === 0 ? (
                    <Image source={require("./assets/check.png")} style={styles.checkIcon} />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        index === 1 ? { color: "#6D38E8" } : { color: "#9CA3AF" },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                {index !== 3 && <View style={styles.stepLine} />}
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepLabel}>{step}</Text>
                <Text style={styles.stepTime}>20 min ago</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ---------- PRICE DETAILS ---------- */}
        <View style={styles.priceCardWrapper}>
          <ImageBackground
            source={require("./assets/bgboard.png")}
            style={styles.priceCardBg}
            imageStyle={styles.priceBgImage}
            resizeMode="stretch"
          >
            <View style={styles.priceContent}>
              <Text style={styles.priceTitle}>Price Details</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Rental Charge (Fuel not included)</Text>
                <Text style={styles.priceValue}>₹ 1200</Text>
              </View>
              <Text style={styles.subLabel}>1 day 4 hours</Text>

              <View style={styles.divider} />

              <Text style={styles.priceTitle}>Additional cost may occur</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Any damage</Text>
                <Text style={styles.priceValue}>₹ 500–3000</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  Timing extend{" "}
                  <Image source={require("./assets/info.png")} style={styles.infoIcon} />
                </Text>
                <Text style={styles.priceValue}>₹ 7/km</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      {/* ---------- FOOTER BUTTONS ---------- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={openModal}>
          <Text style={styles.startText}>Get code for start</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- POPUP MODAL ---------- */}
      <Modal transparent visible={isModalVisible} animationType="none">
        <View style={styles.modalBackdrop}>
          {/* Outside touch area */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.overlayTouchableArea} />
          </TouchableWithoutFeedback>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ justifyContent: "flex-end" }}
          >
            <Animated.View
              style={[styles.modalContent, { transform: [{ translateY }] }]}
            >
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>Enter Code</Text>
              <Text style={styles.modalSubtitle}>
                Please ask your rider to share the verification code in order to
                start the ride. This ensures security and confirms the correct booking.
              </Text>

              {/* Hidden input for continuous typing */}
              <TextInput
                ref={hiddenInputRef}
                style={{ position: "absolute", opacity: 0 }}
                keyboardType="number-pad"
                maxLength={4}
                value={code.join("")}
                onChangeText={(text) => {
                  const updated = text.split("");
                  const padded = [...updated, "", "", "", ""].slice(0, 4);
                  setCode(padded);

                  if (text.length === 4) {
                    setTimeout(() => {
                      closeModal();
                      navigation.navigate("UpcomingBookingDetailScreen2");
                    }, 400);
                  }
                }}
              />

              {/* Visible code boxes */}
              <View style={styles.codeContainer}>
                {code.map((num, index) => (
                  <View key={index} style={styles.codeBoxVisible}>
                    <Text style={styles.codeText}>{num}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate("UpcomingBookingDetailScreen2");
                }}
              >
                <Text style={styles.modalButtonText}>Vehicle Handover</Text>
              </TouchableOpacity>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

    </SafeAreaView >
  );
};

export default UpcomingBookingDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  /** HEADER **/
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  backButton: { padding: 4 },
  backIcon: { width: 24, height: 24, tintColor: "#111827" },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  headerSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#111827",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  contactIcon: { width: 18, height: 18, marginRight: 6 },
  contactText: { fontSize: 13, fontWeight: "600", color: "#111827" },

  /** TIMELINE **/
  timelineCard: {
    backgroundColor: "#F3EDFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateSection: { flexDirection: "row", alignItems: "center", gap: 6 },
  arrowIcon: { width: 22, height: 22 },
  dateText: { fontSize: 13, fontWeight: "600", color: "#111827" },
  timeText: { fontSize: 12, color: "#6B7280" },
  carIcon: { width: 26, height: 26, tintColor: "#111827" },
  timeLineProgress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  line: { width: 60, height: 1, backgroundColor: "#D1D5DB", marginHorizontal: 4 },
  clockIcon: { width: 16, height: 16, tintColor: "#111827" },
  durationText: { fontSize: 12, color: "#111827", marginHorizontal: 6 },

  /** USER DETAILS **/
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  userAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
  arrowRight: { width: 20, height: 20, transform: [{ rotate: "180deg" }] },

  /** TRACK **/
  trackContainer: { marginBottom: 24 },
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
  stepActive: { backgroundColor: "#FFFFFF", borderColor: "#6D38E8" },
  stepIdle: { backgroundColor: "#FFFFFF", borderColor: "#D1D5DB" },
  checkIcon: { width: 12, height: 12, tintColor: "#FFF" },
  stepNumber: { fontSize: 12, fontWeight: "600" },
  stepLine: {
    width: 2,
    height: 32,
    backgroundColor: "#E5E7EB",
    marginVertical: 4,
  },
  stepTextContainer: { flex: 1, paddingTop: 4 },
  stepLabel: { fontSize: 14, fontWeight: "500", color: "#111827" },
  stepTime: { fontSize: 12, color: "#9CA3AF", marginBottom: 12 },

  /** PRICE **/
  priceCardWrapper: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
  },
  priceCardBg: {
    width: 350,
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  priceBgImage: { borderRadius: 16, resizeMode: "stretch" },
  priceContent: { width: "100%" },
  priceTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  priceLabel: { fontSize: 13, color: "#111827", flexShrink: 1 },
  priceValue: { fontSize: 14, fontWeight: "600", color: "#111827" },
  subLabel: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
  infoIcon: { width: 14, height: 14, tintColor: "#6B7280" },

  /** FOOTER **/
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginRight: 10,
  },
  cancelText: { fontWeight: "600", color: "#111827", fontSize: 14 },
  startButton: {
    flex: 1,
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginLeft: 10,
  },
  startText: { fontWeight: "600", color: "#FFFFFF", fontSize: 14 },

  /** MODAL **/
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    height: "75%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    alignItems: "center",
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#D1D5DB",
    borderRadius: 2.5,
    marginBottom: 16,
  },
  modalTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 10,
    lineHeight: 20,
  },
  overlayTouchableArea: {
    flex: 1,
    width: "100%",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
  },
  codeBoxVisible: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  codeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
  },
  modalButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});
