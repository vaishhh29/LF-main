import React, { useEffect, useState, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StatusBar } from 'react-native';

// --- Onboarding Screens ---
import SplashScreen from './Onboarding screens/SplashScreen';
import SignUpScreen from './Onboarding screens/SignUpScreen';
import SignInScreen from './Onboarding screens/SignInScreen';
import OTPScreen from './Onboarding screens/OTPScreen';

// --- Host Registration Screens ---
import BecomeHostScreen from './Onboarding screens/BecomeHostScreen';
import CarDetailsListScreen from './Onboarding screens/CarDetailsScreen';
import CarListDetailsScreen from './Earning/CarListDetailsScreen';
import CarImageUploadScreen from './Onboarding screens/CarImageUploadScreen';
import PersonalDetailsScreen from './Onboarding screens/PersonalDetailsScreen';
import PersonalLocation from './Onboarding screens/PersonalLocation';
import SubmissionSuccessScreen from './Onboarding screens/SubmissionSuccessScreen';
import UploadRegistrationScreen from './Onboarding screens/UploadRegistrationScreen';
import EnterCarDetails from './Earning/EnterCarDetails'
import GetBackSoon from './Earning/GetBackSoon';

// --- Main App Screens ---
import HomePage from './HomePage/Home';
import Earnings from './Earning/Earnings';
import ProfileScreen from './ProfileScreen/profile';
import NotificationScreen from './ProfileScreen/NotificationScreen';

// --- Booking Screens ---
import BookingsScreen from './Booking screens/BookingsScreen';
import RatingScreen from './Booking screens/RatingScreen';
import UpcomingSubmission from './Booking screens/UpcomingSubmission';
import EndTripScreen from './Booking screens/EndTripScreen';

// --- Report Flow Screens ---
import UserProfileScreen from './ProfileScreen/DriverScreen';
import ReportItemsScreen from './ProfileScreen/ReportItemsScreen';
import ReportMethodsScreen from './ProfileScreen/ReportMethodsScreen';
import AppPermissionScreen from './ProfileScreen/AppPermissionScreen';

// --- Policy & Settings Screens ---
import PrivacyPolicyScreen from './ProfileScreen/PrivacyPolicyScreen';
import UpcomingBookingDetailScreen from './Booking screens/UpcomingBookingDetailScreen';
import UpcomingDetailScreen from './Booking screens/UpcomingDetailScreen';
import EnterCodeScreen from './Booking screens/EnterCodeScreen';
import CompletedBookingsScreen from './Completed screens/CompletedBookingsScreen';
import BookingDetailsScreen from './Booking screens/BookingDetailsScreen';
import DriverScreen from './ProfileScreen/DriverScreen';
import SupportChat from './ProfileScreen/SupportChat';
import EditProfileScreen from './ProfileScreen/EditProfileScreen';
import CarListingScreen from './Earning/CarListingScreen';
import CarDetailsScreen from './Completed screens/CarDetailsScreen';
import CarDetailListingScreen from './Earning/CarDetailListingScreen';


const RootStack = createNativeStackNavigator();
const OnboardingStackNav = createNativeStackNavigator();
const HostStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------------------------------
   🎨 App Theme
   --------------------------------------- */
const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7C3AED',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
    notification: '#7C3AED',
  },
};

/* ---------------------------------------
   SafeArea Wrapper Helper
   --------------------------------------- */
const withSafeArea = (Component: React.FC<any>) => () => (
  <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
    <Component />
  </SafeAreaView>
);

const HomePageWithSafeArea = withSafeArea(HomePage);
const EarningsWithSafeArea = withSafeArea(Earnings);
const BookingsScreenWithSafeArea = withSafeArea(BookingsScreen);
const ProfileScreenWithSafeArea = withSafeArea(ProfileScreen);
const SplashScreenWithSafeArea = withSafeArea(SplashScreen);
const SignUpScreenWithSafeArea = withSafeArea(SignUpScreen);
const SignInScreenWithSafeArea = withSafeArea(SignInScreen);
const OTPScreenWithSafeArea = withSafeArea(OTPScreen);
const BecomeHostScreenWithSafeArea = withSafeArea(BecomeHostScreen);
const CarDetailsScreenWithSafeArea = withSafeArea(CarDetailsScreen);
const CarImageUploadScreenWithSafeArea = withSafeArea(CarImageUploadScreen);
const PersonalDetailsScreenWithSafeArea = withSafeArea(PersonalDetailsScreen);
const PersonalLocationWithSafeArea = withSafeArea(PersonalLocation);
const UploadRegistrationScreenWithSafeArea = withSafeArea(UploadRegistrationScreen);
const SubmissionSuccessScreenWithSafeArea = withSafeArea(SubmissionSuccessScreen);
const CarDetailsListScreenWithSafeArea = withSafeArea(CarDetailsListScreen);
const NotificationScreenWithSafeArea = withSafeArea(NotificationScreen);
const EditProfileScreenWithSafeArea = withSafeArea(EditProfileScreen);
const UserProfileScreenWithSafeArea = withSafeArea(UserProfileScreen);
const ReportItemsScreenWithSafeArea = withSafeArea(ReportItemsScreen);
const ReportMethodsScreenWithSafeArea = withSafeArea(ReportMethodsScreen);
const AppPermissionScreenWithSafeArea = withSafeArea(AppPermissionScreen);
const PrivacyPolicyScreenWithSafeArea = withSafeArea(PrivacyPolicyScreen);
const SupportChatWithSafeArea = withSafeArea(SupportChat);
const DriverScreenWithSafeArea = withSafeArea(DriverScreen);
const RatingScreenWithSafeArea = withSafeArea(RatingScreen);
const UpcomingSubmissionWithSafeArea = withSafeArea(UpcomingSubmission);
const EndTripScreenWithSafeArea = withSafeArea(EndTripScreen);
const UpcomingBookingDetailScreenWithSafeArea = withSafeArea(UpcomingBookingDetailScreen);
const UpcomingDetailScreenWithSafeArea = withSafeArea(UpcomingDetailScreen);
const EnterCodeScreenWithSafeArea = withSafeArea(EnterCodeScreen);
const CompletedBookingsScreenWithSafeArea = withSafeArea(CompletedBookingsScreen);
const BookingDetailsScreenWithSafeArea = withSafeArea(BookingDetailsScreen);
const CarListingScreenWithSafeArea = withSafeArea(CarListingScreen);
const CarDetailListingScreenWithSafeArea = withSafeArea(CarDetailListingScreen);
const EnterCarDetailsWithSafeArea = withSafeArea(EnterCarDetails); // ✅ This is defined
const GetBackSoonWithSafeArea = withSafeArea(GetBackSoon);
const CarListDetailsScreenWithSafeArea = withSafeArea(CarListDetailsScreen);

/* ---------------------------------------
   🧭 Bottom Tab Navigator
   --------------------------------------- */
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#7C3AED',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0.5,
        borderTopColor: '#E0E0E0',
        height: 60,
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
              tintColor: color,
              resizeMode: 'contain',
            }}
          />
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomePageWithSafeArea} />
    <Tab.Screen name="Earnings" component={EarningsWithSafeArea} />
    <Tab.Screen name="Bookings" component={BookingsScreenWithSafeArea} />
    <Tab.Screen name="Profile" component={ProfileScreenWithSafeArea} />
  </Tab.Navigator>
);

/* ---------------------------------------
   Root App
   --------------------------------------- */
const App = () => {
  const [isLightScreen, setIsLightScreen] = useState(false);
  const navRef = useRef<any>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    };
    getToken();
  }, []);

  const handleStateChange = () => {
    const currentRoute = navRef.current?.getCurrentRoute()?.name;
    const whiteScreens = [
      'SignIn',
      'SignUp',
      'Profile',
      'Bookings',
      'Earnings',
      'PersonalDetails',
      'UploadRegistration',
      'PrivacyPolicy',
      'NotificationScreen',
      'EditProfileScreen',
      'CarDetailsScreen',
      'CarImageUpload',
      'EnterCarDetails',
      'CarAddDetails',
      'CarImageUploadScreen',
    ];
    setIsLightScreen(whiteScreens.includes(currentRoute));
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={isLightScreen ? '#FFFFFF' : '#7C3AED'}
        barStyle={isLightScreen ? 'dark-content' : 'light-content'}
        animated
      />

      <NavigationContainer ref={navRef} onStateChange={handleStateChange} theme={AppTheme}>
        <RootStack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: isLightScreen ? '#FFFFFF' : '#7C3AED',
            },
            headerTintColor: isLightScreen ? '#111827' : '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 17,
            },
          }}
        >
          {/* Onboarding Flow */}
          <RootStack.Screen
            name="Onboarding"
            component={SplashScreenWithSafeArea}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SignIn"
            component={SignInScreenWithSafeArea}
            options={{ title: 'Sign In', headerShown: false }}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreenWithSafeArea}
            options={{ title: 'Sign Up', headerShown: false }}
          />

          {/* Host Registration Flow */}
          <RootStack.Screen
            name="HostRegistration"
            component={BecomeHostScreenWithSafeArea}
            options={{ title: 'Become a Host', headerShown: false }}
          />
          <RootStack.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreenWithSafeArea}
            options={{ title: 'Personal Details', headerShown: false }}
          />
          <RootStack.Screen
            name="UploadRegistration"
            component={UploadRegistrationScreenWithSafeArea}
            options={{ title: 'Upload RC', headerShown: false }}
          />
          {/* CarImageUploadScreen comes FIRST */}
          <RootStack.Screen
            name="CarImageUpload"
            component={CarImageUploadScreenWithSafeArea}
            options={{ title: 'Upload Car Images', headerShown: false }}
          />
          {/* Then CarDetailsScreen */}
          <RootStack.Screen
            name="CarDetailsScreen"
            component={CarDetailsScreenWithSafeArea}
            options={{ title: 'Car Details', headerShown: false }}
          />
       
          {/* FIXED: Use EnterCarDetailsWithSafeArea instead of EnterCarDetails */}
          <RootStack.Screen
            name="EnterCarDetails"
            component={EnterCarDetailsWithSafeArea}
            options={{ title: 'Add Car Details', headerShown: false }}
          />

          {/* Main App Flow */}
          <RootStack.Screen
            name="MainTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />

          {/* Profile & Settings Screens */}
          <RootStack.Screen
            name="NotificationScreen"
            component={NotificationScreenWithSafeArea}
            options={{ title: 'Notifications' }}
          />
          <RootStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreenWithSafeArea}
            options={{ title: 'Privacy Policy' }}
          />
          <RootStack.Screen
            name="EditProfileScreen"
            component={EditProfileScreenWithSafeArea}
            options={{ title: 'Edit Profile' }}
          />
          <RootStack.Screen
            name="SupportChat"
            component={SupportChatWithSafeArea}
            options={{ title: 'Help & Support' }}
          />

          {/* Additional Screens */}
          <RootStack.Screen
            name="OTP"
            component={OTPScreenWithSafeArea}
            options={{ title: 'Verify OTP' }}
          />
          <RootStack.Screen
            name="PersonalLocation"
            component={PersonalLocationWithSafeArea}
            options={{ title: 'Location', headerShown: false }}
          />
          <RootStack.Screen
            name="SubmissionSuccess"
            component={SubmissionSuccessScreenWithSafeArea}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="CarDetailsList"
            component={CarDetailsListScreenWithSafeArea}
            options={{ title: 'Car Details' }}
          />
          <RootStack.Screen
            name="CarListDetails"
            component={CarListDetailsScreenWithSafeArea}
            options={{ title: 'Car Details' }}
          />
          <RootStack.Screen
            name="Rating"
            component={RatingScreenWithSafeArea}
            options={{ title: 'Rating' }}
          />
          <RootStack.Screen
            name="UpcomingSubmission"
            component={UpcomingSubmissionWithSafeArea}
            options={{ title: 'Upcoming Trip' }}
          />
          <RootStack.Screen
            name="EndTrip"
            component={EndTripScreenWithSafeArea}
            options={{ title: 'End Trip' }}
          />
          <RootStack.Screen
            name="UpcomingBookingDetail"
            component={UpcomingBookingDetailScreenWithSafeArea}
            options={{ title: 'Booking Details' }}
          />
          <RootStack.Screen
            name="UpcomingDetail"
            component={UpcomingDetailScreenWithSafeArea}
            options={{ title: 'Trip Details' }}
          />
          <RootStack.Screen
            name="EnterCode"
            component={EnterCodeScreenWithSafeArea}
            options={{ title: 'Enter Code' }}
          />
          <RootStack.Screen
            name="CompletedBookings"
            component={CompletedBookingsScreenWithSafeArea}
            options={{ title: 'Completed Bookings' }}
          />
          <RootStack.Screen
            name="BookingDetails"
            component={BookingDetailsScreenWithSafeArea}
            options={{ title: 'Booking Details' }}
          />
          <RootStack.Screen
            name="CarListing"
            component={CarListingScreenWithSafeArea}
            options={{ title: 'My Cars' }}
          />
          <RootStack.Screen
            name="CarDetailListing"
            component={CarDetailListingScreenWithSafeArea}
            options={{ title: 'Car Details' }}
          />
          <RootStack.Screen
            name="GetBackSoon"
            component={GetBackSoonWithSafeArea}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;