import React, { useEffect, useState, useRef } from "react";
import messaging from "@react-native-firebase/messaging";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StatusBar, View } from "react-native";

// --- Onboarding Screens ---
import SplashScreen from "./Onboarding screens/SplashScreen";
import SignUpScreen from "./Onboarding screens/SignUpScreen";
import SignInScreen from "./Onboarding screens/SignInScreen";
import OTPScreen from "./Onboarding screens/OTPScreen";

// --- Host Registration Screens ---
import BecomeHostScreen from "./Onboarding screens/BecomeHostScreen";
import CarDetailsListScreen from "./Onboarding screens/CarDetailsScreen";
import CarImageUploadScreen from "./Onboarding screens/CarImageUploadScreen";
import PersonalDetailsScreen from "./Onboarding screens/PersonalDetailsScreen";
import PersonalLocation from "./Onboarding screens/PersonalLocation";
import SubmissionSuccessScreen from "./Onboarding screens/SubmissionSuccessScreen";
import UploadRegistrationScreen from "./Onboarding screens/UploadRegistrationScreen";
import EnterCarDetails from "./Earning/EnterCarDetails";
import GetBackSoon from "./Earning/GetBackSoon";

// --- Main App Screens ---
import HomePage from "./HomePage/Home";
import Earnings from "./Earning/Earnings";
import ProfileScreen from "./ProfileScreen/profile";
import NotificationScreen from "./ProfileScreen/NotificationScreen";

// --- Booking Screens ---
import BookingsStack from "./BookingScreens/BookingsStack";

// --- Report & Policy Screens ---
import PrivacyPolicyScreen from "./ProfileScreen/PrivacyPolicyScreen";
import EditProfileScreen from "./ProfileScreen/EditProfileScreen";
import SupportChat from "./ProfileScreen/SupportChat";
import DriverScreen from "./ProfileScreen/DriverScreen";
import ReportItemsScreen from "./ProfileScreen/ReportItemsScreen";
import ReportMethodsScreen from "./ProfileScreen/ReportMethodsScreen";
import AppPermissionScreen from "./ProfileScreen/AppPermissionScreen";
import CarListingScreen from "./Earning/CarListingScreen";
import CarDetailListingScreen from "./Earning/CarDetailListingScreen";


// --- Completed Screens ---
import CompletedBookingsScreen from "./CompletedScreens/CompletedBookingsScreen";
import CarDetailsScreen from "./CompletedScreens/CarDetailsScreen";


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------------------------------
   🎨 App Theme
--------------------------------------- */
const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7C3AED",
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#111827",
    border: "#E5E7EB",
    notification: "#7C3AED",
  },
};

/* ---------------------------------------
   🧭 Bottom Tab Navigator
--------------------------------------- */
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: "#7C3AED",
      tabBarInactiveTintColor: "#9CA3AF",
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 0.5,
        borderTopColor: "#E0E0E0",
        height: 60,
      },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, any> = {
          Home: require("./BookingScreens/assets/home.png"),
          Earnings: require("./BookingScreens/assets/earnings.png"),
          Bookings: require("./BookingScreens/assets/bookings.png"),
          Profile: require("./BookingScreens/assets/profile.png"),
        };

        return (
          <Image
            source={icons[route.name]}
            style={{
              width: size,
              height: size,
              tintColor: color,
              resizeMode: "contain",
            }}
          />
        );
      },

    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Earnings" component={Earnings} />
    <Tab.Screen
      name="Bookings"
      component={BookingsStack}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

/* ---------------------------------------
   🌍 Main App Component
--------------------------------------- */
const App = () => {
  const [isLightScreen, setIsLightScreen] = useState(false);
  const navRef = useRef<any>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };
    getToken();
  }, []);

  const handleStateChange = () => {
    const currentRoute = navRef.current?.getCurrentRoute()?.name;
    const whiteScreens = [
      "SignIn",
      "SignUp",
      "Profile",
      "Bookings",
      "Earnings",
      "PersonalDetails",
      "UploadRegistration",
      "PrivacyPolicy",
      "NotificationScreen",
      "EditProfileScreen",
      "CarDetailsScreen",
      "CarImageUpload",
      "EnterCarDetails",
    ];
    setIsLightScreen(whiteScreens.includes(currentRoute));
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={isLightScreen ? "#FFFFFF" : "#7C3AED"}
        barStyle={isLightScreen ? "dark-content" : "light-content"}
        animated
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: isLightScreen ? "#FFFFFF" : "#7C3AED" }}
        edges={["top", "left", "right"]}
      >
        <NavigationContainer
          ref={navRef}
          onStateChange={handleStateChange}
          theme={AppTheme}
        >
          <RootStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            {/* --- Onboarding Flow --- */}
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="SignIn" component={SignInScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="OTPScreen" component={OTPScreen} />

            {/* --- Host Registration Flow --- */}
            <RootStack.Screen name="HostRegistration" component={BecomeHostScreen} />
            <RootStack.Screen name="CarDetailsList" component={CarDetailsListScreen} />
            <RootStack.Screen name="CarImageUpload" component={CarImageUploadScreen} />
            <RootStack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
            <RootStack.Screen name="PersonalLocation" component={PersonalLocation} />
            <RootStack.Screen name="SubmissionSuccess" component={SubmissionSuccessScreen} />
            <RootStack.Screen name="UploadRegistration" component={UploadRegistrationScreen} />
            <RootStack.Screen name="EnterCarDetails" component={EnterCarDetails} />
            <RootStack.Screen name="GetBackSoon" component={GetBackSoon} />

            {/* --- Main Tabs --- */}
            <RootStack.Screen name="MainTabs" component={BottomTabs} />

            {/* --- Other Screens --- */}
            <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
            <RootStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <RootStack.Screen name="SupportChat" component={SupportChat} />
            <RootStack.Screen name="CompletedBookings" component={CompletedBookingsScreen} />
            <RootStack.Screen name="DriverScreen" component={DriverScreen} />
            <RootStack.Screen name="CarListingScreen" component={CarListingScreen} />
            <RootStack.Screen name="CarDetailListingScreen" component={CarDetailListingScreen} />
            <RootStack.Screen
              name="CompletedBookingsRoot"
              component={CompletedBookingsScreen}
            />


          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
