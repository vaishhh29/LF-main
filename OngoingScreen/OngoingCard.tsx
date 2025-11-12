import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OngoingCard = ({ booking, onContact, onVehicleHandover }) => {
  return (
    <View style={styles.wrapper}>
      {/* 🚗 Car name */}
      <Text style={styles.carTitle}>{booking.carName || "Toyota Corolla 2023"}</Text>

      {/* Main Card */}
      <View style={styles.card}>
        {/* 👤 Profile + Booking ID */}
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <Image
              source={booking.profilePic || require("./assets/avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.nameText}>{booking.name || "Raju"}</Text>
          </View>

          <View style={styles.bookingIdBox}>
            <Text style={styles.bookingIdText}>
              Booking ID : {booking.id || "LF123456789"}
            </Text>
          </View>
        </View>

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
                  {booking.pickupDate || "Thu, 12 Feb"}
                </Text>
                <Text style={styles.timeText}>
                  {booking.pickupTime || "10:00 AM"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.centerIconRow}>
            <View style={styles.dottedLine} />
            <Image
              source={require("./assets/car.png")}
              style={styles.centerCarIcon}
            />
            <View style={styles.dottedLine} />
          </View>

          <View style={styles.dateBlockRight}>
            <View style={styles.dateRow}>
              <View>
                <Text style={styles.dateText}>
                  {booking.dropDate || "Thu, 14 Feb"}
                </Text>
                <Text style={styles.timeText}>
                  {booking.dropTime || "12:00 PM"}
                </Text>
              </View>
              <Image
                source={require("./assets/down-arrow.png")}
                style={styles.arrowIcon}
              />
            </View>
          </View>
        </View>

        {/* 📞 Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.contactButton} onPress={onContact}>
            <Image
              source={require("./assets/call.png")}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.vehicleButton}
            onPress={onVehicleHandover}
          >
            <Text style={styles.vehicleText}>Vehicle Handover</Text>
          </TouchableOpacity>
        </View>

        {/* 📅 Status Row */}
        <View style={styles.footerRow}>
          <Text style={styles.statusText}>
            {booking.status || "Booking confirmed"}
          </Text>
          <Text style={styles.timeAgoText}>
            {booking.timeAgo || "20 min ago"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OngoingCard;

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  carTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  profileRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 8,
  },
  nameText: { fontSize: 15, fontWeight: "600", color: "#111827" },
  bookingIdBox: {
    backgroundColor: "#F3EDFF",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  bookingIdText: { fontSize: 10, fontWeight: "500", color: "#111827" },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateBlock: { alignItems: "flex-start", flex: 1 },
  dateBlockRight: { alignItems: "flex-end", flex: 1 },
  dateRow: { flexDirection: "row", alignItems: "center" },
  arrowIcon: { width: 26, height: 26, marginHorizontal: 6 },
  dateText: { fontSize: 13, fontWeight: "600", color: "#111827" },
  timeText: { fontSize: 12, color: "#6B7280" },
  centerIconRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1.1,
    justifyContent: "center",
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  centerCarIcon: {
    width: 26,
    height: 26,
    tintColor: "#111827",
    marginHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  contactButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6D38E8",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginRight: 10,
  },
  contactIcon: {
    width: 16,
    height: 16,
    tintColor: "#6D38E8",
    marginRight: 6,
  },
  contactText: { color: "#6D38E8", fontSize: 14, fontWeight: "600" },
  vehicleButton: {
    flex: 1,
    backgroundColor: "#6D38E8",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  vehicleText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 10,
  },
  statusText: { fontSize: 13, fontWeight: "500", color: "#111827" },
  timeAgoText: { fontSize: 13, color: "#6B7280" },
});
