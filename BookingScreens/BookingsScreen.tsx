import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ✅ Tab Screens (fixed folder names, no spaces)
import UpcomingScreen from '../UpcomingScreens/UpcomingScreen';
import OngoingScreen from '../OngoingScreen/OngoingScreen';
import CompletedBookingsScreen from '../CompletedScreens/CompletedBookingsScreen';




const BookingsScreen = () => {
  
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'completed', label: 'Completed' },
  ];

  // ✅ Automatically switch back to "Upcoming" when returning from UpcomingApproval
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.removeBookingId) {
        setActiveTab('upcoming');
        navigation.setParams({ removeBookingId: null });
      }
    }, [route?.params?.removeBookingId])
  );

  const handleNoticication = () => {
    console.log("Bell pressed");   // optional debug
    navigation.navigate("NotificationScreen");
  };



  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]} edges={['left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/chevron-left.png')}
            style={styles.iconMedium}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bookings</Text>

        <TouchableOpacity style={styles.notificationButton} onPress={handleNoticication}>
          <Image
            source={require('./assets/bell.png')}
            style={styles.iconMedium}
            resizeMode="contain"
          />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ---------- TABS ---------- */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
            {activeTab === tab.key && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------- TAB CONTENT ---------- */}
      <View style={styles.content}>
        {activeTab === 'upcoming' && (
          <UpcomingScreen
            navigation={navigation}
            removeBookingId={route?.params?.removeBookingId}
          />
        )}

        {activeTab === 'ongoing' && <OngoingScreen navigation={navigation} />}

        {activeTab === 'completed' && (
          <TouchableOpacity
            onPress={() => navigation.navigate("CompletedBookings")}
            style={{ flex: 1 }}
          >
            <CompletedBookingsScreen />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,

  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  activeTabText: {
    color: '#6D38E8',
    fontWeight: '600',
  },
  activeLine: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    width: 70,
    backgroundColor: '#6D38E8',
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  iconMedium: {
    width: 30,
    height: 30,
  },
});
