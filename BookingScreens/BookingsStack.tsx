import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookingsScreen from "./BookingsScreen";
import CarListingScreen from "../Earning/CarListingScreen";

// Upcoming Screens
import UpcomingScreen from "../UpcomingScreens/UpcomingScreen";
import UpcomingApproval from "../UpcomingScreens/UpcomingApproval";
import UpcomingSubmission from "../UpcomingScreens/UpcomingSubmission";

// Ongoing Screens
import OngoingScreen from "../OngoingScreen/OngoingScreen";
import HandOverScreen from "../OngoingScreen/HandOverScreen";
import UpcomingBookingDetailScreen from "../OngoingScreen/UpcomingBookingDetailScreen";
import UpcomingBookingDetailScreen2 from "../OngoingScreen/UpcomingBookingDetailScreen2";

// ✅ Completed Screens
import CompletedBookingsScreen from "../CompletedScreens/CompletedBookingsScreen";
import UpdatedPage from '../CompletedScreens/Updatedpage'
import CarDetailsScreen from "../CompletedScreens/CarDetailsScreen";


// Post-trip
import RiderSummary from "../UpcomingScreens/RideSummary";
import RatingScreen from "../UpcomingScreens/RatingScreen";

const Stack = createNativeStackNavigator();

const BookingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingsMain" component={BookingsScreen} options={{headerShown:false}} />

      {/* Upcoming Flow */}
      <Stack.Screen name="UpcomingScreen" component={UpcomingScreen} />
      <Stack.Screen name="UpcomingApproval" component={UpcomingApproval} />
      <Stack.Screen name="UpcomingSubmission" component={UpcomingSubmission} />

      {/* Ongoing */}
      <Stack.Screen name="OngoingScreen" component={OngoingScreen} />
      <Stack.Screen name="HandOverScreen" component={HandOverScreen} />
      <Stack.Screen
        name="UpcomingBookingDetailScreen"
        component={UpcomingBookingDetailScreen}
      />
      <Stack.Screen
        name="UpcomingBookingDetailScreen2"
        component={UpcomingBookingDetailScreen2}
      />

      <Stack.Screen name="CompletedBookings" component={CompletedBookingsScreen} />
      <Stack.Screen name="UpdatedPage" component={UpdatedPage} />
      <Stack.Screen name="CarDetailsScreen" component={CarDetailsScreen} />
    

      {/* Post-trip */}
      <Stack.Screen name="RiderSummary" component={RiderSummary} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
    </Stack.Navigator>
  );
};

export default BookingsStack;
