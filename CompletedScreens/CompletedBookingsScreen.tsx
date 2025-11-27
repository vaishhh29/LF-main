import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 

const SAMPLE_BOOKINGS = [
  {
    id: "LF123456789",
    carModel: "Toyota Corolla",
    carYear: 2023,
    userName: "Raju",
    userAvatar: require("./assets/avatar.png"),
    startDate: "Thu, 12 Feb",
    startTime: "10:00 AM",
    endDate: "Thu, 14 Feb",
    endTime: "12:00 PM",
    status: "Ride Completed",
    completedDaysAgo: 2,
  },
  {
    id: "LF987654321",
    carModel: "Honda City",
    carYear: 2022,
    userName: "Vikram",
    userAvatar: require("./assets/avatar.png"),
    startDate: "Fri, 15 Feb",
    startTime: "11:00 AM",
    endDate: "Sat, 16 Feb",
    endTime: "09:00 AM",
    status: "Ride Completed",
    completedDaysAgo: 2,
  },
];

const formatDaysAgo = (days: number): string => {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

const CompletedBookingsScreen = () => {
  const navigation = useNavigation<any>();
  const bookings = useMemo(() => SAMPLE_BOOKINGS, []);

  
  const handleCardPress = (booking: any) => {
    navigation.navigate("UpdatedPage", { booking });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
        {bookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            activeOpacity={0.9}
            onPress={() => handleCardPress(booking)}
          >
            <View style={styles.card}>
              <Text style={styles.carModel}>
                {booking.carModel} {booking.carYear}
              </Text>

              {/* ---------- USER INFO ---------- */}
              <View style={styles.userRow}>
                <View style={styles.userInfo}>
                  <Image source={booking.userAvatar} style={styles.avatar} />
                  <Text style={styles.userName}>{booking.userName}</Text>
                </View>

                <View style={styles.bookingIdBox}>
                  <Text style={styles.bookingIdText}>
                    Booking ID: {booking.id}
                  </Text>
                </View>
              </View>

              {/* ---------- TIMELINE ---------- */}
              <View style={styles.timeline}>
                <Image
                  source={require("./assets/up-arrow.png")}
                  style={styles.iconSmall}
                />
                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{booking.startDate}</Text>
                  <Text style={styles.timeText}>{booking.startTime}</Text>
                </View>

                <Image
                  source={require("./assets/car.png")}
                  style={styles.iconSmall}
                />

                <View style={styles.dateBox}>
                  <Text style={styles.dateText}>{booking.endDate}</Text>
                  <Text style={styles.timeText}>{booking.endTime}</Text>
                </View>

                <Image
                  source={require("./assets/down-arrow.png")}
                  style={styles.iconSmall}
                />
              </View>

              <View style={styles.dashedLine} />

              {/* ---------- FOOTER ---------- */}
              <View style={styles.footer}>
                <Text style={styles.statusText}>{booking.status}</Text>
                <Text style={styles.daysAgo}>
                  {formatDaysAgo(booking.completedDaysAgo)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedBookingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  carModel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  userName: { fontSize: 14, color: "#111827", fontWeight: "500" },
  bookingIdBox: {
    backgroundColor: "#F3EDFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bookingIdText: { fontSize: 12, color: "#111827", fontWeight: "500" },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconSmall: { width: 20, height: 20, tintColor: "#111827" },
  dateBox: { alignItems: "center" },
  dateText: { fontSize: 13, color: "#111827", fontWeight: "500" },
  timeText: { fontSize: 12, color: "#6B7280" },
  dashedLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E5E7EB",
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusText: { fontSize: 14, fontWeight: "500", color: "#111827" },
  daysAgo: { fontSize: 13, color: "#6B7280" },
});
