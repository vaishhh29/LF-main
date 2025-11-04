import React from 'react';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {Feather} from 'react-native-vector-icons/Feather';

// --- Onboarding Screens ---
import SplashScreen from './Onboarding screens/SplashScreen';
import SignUpScreen from './Onboarding screens/SignUpScreen';
import SignInScreen from './Onboarding screens/SignInScreen';
import OTPScreen from './Onboarding screens/OTPScreen';

// --- Host Registration Screens ---
import BecomeHostScreen from './Onboarding screens/BecomeHostScreen';
import CarDetailsScreen from './Onboarding screens/CarDetailsScreen';
import CarListDetailsScreen from './Earning/CarListDetailsScreen';
import CarImageUploadScreen from './Onboarding screens/CarImageUploadScreen';
import PersonalDetailsScreen from './Onboarding screens/PersonalDetailsScreen';
import PersonalLocation from './Onboarding screens/PersonalLocation';
import SubmissionSuccessScreen from './Onboarding screens/SubmissionSuccessScreen';
import UploadRegistrationScreen from './Onboarding screens/UploadRegistrationScreen';

// --- Main App Screens ---
import HomePage from './HomePage/Home';
import Earnings from './Earning/Earnings';
import ProfileScreen from './ProfileScreen/profile';
import NotificationScreen from './ProfileScreen/NotificationScreen';

// --- Booking Screens ---
// New BookingsScreen with tabs (Upcoming, Ongoing, Completed)
import BookingsScreen from './Booking screens/BookingsScreen';
// Original RatingScreen (can be accessed from BookingsScreen)
import RatingScreen from './Booking screens/RatingScreen';

// --- Report Flow Screens ---
// Import the new report screens for user reporting functionality
import UserProfileScreen from './ProfileScreen/DriverScreen';
import ReportItemsScreen from './ProfileScreen/ReportItemsScreen';
import ReportMethodsScreen from './ProfileScreen/ReportMethodsScreen';
import AppPermissionScreen from './ProfileScreen/AppPermissionScreen';

// --- Policy & Settings Screens ---
// Privacy Policy screen with expandable sections
import PrivacyPolicyScreen from './ProfileScreen/PrivacyPolicyScreen';
import { Image } from 'react-native';
import UpcomingBookingDetailScreen from './Booking screens/UpcomingBookingDetailScreen';
import EnterCodeScreen from './Booking screens/EnterCodeScreen';
import CompletedBookingsScreen from './Completed screens/CompletedBookingsScreen';
import BookingDetailsScreen from './Booking screens/BookingDetailsScreen';
import DriverScreen from './ProfileScreen/DriverScreen';
import SupportChat from './ProfileScreen/SupportChat';
import EditProfileScreen from './ProfileScreen/EditProfileScreen';
import CarListingScreen from './Earning/CarListingScreen';
// --- Stack & Tab Navigators ---
const RootStack = createNativeStackNavigator();
const OnboardingStackNav = createNativeStackNavigator();
const HostStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ----------------------
   Bottom Tabs Navigator
   ----------------------
   Main navigation tabs for authenticated users:
   - Home: Browse and manage cars
   - Earnings: View financial data
   - Bookings: View and manage all bookings (Upcoming, Ongoing, Completed)
   - Profile: User profile and settings
---------------------- */
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#6D38E8',
      tabBarInactiveTintColor: '#9E9E9E',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        height: 60,
        paddingBottom: 6,
      },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, any> = {
          Home: require('./Booking screens/assets/home.png'),
          Earnings: require('./Booking screens/assets/earnings.png'),
          Bookings: require('./Booking screens/assets/bookings.png'),
          Profile: require('./Booking screens/assets/profile.png'),
        };
       return (
          <Image
            source={icons[route.name]}
            style={{
              width: size,
              height: size,
              tintColor: color, // makes icon adapt to active/inactive color
              resizeMode: 'contain',
            }}
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Earnings" component={Earnings} />

    {/* Updated Bookings tab to use new BookingsScreen with tabs */}
    <Tab.Screen name="Bookings" component={BookingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

/* ----------------------
   Onboarding Stack Navigator
   ----------------------
   Handles the initial user authentication flow:
   1. Splash: App loading screen
   2. SignUp: New user registration
   3. SignIn: Existing user login
   4. OTP: Phone verification
---------------------- */
const OnboardingStack = () => (
  <OnboardingStackNav.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStackNav.Screen name="Splash" component={SplashScreen} />
    <OnboardingStackNav.Screen name="SignUp" component={SignUpScreen} />
    <OnboardingStackNav.Screen name="SignIn" component={SignInScreen} />
    <OnboardingStackNav.Screen name="OTP" component={OTPScreen} />
  </OnboardingStackNav.Navigator>
);

/* ----------------------
   Host Registration Stack
   ----------------------
   Multi-step flow for users to become car hosts:
   1. BecomeHost: Introduction and benefits
   2. CarDetails: Enter car information
   3. CarImageUpload: Upload car photos
   4. PersonalDetails: Host personal information
   5. PersonalLocation: Set pickup location
   6. UploadRegistration: Upload documents
   7. SubmissionSuccess: Confirmation screen
---------------------- */
const HostRegistrationStack = () => (
  <HostStackNav.Navigator screenOptions={{ headerShown: false }}>
    <HostStackNav.Screen name="BecomeHost" component={BecomeHostScreen} />
    <HostStackNav.Screen name="CarDetails" component={CarDetailsScreen} />
    <HostStackNav.Screen name="CarImageUpload" component={CarImageUploadScreen} />
    <HostStackNav.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
    <HostStackNav.Screen name="PersonalLocation" component={PersonalLocation} />
    <HostStackNav.Screen name="UploadRegistration" component={UploadRegistrationScreen} />
    <HostStackNav.Screen name="SubmissionSuccess" component={SubmissionSuccessScreen} />
  </HostStackNav.Navigator>
);

/* ----------------------
   Root App Navigator
   ----------------------
   Top-level navigator that controls the entire app flow:
   - Onboarding: Authentication screens
   - HostRegistration: Host signup process
   - MainTabs: Main app with bottom tabs (includes new BookingsScreen)
   - RatingScreen: Booking rating/review (can be accessed from BookingsScreen)
   - UserProfile: View user profile (for reporting)
   - ReportItems: Select report category
   - ReportMethods: Select specific report method
   - AppPermissionScreen: Manage app permissions
   - PrivacyPolicy: View privacy policy with expandable sections
   
   These screens are accessible from various places in the app
   and sit at the root level for easy navigation.
---------------------- */
const App = () => {
 useEffect(() => {
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(' FCM Token:', token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  getToken();
}, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding"
        >
          {/* Onboarding Flow - User authentication */}
          <RootStack.Screen name="Onboarding" component={OnboardingStack} />
          <RootStack.Screen name="EditProfileScreen" component={EditProfileScreen} />

          {/* Host Registration Flow - Become a car host */}
          <RootStack.Screen name="HostRegistration" component={HostRegistrationStack} />

          {/* Main App with Bottom Tabs - Primary app navigation */}
          <RootStack.Screen name="MainTabs" component={BottomTabs} />

          {/* Booking Related Screens */}
          {/* RatingScreen: Rate and review a completed booking */}
           <RootStack.Screen 
            name="UpcomingBookingDetailScreen" 
            component={UpcomingBookingDetailScreen} 
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />

          <RootStack.Screen 
            name="CompletedBookingsScreen" 
            component={CompletedBookingsScreen} 
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen 
            name="BookingDetailsScreen" 
            component={BookingDetailsScreen} 
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen 
            name="CarDetailsScreen" 
            component={CarDetailsScreen} 
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen 
          name="CarCard" 
          component={CarListingScreen} 
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />

          <RootStack.Screen 
            name="EnterCodeScreen" 
            component={EnterCodeScreen} 
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen 
            name="RatingScreen" 
            component={RatingScreen}
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen 
            name="DriverScreen" 
            component={DriverScreen}
            options={{
              presentation: 'card'
            }}
          />
          {/* Report Flow Screens - User reporting functionality */}
          {/* UserProfile: Displays user details with option to report */}
          <RootStack.Screen 
            name="UserProfile" 
            component={UserProfileScreen}
            options={{
              presentation: 'card',
            }}
          />
          
          {/* ReportItems: Lists main report categories */}
          <RootStack.Screen 
            name="ReportItems" 
            component={ReportItemsScreen}
            options={{
              presentation: 'card',
            }}
          />
          
          {/* ReportMethods: Shows specific reporting methods */}
          <RootStack.Screen 
            name="ReportMethods" 
            component={ReportMethodsScreen}
            options={{
              presentation: 'card',
            }}
          />

          {/* Settings & Policy Screens */}
          {/* AppPermissionScreen: Manage app permissions (camera, location, etc.) */}
          <RootStack.Screen 
            name="AppPermissionScreen" 
            component={AppPermissionScreen} 
            options={{ 
              presentation: 'card', 
              headerShown: true, 
              title: 'App Permissions',
              animation: 'slide_from_right',
            }} 
          />

          {/* PrivacyPolicy: Displays app policies with expandable accordion sections */}
          <RootStack.Screen 
            name="PrivacyPolicy" 
            component={PrivacyPolicyScreen}
            options={{
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />

          <RootStack.Screen 
            name="NotificationScreen" 
            component={NotificationScreen} 
            options={{ 
              presentation: 'card', 
              headerShown: true, 
              title: 'Notifications',
              animation: 'slide_from_right',
            }} 
          />

           <RootStack.Screen 
            name="SupportChat" 
            component={SupportChat} 
            options={{ 
              presentation: 'card', 
              headerShown: true, 
              title: 'Support Chat',
              animation: 'slide_from_right',
            }} 
          />
          <RootStack.Screen 
          name="CarListDetails" 
          component={CarListDetailsScreen} 
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }} 
        />

        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;