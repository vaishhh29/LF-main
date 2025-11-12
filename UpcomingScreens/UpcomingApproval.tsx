import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const UpcomingApproval = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { booking, onDecline }: any = route.params || {};

  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  // 🔴 Decline
  const handleDecline = () => setShowDeclineModal(true);

  const handleConfirmDecline = () => {
    setShowDeclineModal(false);
    try {
      if (onDecline && typeof onDecline === "function" && booking?.id) {
        onDecline(booking.id);
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    } catch (err) {
      console.log("Decline error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // 🟢 Approve
  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const handleConfirmApprove = () => {
    setShowApproveModal(false);
    setTimeout(() => {
      navigation.navigate("UpcomingSubmission", { booking });
    }, 300);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("./assets/back.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <View style={styles.bookingBox}>
            <Text style={styles.bookingText}>
              Booking ID : {booking?.id || "LF123456789"}
            </Text>
          </View>
        </View>

        {/* ---------- TIMELINE CARD ---------- */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <View style={styles.dateSide}>
              <View style={styles.circleIcon}>
                <Image
                  source={require("./assets/up-arrow.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.dateText}>
                  {booking?.startDate || "Thu, 12 Feb"}
                </Text>
                <Text style={styles.timeText}>
                  {booking?.startTime || "10:00 AM"}
                </Text>
              </View>
            </View>

            <Image
              source={require("./assets/car.png")}
              style={{ width: 22, height: 22, resizeMode: "contain" }}
            />

            <View style={styles.dateSide}>
              <View style={{ marginRight: 6 }}>
                <Text style={[styles.dateText, { textAlign: "right" }]}>
                  {booking?.endDate || "Thu, 14 Feb"}
                </Text>
                <Text style={[styles.timeText, { textAlign: "right" }]}>
                  {booking?.endTime || "12:00 PM"}
                </Text>
              </View>
              <View style={styles.circleIcon}>
                <Image
                  source={require("./assets/down-arrow.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            </View>
          </View>

          {/* Clock row — old style */}
          <View style={styles.timelineBottom}>
            <View style={styles.dotGreen} />
            <View style={styles.dottedLine} />
            <View style={styles.clockRow}>
              <Image
                source={require("./assets/clock.png")}
                style={styles.clockIcon}
              />
              <Text style={styles.durationText}>13h 45m</Text>
            </View>
            <View style={styles.dottedLine} />
            <View style={styles.dotRed} />
          </View>
        </View>

        {/* ---------- CAR & USER DETAILS ---------- */}
        <View style={styles.card}>
          <View style={styles.carRow}>
            <Image
              source={require("../BookingScreens/assets/car.png")}
              style={styles.carImage}
            />
            <Text style={styles.carName}>Hyundai</Text>
            <Text style={styles.carAmount}>₹2000</Text>
          </View>

          {/* ---------- USER CARD ---------- */}
          <View style={styles.userCard}>
            <View style={styles.userTopRow}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={
                    booking?.userAvatar ||
                    require("../BookingScreens/assets/avatar.png")
                  }
                  style={styles.userAvatar}
                />
                <Text style={styles.userNameNew}>
                  {booking?.userName || "Raman"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.contactBtnNew}
                onPress={() => Linking.openURL("https://wa.me/91XXXXXXXXXX")}
              >
                <Text style={styles.contactTextNew}>Contact</Text>
                <Image
                  source={require("./assets/whatsapp.png")}
                  style={styles.whatsappIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.userDivider} />

            <View style={styles.userInfoBlock}>
              <Text style={styles.infoLineNew}>
                Raman’s Id Status –{" "}
                <Text style={styles.infoValue}>Verified ✅</Text>
              </Text>
              <Text style={styles.infoLineNew}>
                Raman’s Trip History –{" "}
                <Text style={styles.infoValue}>5 trips</Text>
              </Text>
              <Text style={styles.infoLineNew}>
                Raman’s Ratings – <Text style={styles.infoValue}>⭐ 4.7</Text>
              </Text>
            </View>
          </View>

          {/* ---------- REPORT ---------- */}
          <TouchableOpacity style={styles.reportCard}>
            <Image
              source={require("./assets/warning.png")}
              style={styles.reportIcon}
            />
            <Text style={styles.reportTextNew}>Report customer</Text>
          </TouchableOpacity>

          {/* ---------- HELP ---------- */}
          <View style={styles.helpSection}>
            <Text style={styles.helpText}>Need help? </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@leaflexi.com")}
            >
              <Text style={styles.contactLink}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          {/* ---------- ACTION BUTTONS ---------- */}
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
              <Text style={styles.declineText}>Declined</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.approveBtn} onPress={handleApprove}>
              <Text style={styles.approveText}>Approved</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ---------- DECLINE MODAL ---------- */}
      <Modal visible={showDeclineModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Image
              source={require("./assets/crossmark.png")}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Decline Booking?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to decline this customer’s booking request?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => setShowDeclineModal(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={handleConfirmDecline}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ---------- APPROVE MODAL ---------- */}
      <Modal visible={showApproveModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.approveBox}>
            <Image
              source={require("./assets/approve.png")}
              style={styles.approveIcon}
            />
            <Text style={styles.approveTitle}>Approve Booking?</Text>
            <Text style={styles.approveMessage}>
              Are you sure you want to approve this booking request?
            </Text>
            <View style={styles.approveButtons}>
              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => setShowApproveModal(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={handleConfirmApprove}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UpcomingApproval;

/* ---------------------- STYLES (unchanged visuals) ---------------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  bookingBox: {
    backgroundColor: "#F5F1FF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  bookingText: { color: "#6B21A8", fontSize: 14, fontWeight: "600" },
  timelineCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateSide: { flexDirection: "row", alignItems: "center" },
  circleIcon: { width: 24, height: 24, borderRadius: 12 },
  dateText: { fontSize: 13, fontWeight: "600", color: "#111827" },
  timeText: { fontSize: 11, color: "#6B7280" },
  timelineBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.8,
    borderColor: "#D1D5DB",
    marginHorizontal: 6,
  },
  clockRow: { flexDirection: "row", alignItems: "center" },
  clockIcon: { width: 14, height: 14, tintColor: "#6B7280", marginRight: 4 },
  durationText: { fontSize: 12, color: "#6B7280", fontWeight: "500" },
  card: {
    borderRadius: 14,
    borderWidth: 0.6,
    borderColor: "#E5E7EB",
    padding: 14,
    marginBottom: 16,
  },
  carRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF3F2",
    borderRadius: 10,
    padding: 10,
  },
  carImage: { width: 42, height: 42, borderRadius: 6 },
  carName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  carAmount: { fontSize: 15, fontWeight: "700", color: "#111827" },
  userCard: {
    backgroundColor: "#FFF9F9",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginVertical: 16,
  },
  userTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userAvatar: { width: 46, height: 46, borderRadius: 23 },
  userNameNew: { fontSize: 16, fontWeight: "600", color: "#111827", marginLeft: 10 },
  contactBtnNew: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#111827",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  contactTextNew: { fontSize: 14, fontWeight: "600", color: "#111827" },
  whatsappIcon: { width: 16, height: 16, tintColor: "#1FAF38", marginLeft: 6 },
  userDivider: {
    borderBottomWidth: 0.6,
    borderBottomColor: "#E5E7EB",
    marginVertical: 16,
  },
  infoLineNew: { fontSize: 14, marginBottom: 8, color: "#374151" },
  infoValue: { fontWeight: "600", color: "#6B7280" },
  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F9",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  reportIcon: { width: 18, height: 18, marginRight: 8 },
  reportTextNew: { fontSize: 15, fontWeight: "600", color: "#111827" },
  helpSection: { flexDirection: "row", justifyContent: "center", marginVertical: 20 },
  helpText: { color: "#6B7280" },
  contactLink: { color: "#7C3AED", fontWeight: "600" },
  bottomRow: { flexDirection: "row", justifyContent: "space-between" },
  declineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
  },
  declineText: { color: "#111827", fontWeight: "600", fontSize: 15 },
  approveBtn: {
    flex: 1,
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  approveText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalIcon: { width: 40, height: 40, marginBottom: 10, tintColor: "#EF4444" },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#DC2626" },
  modalMessage: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  approveBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  approveIcon: { width: 40, height: 40, marginBottom: 10, tintColor: "#7C3AED" },
  approveTitle: { fontSize: 18, fontWeight: "700", color: "#7C3AED" },
  approveMessage: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  approveButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  noBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 10,
  },
  yesBtn: {
    flex: 1,
    backgroundColor: "#7C3AED",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  noText: { color: "#111827", fontWeight: "600" },
  yesText: { color: "#fff", fontWeight: "700" },
});
