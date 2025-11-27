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
import { Image, StatusBar } from "react-native";

// Onboarding
import SplashScreen from "./Onboarding screens/SplashScreen";
import SignUpScreen from "./Onboarding screens/SignUpScreen";
import SignInScreen from "./Onboarding screens/SignInScreen";
import OTPScreen from "./Onboarding screens/OTPScreen";

// Host Registration
import BecomeHostScreen from "./Onboarding screens/BecomeHostScreen";
import CarFormScreen from "./Onboarding screens/CarDetailsScreen";
import CarImageUploadScreen from "./Onboarding screens/CarImageUploadScreen";
import PersonalDetailsScreen from "./Onboarding screens/PersonalDetailsScreen";
import PersonalLocation from "./Onboarding screens/PersonalLocation";
import UploadRegistrationScreen from "./Onboarding screens/UploadRegistrationScreen";
import EnterCarDetails from "./Earning/EnterCarDetails";
import GetBackSoon from "./Earning/GetBackSoon";

// Final Page (Success)
import FinalPage from "./Onboarding screens/FinalPage";

// Car Screens
import CarInList from "./Earning/CarInList";

// Main App Screens
import HomePage from "./HomePage/Home";
import EarningsStack from "./Earning/EarningsStack";
import ProfileScreen from "./ProfileScreen/profile";
import NotificationScreen from "./ProfileScreen/NotificationScreen";

// Booking Screens
import BookingsStack from "./BookingScreens/BookingsStack";

// Report & Policy Screens
import PrivacyPolicyScreen from "./ProfileScreen/PrivacyPolicyScreen";
import EditProfileScreen from "./ProfileScreen/EditProfileScreen";
import SupportChat from "./ProfileScreen/SupportChat";
import DriverScreen from "./ProfileScreen/DriverScreen";
import FQA from "./ProfileScreen/FAQScreen";
import AppPermissionScreen from "./ProfileScreen/AppPermissionScreen";
import IdProof from "./ProfileScreen/IdProof";

import Editcar from "./Earning/Editcar";



// Completed Screens
import CompletedBookingsScreen from "./CompletedScreens/CompletedBookingsScreen";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* Theme */
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

/* Bottom Tabs */
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#7C3AED",
      tabBarInactiveTintColor: "#9CA3AF",
      tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 0.5,
        borderTopColor: "#E0E0E0",
      },
      tabBarIcon: ({ color, size }) => {
        const icons = {
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
    <Tab.Screen name="Earnings" component={EarningsStack} />
    <Tab.Screen name="Bookings" component={BookingsStack} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

/* Main App */
const App = () => {
  const [isLightScreen, setIsLightScreen] = useState(false);
  const navRef = useRef<any>(null);

  useEffect(() => {
    messaging().getToken().then((token) => console.log("FCM Token:", token));
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
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isLightScreen ? "#FFFFFF" : "#7C3AED",
        }}
        edges={["top", "left", "right"]}
      >
        <NavigationContainer
          ref={navRef}
          onStateChange={handleStateChange}
          theme={AppTheme}
        >
          <RootStack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            {/* Onboarding */}
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="SignIn" component={SignInScreen} />
            <RootStack.Screen name="SignUp" component={SignUpScreen} />
            <RootStack.Screen name="OTPScreen" component={OTPScreen} />

            {/* Host Registration */}
            <RootStack.Screen name="HostRegistration" component={BecomeHostScreen} />
            <RootStack.Screen name="CarFormScreen" component={CarFormScreen} />
            <RootStack.Screen name="CarImageUpload" component={CarImageUploadScreen} />
            <RootStack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
            <RootStack.Screen name="PersonalLocation" component={PersonalLocation} />
            <RootStack.Screen name="UploadRegistration" component={UploadRegistrationScreen} />
            <RootStack.Screen name="EnterCarDetails" component={EnterCarDetails} />
            <RootStack.Screen name="GetBackSoon" component={GetBackSoon} />

            {/* Final Page */}
            <RootStack.Screen name="FinalPage" component={FinalPage} />

            {/* Main Tabs */}
            <RootStack.Screen name="MainTabs" component={BottomTabs} />

            {/* Car Screens (GLOBAL) */}
            <RootStack.Screen name="CarInList" component={CarInList} />
            <RootStack.Screen name="Editcar" component={Editcar} />

            {/* Misc Screens */}
            <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
            <RootStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <RootStack.Screen name="SupportChat" component={SupportChat} />
            <RootStack.Screen name="CompletedBookings" component={CompletedBookingsScreen} />
            <RootStack.Screen name="DriverScreen" component={DriverScreen} />
            <RootStack.Screen name="FQA" component={FQA} />
            <RootStack.Screen name="AppPermissionScreen" component={AppPermissionScreen} />
            <RootStack.Screen name="IdProof" component={IdProof} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
