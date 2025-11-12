import React, { useState } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BookingCard from "../BookingScreens/BookingCard";

const UpcomingScreen = () => {
  const navigation = useNavigation<any>();

  const [bookings, setBookings] = useState([
    {
      id: "LF123456789",
      userName: "Raju",
      startDate: "Thu, 12 Feb",
      startTime: "10:00 AM",
      endDate: "Thu, 14 Feb",
      endTime: "12:00 PM",
      amount: 2000,
      userAvatar: require("../BookingScreens/assets/avatar.png"),
    },
    {
      id: "LF123456790",
      userName: "Ravi",
      startDate: "Fri, 14 Feb",
      startTime: "9:00 AM",
      endDate: "Sat, 15 Feb",
      endTime: "6:00 PM",
      amount: 2500,
      userAvatar: require("../BookingScreens/assets/avatar.png"),
    },
  ]);

  const handleDeclineBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onVerify={() => {
              console.log("Navigating to UpcomingApproval...");
              navigation.navigate("UpcomingApproval", {
                booking: booking,
                onDecline: handleDeclineBooking,
              });
            }}

          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpcomingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
