import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ArrowLeft, Bell, User, MapPin, Home, Calendar, TrendingUp, UserCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const UpcomingScreen = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigation = useNavigation();

  const bookings = [
    {
      id: 1,
      bookingId: 'LFY23456789',
      name: 'Raju',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropDate: 'Thu, 14 Feb',
      dropTime: '12:00 PM',
      rideFair: '₹2,000'
    },
    {
      id: 2,
      bookingId: 'LFY23466789',
      name: 'Raju',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropDate: 'Thu, 14 Feb',
      dropTime: '12:00 PM',
      rideFair: '₹2,000'
    },
    {
      id: 3,
      bookingId: 'LFY23456789',
      name: 'Raju',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropDate: 'Thu, 14 Feb',
      dropTime: '12:00 PM',
      rideFair: '₹2,000'
    }
  ];

  const tabs = ['Upcoming', 'Ongoing', 'Completed'];
  const filters = ['All', 'Car names', 'Car names'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <TouchableOpacity style={{ position: 'relative' }}>
          <Bell size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive
            ]}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking Cards */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 120 }}>
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={styles.userIcon}>
                  <User size={20} color="#FF6B6B" />
                </View>
                <Text style={styles.userName}>{booking.name}</Text>
              </View>
              <View style={styles.bookingIdContainer}>
                <Text style={styles.bookingIdText}>Booking ID: {booking.bookingId}</Text>
              </View>
            </View>

            {/* Journey */}
            <View style={styles.journey}>
              {/* Pickup */}
              <View style={styles.journeyItem}>
                <View style={styles.mapPin}>
                  <MapPin size={20} color="#666" />
                </View>
                <Text style={styles.dateText}>{booking.pickupDate}</Text>
                <Text style={styles.timeText}>{booking.pickupTime}</Text>
              </View>

              {/* Car */}
              <View style={styles.journeyCar}>
                <View style={styles.carIcon}>
                  <Text style={{ fontSize: 24 }}>🚗</Text>
                </View>
                <View style={styles.journeyLine} />
              </View>

              {/* Drop */}
              <View style={styles.journeyItem}>
                <View style={styles.mapPin}>
                  <MapPin size={20} color="#666" />
                </View>
                <Text style={styles.dateText}>{booking.dropDate}</Text>
                <Text style={styles.timeText}>{booking.dropTime}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
              <Text style={styles.rideFair}>
                Ride fare: <Text style={styles.rideFairAmount}>{booking.rideFair}</Text>
              </Text>
              <TouchableOpacity style={styles.verifyButton} onPress={() =>
                navigation.navigate('UpcomingApproval')
      }>
                <Text style={styles.verifyButtonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#CCCCCC" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Calendar size={24} color="#6C5CE7" />
          <Text style={[styles.navTextActive]}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <TrendingUp size={24} color="#CCCCCC" />
          <Text style={styles.navText}>Earning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <UserCircle size={24} color="#CCCCCC" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#E5E7EB' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  notificationBadge: { position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8, backgroundColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center' },
  notificationText: { color: '#fff', fontSize: 10, fontWeight: '600' },

  tabs: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8, gap: 24 },
  tabButton: { paddingBottom: 4, position: 'relative' },
  tabText: { fontSize: 14, color: '#6B7280', fontWeight: '400' },
  tabTextActive: { fontWeight: '600', color: '#6C5CE7' },
  tabIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: '#6C5CE7', borderRadius: 2 },

  filters: { flexDirection: 'row', padding: 16, gap: 8, borderBottomWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff' },
  filterButton: { paddingVertical: 6, paddingHorizontal: 16, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 20, backgroundColor: '#fff' },
  filterButtonActive: { borderColor: '#6C5CE7', backgroundColor: '#EDE7FF' },
  filterText: { fontSize: 12, color: '#4B5563' },
  filterTextActive: { color: '#6C5CE7', fontWeight: '500' },

  scrollContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  userIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFE5E5', justifyContent: 'center', alignItems: 'center' },
  userName: { fontSize: 16, fontWeight: '600', color: '#000' },
  bookingIdContainer: { backgroundColor: '#F3E8FF', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  bookingIdText: { fontSize: 12, color: '#6C5CE7', fontWeight: '500' },

  journey: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  journeyItem: { flex: 1, alignItems: 'center' },
  mapPin: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  dateText: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  timeText: { fontSize: 12, fontWeight: '600', color: '#000' },
  journeyCar: { flexShrink: 0, paddingHorizontal: 16, alignItems: 'center', position: 'relative' },
  carIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  journeyLine: { position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: '#D1D5DB', zIndex: 0 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rideFair: { fontSize: 14, color: '#6B7280' },
  rideFairAmount: { fontSize: 16, fontWeight: '600', color: '#000' },
  verifyButton: { backgroundColor: '#6C5CE7', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 12 },
  verifyButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E5E7EB', elevation: 10 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  navText: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
  navTextActive: { fontSize: 10, color: '#6C5CE7', marginTop: 4, fontWeight: '600' },
});

export default UpcomingScreen;
