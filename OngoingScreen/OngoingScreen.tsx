import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import OngoingCard from "./OngoingCard";
import { useNavigation } from "@react-navigation/native";

const OngoingScreen = () => {
  const navigation = useNavigation<any>();
  const [activeFilter, setActiveFilter] = useState("All");

  const bookings = [
    {
      id: "LF123456789",
      name: "Raju",
      carName: "Toyota Corolla 2023",
      pickupDate: "Thu, 12 Feb",
      pickupTime: "10:00 AM",
      dropDate: "Thu, 14 Feb",
      dropTime: "12:00 PM",
      status: "Booking confirmed",
      timeAgo: "20 min ago",
      profilePic: require("../BookingScreens/assets/avatar.png"),
    },
    {
      id: "LF987654321",
      name: "Vikram",
      carName: "Honda City 2022",
      pickupDate: "Fri, 15 Feb",
      pickupTime: "11:00 AM",
      dropDate: "Sat, 16 Feb",
      dropTime: "09:00 AM",
      status: "Booking confirmed",
      timeAgo: "10 min ago",
      profilePic: require("../BookingScreens/assets/avatar.png"),
    },
  ];

  const filters = ["All", "Car names"];

  const handleContact = (name: string) => {
    console.log(`📞 Contact pressed for ${name}`);
  };

  // ✅ Navigate to UpcomingBookingDetailScreen with booking details
  const handleVehicleHandover = (booking: any) => {
    navigation.navigate("UpcomingBookingDetailScreen", { booking });
  };

  return (
    <View style={styles.container}>
      {/* ---------- FILTERS ---------- */}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.activeFilterChip,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- BOOKINGS ---------- */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((booking, index) => (
          <OngoingCard
            key={index}
            booking={booking}
            onContact={() => handleContact(booking.name)}
            onVehicleHandover={() => handleVehicleHandover(booking)} // 👈 Here it navigates
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default OngoingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  activeFilterChip: {
    backgroundColor: "#6D38E8",
    borderColor: "#6D38E8",
  },
  filterText: {
    fontSize: 13,
    color: "#666666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
});
