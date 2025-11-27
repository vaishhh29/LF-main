import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingDetailsScreen = ({ navigation, route }) => {
  const { booking, onDeleteBooking } = route.params || {};
  const [userProfileImage] = useState("");
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const handleDeclineConfirm = () => {
    setShowDeclineModal(false);
    if (onDeleteBooking && booking?.bookingId) {
      onDeleteBooking(booking.bookingId);
    }
    Alert.alert("Booking Declined", "The booking request has been removed.");
    navigation.goBack();
  };

  const handleApproveConfirm = () => {
    setShowApproveModal(false);
    // ✅ Navigate to the page you'll specify later
    navigation.navigate("UpcomingSubmission"); // Replace with your actual screen later
  };

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Image source={require("./assets/back.png")} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.bookingIdBox}>
          <Text style={styles.bookingIdText}>
            Booking ID : {booking?.bookingId || "LF123456789"}
          </Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.card}>
          {/* 🕒 Timeline */}
          <View style={styles.timelineRow}>
            <View style={styles.dateBlock}>
              <View style={styles.dateRow}>
                <Image
                  source={require("./assets/up-arrow.png")}
                  style={styles.arrowIcon}
                />
                <View>
                  <Text style={styles.dateText}>
                    {booking?.pickupDate || "Thu, 12 Feb"}
                  </Text>
                  <Text style={styles.timeText}>
                    {booking?.pickupTime || "10:00 AM"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Center Car + Dots */}
            <View style={styles.centerIconRow}>
              <View style={styles.dottedLine} />
              <Image
                source={require("./assets/car.png")}
                style={styles.centerCarIcon}
                resizeMode="contain"
              />
              <View style={styles.dottedLine} />
            </View>

            <View style={styles.dateBlockRight}>
              <View style={styles.dateRow}>
                <View>
                  <Text style={styles.dateText}>
                    {booking?.dropDate || "Thu, 14 Feb"}
                  </Text>
                  <Text style={styles.timeText}>
                    {booking?.dropTime || "12:00 PM"}
                  </Text>
                </View>
                <Image
                  source={require("./assets/down-arrow.png")}
                  style={styles.arrowIcon}
                />
              </View>
            </View>
          </View>

          {/* Duration Row */}
          <View style={styles.durationRow}>
            <View style={styles.greenDot} />
            <View style={styles.dashLine} />
            <Image
              source={require("./assets/clock.png")}
              style={styles.clockIcon}
            />
            <Text style={styles.durationText}>13h 45m</Text>
            <View style={styles.dashLine} />
            <View style={styles.redDot} />
          </View>

          {/* 🚗 Car Info */}
          <View style={styles.carInfoCard}>
            <View style={styles.carInfoLeft}>
              <Image
                source={require("./assets/carre.png")}
                style={styles.carImage}
              />
              <Text style={styles.carName}>Hyundai</Text>
            </View>
            <Text style={styles.carPrice}>{booking?.rideFair || "₹2,000"}</Text>
          </View>

          {/* 👤 Customer Info */}
          <View style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <View style={styles.customerLeft}>
                {userProfileImage ? (
                  <Image
                    source={{ uri: userProfileImage }}
                    style={styles.profileImg}
                  />
                ) : (
                  <View style={styles.placeholderProfile}>
                    <Text style={styles.placeholderInitial}>
                      {booking?.name?.[0]?.toUpperCase() || "R"}
                    </Text>
                  </View>
                )}
                <Text style={styles.customerName}>
                  {booking?.name || "Raju"}
                </Text>
              </View>

              <TouchableOpacity style={styles.contactBtn}>
                <Text style={styles.contactText}>Contact</Text>
                <Image
                  source={require("./assets/whatsapp.png")}
                  style={styles.whatsappIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <Text style={styles.infoText}>
              Raju’s ID Status – <Text style={styles.dot}><Image source={require("./assets/check-mark.png")}/></Text> Verified
            </Text>
            <Text style={styles.infoText}>Raju’s Trip History – 5 trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate("RatingScreen")}>
              <Text style={styles.infoText}>
                Raju’s Ratings – 4.7 ★    &gt;
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.reportCard}>
            <Image
              source={require("./assets/warning.png")}
              style={styles.reportIcon}
            />
            <Text style={styles.reportText}>Report customer</Text>
          </TouchableOpacity>

          <Text style={styles.helpText}>
            Need help? <Text style={styles.helpLink}>Contact Us</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => setShowDeclineModal(true)}
        >
          <Text style={styles.declineText}>Declined</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => setShowApproveModal(true)}
        >
          <Text style={styles.approveText}>Approved</Text>
        </TouchableOpacity>
      </View>

      {/* ❌ Decline Modal */}
      <Modal visible={showDeclineModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popupBox}>
            <View style={styles.titleRowLeft}>
              <View style={styles.iconCircleSmallRed}>
                <Text style={styles.crossIcon}>×</Text>
              </View>
              <Text style={styles.titleTextRed}>Declined</Text>
            </View>

            <Text style={styles.subtitle}>
              Are you sure you want to Declined the customer booking request
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setShowDeclineModal(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleDeclineConfirm}
              >
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ Approved Modal */}
      <Modal visible={showApproveModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popupBox}>
            <View style={styles.titleRowLeft}>
              <View style={styles.iconCircleSmallPurple}>
                <Text style={styles.tickIcon}>✓</Text>
              </View>
              <Text style={styles.titleTextPurple}>Approved</Text>
            </View>

            <Text style={styles.subtitle}>
              Are you sure you want to Approved the customer booking request
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setShowApproveModal(false)}
              >
                <Text style={styles.noText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleApproveConfirm}
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

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { paddingRight: 10 },
  backIcon: { width: 22, height: 22, tintColor: "#000" },
  bookingIdBox: {
    backgroundColor: "#F3EDFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  bookingIdText: { fontSize: 14, fontWeight: "500", color: "#111827" },
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    elevation: 1,
  },

  /** === Timeline === **/
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
    paddingHorizontal: 6,
  },
  dateBlock: { alignItems: "flex-start", flex: 1, marginLeft: -30 },
  dateBlockRight: { alignItems: "flex-end", flex: 1, marginRight: -30 },
  dateRow: { flexDirection: "row", alignItems: "center" },
  arrowIcon: { width: 30, height: 30, marginHorizontal: 8 },
  dateText: { fontSize: 13, fontWeight: "600", color: "#111" },
  timeText: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  centerIconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.7,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: "dotted",
    borderWidth: 1.2,
    borderColor: "#999",
    opacity: 0.9,
  },
  centerCarIcon: {
    width: 30,
    height: 30,
    tintColor: "#444",
    marginHorizontal: 2,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#00C853" },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF3B30" },
  dashLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  clockIcon: { width: 14, height: 14, marginHorizontal: 6, tintColor: "#666" },
  durationText: { fontSize: 12, color: "#444", fontWeight: "500" },

  /** === Car Info === **/
  carInfoCard: {
    backgroundColor: "#FFF6F6",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginTop: 8,
  },
  carInfoLeft: { flexDirection: "row", alignItems: "center" },
  carImage: { width: 45, height: 45, borderRadius: 8, marginRight: 20 },
  carName: { fontSize: 15, fontWeight: "600", color: "#333" },
  carPrice: { fontSize: 15, fontWeight: "600", color: "#111" },

  /** === Customer Info === **/
  customerCard: {
    backgroundColor: "#FFF9F9",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 16,
    elevation: 1,
  },
  customerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerLeft: { flexDirection: "row", alignItems: "center" },
  profileImg: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
  placeholderProfile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  placeholderInitial: { fontSize: 16, fontWeight: "700", color: "#555" },
  customerName: { fontSize: 15, fontWeight: "600", color: "#111" },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#25D366",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  contactText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#25D366",
    marginRight: 6,
  },
  whatsappIcon: { width: 15, height: 15, tintColor: "#25D366" },
  divider: { borderBottomWidth: 1, borderColor: "#E6E6E6", marginVertical: 12 },
  infoText: { fontSize: 14, color: "#555", marginBottom: 4 },
  dot: { color: "#555" },

  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F9",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#F3EDED",
  },
  reportIcon: { width: 18, height: 18, tintColor: "#1E1E1E", marginRight: 10 },
  reportText: { fontSize: 15, color: "#1E1E1E", fontWeight: "500" },
  helpText: { textAlign: "center", color: "#555", paddingTop: 30 },
  helpLink: { color: "#6D38E8", fontWeight: "600" },

  /** === Footer === **/
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
  },
  declineButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#393939",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 10,
  },
  declineText: { color: "#393939", fontWeight: "600", fontSize: 15 },
  approveButton: {
    flex: 1,
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  approveText: { color: "#FFF", fontWeight: "600", fontSize: 15 },

  /** === Popup Shared === **/
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupBox: {
    width: "82%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  titleRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  /** ❌ Declined Colors **/
  iconCircleSmallRed: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  crossIcon: {
    fontSize: 20,
    color: "#D92D20",
    lineHeight: 20,
    fontWeight: "bold",
  },
  titleTextRed: {
    fontSize: 20,
    fontWeight: "700",
    color: "#D92D20",
  },

  /** ✅ Approved Colors **/
  iconCircleSmallPurple: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EDE9FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  tickIcon: {
    fontSize: 18,
    color: "#6D38E8",
    fontWeight: "700",
  },
  titleTextPurple: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6D38E8",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "left",
    marginBottom: 26,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  noButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  noText: { fontSize: 15, color: "#111827", fontWeight: "600" },
  yesText: { fontSize: 15, color: "#FFFFFF", fontWeight: "600" },
});
