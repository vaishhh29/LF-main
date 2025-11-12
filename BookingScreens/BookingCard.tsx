import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Booking {
  id: string;
  userName: string;
  userAvatar?: any;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  amount: number;
}

interface Props {
  booking: Booking;
  onVerify?: () => void; // optional but must be a function
}


const BookingCard: React.FC<Props> = ({ booking, onVerify }) => {
  return (
    <View style={styles.card}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.headerRow}>
        <View style={styles.userSection}>
          <Image
            source={booking.userAvatar || require("./assets/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{booking.userName}</Text>
        </View>

        <View style={styles.bookingBox}>
          <Text style={styles.bookingId}>
            Booking ID : {booking.id || "N/A"}
          </Text>
        </View>
      </View>

      {/* ---------- TIMELINE ---------- */}
      <View style={styles.timelineWrapper}>
        {/* Left side */}
        <View style={styles.timelineSide}>
          <Image
            source={require("./assets/up-arrow.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{booking.startDate}</Text>
            <Text style={styles.timeText}>{booking.startTime}</Text>
          </View>
        </View>

        {/* Center with car */}
        <View style={styles.centerSection}>
          <View style={styles.dottedLine} />
          <Image
            source={require("./assets/car.png")}
            style={styles.carIcon}
            resizeMode="contain"
          />
          <View style={styles.dottedLine} />
        </View>

        {/* Right side */}
        <View style={styles.timelineSide}>
          <View style={styles.dateContainerRight}>
            <Text style={styles.dateText}>{booking.endDate}</Text>
            <Text style={styles.timeText}>{booking.endTime}</Text>
          </View>
          <Image
            source={require("./assets/down-arrow.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* ---------- DIVIDER ---------- */}
      <View style={styles.dashedDivider} />

      {/* ---------- FOOTER ---------- */}
      <View style={styles.footerRow}>
        <Text style={styles.fareText}>
          Ride fair : <Text style={styles.fareAmount}>₹{booking.amount}</Text>
        </Text>
        <TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: "#E5E7EB",
  },

  /** HEADER **/
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  bookingBox: {
    backgroundColor: "#F4F0FF",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bookingId: {
    fontSize: 13,
    color: "#6B21A8",
    fontWeight: "500",
  },

  /** TIMELINE **/
  timelineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: "100%",
  },
  timelineSide: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  dateContainer: {
    marginLeft: 6,
    alignItems: "flex-start",
  },
  dateContainerRight: {
    marginRight: 6,
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  timeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  icon: {
    width: 22,
    height: 22,
  },

  centerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  carIcon: {
    width: 26,
    height: 26,
    tintColor: "#111827",
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderWidth: 0.8,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    marginHorizontal: 6,
  },

  /** DIVIDER **/
  dashedDivider: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    marginVertical: 10,
  },

  /** FOOTER **/
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fareText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  fareAmount: {
    fontWeight: "700",
    color: "#111827",
  },
  verifyButton: {
    backgroundColor: "#7C3AED",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 10,
  },
  verifyText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
