import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

const BookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeFilter, setActiveFilter] = useState('all');

  const bookings = [
    {
      id: 1,
      renterName: 'Raju',
      bookingId: 'LF123456789',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropoffDate: 'Thu, 14 Feb',
      dropoffTime: '12:00 PM',
      price: '₹ 2000',
    },
  ];

  const renderBookingCard = (booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('UpcomingDetailScreen', {
          bookingId: booking.id,
        })
      }
    >
      {/* Top Section */}
      <View style={styles.renterRow}>
        <View style={styles.renterInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{booking.renterName[0]}</Text>
          </View>
          <Text style={styles.renterName}>{booking.renterName}</Text>
        </View>
        <Text style={styles.bookingId}>Booking ID: {booking.bookingId}</Text>
      </View>

      {/* Timeline Section */}
      <View style={styles.timelineContainer}>
        {/* Pickup */}
        <View style={styles.timelineItem}>
          <View style={styles.iconCircle}>
            <Image
              source={require('./assets/up-arrow.png')}
              style={styles.iconSmall}
              resizeMode="contain"
            />
          </View>
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineDate}>{booking.pickupDate}</Text>
            <Text style={styles.timelineTime}>{booking.pickupTime}</Text>
          </View>
        </View>

        {/* Center Dotted Line + Car */}
        <View style={styles.centerConnector}>
          <View style={styles.dottedLine} />
          <Image
            source={require('./assets/map-pin.png')}
            style={styles.carIcon}
            resizeMode="contain"
          />
          <View style={styles.dottedLine} />
        </View>

        {/* Dropoff */}
        <View style={styles.timelineItemRight}>
          <View style={styles.timelineTextContainerRight}>
            <Text style={styles.timelineDate}>{booking.dropoffDate}</Text>
            <Text style={styles.timelineTime}>{booking.dropoffTime}</Text>
          </View>
          <View style={styles.iconCircle}>
            <Image
              source={require('./assets/down-arrow.png')}
              style={styles.iconSmall}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Dotted line separator */}
      <View style={styles.dashLineSeparator} />

      {/* Fare + Verify */}
      <View style={styles.fareRow}>
        <Text style={styles.fareText}>Ride fare: {booking.price}</Text>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/chevron-left.png')}
            style={styles.iconMedium}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bookings</Text>

        <TouchableOpacity style={styles.notificationButton}>
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['upcoming', 'ongoing', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => {
              if (tab === 'upcoming') {
                navigation.navigate('UpcomingScreen');
              } else if (tab === 'completed') {
                navigation.navigate('CompletedBookingsScreen');
              } else {
                setActiveTab(tab);
              }
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        {['all', 'carNames', 'carNames2'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.activeFilterChip,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === filter && styles.activeFilterChipText,
              ]}
            >
              {filter === 'all' ? 'All' : 'Car names'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {bookings.map((booking) => renderBookingCard(booking))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 30,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', flex: 1, marginLeft: 12 },
  notificationButton: { position: 'relative' },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#664896',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '600' },

  /* Tabs */
   tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    position: 'relative',
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

  /* Filter Chips */
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 10,
    marginTop:5
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterChip: { backgroundColor: '#6D38E8', borderColor: '#6D38E8' },
  filterChipText: { fontSize: 13, color: '#666' },
  activeFilterChipText: { color: '#FFF', fontWeight: '500' },

  /* Booking Card */
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  renterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  renterInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: { color: '#DC2626', fontWeight: '600' },
  renterName: { fontSize: 14, fontWeight: '500' },
  bookingId: {
    fontSize: 11,
    color: '#000',
    backgroundColor: '#F1EDFC',
    textAlignVertical: 'center',
    padding: 8,
    borderRadius: 6,
  },

  /* Timeline */
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginBottom: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSmall: {
    width: 25,
    height: 25,

  },
  timelineTextContainer: { marginLeft: 8 },
  timelineTextContainerRight: { marginRight: 8, alignItems: 'flex-end' },
  timelineDate: { fontSize: 12, fontWeight: '600', color: '#000' },
  timelineTime: { fontSize: 11, color: '#666' },
  centerConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  dottedLine: {
    flex: 1,
    height: 1,
   borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#666666',
    marginLeft:4,
    marginRight:4
  },
  carIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 6,
    tintColor: '#000',
  },
  dashLineSeparator: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    marginTop: 6,
  },

  /* Fare */
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  fareText: { color: '#4D4D4D', fontWeight: '600', fontSize: 14 },
  verifyButton: {
    backgroundColor: '#6D38E8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  verifyButtonText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  bottomSpacing: { height: 20 },
  iconMedium: { width: 30, height: 30 },
});

export default BookingsScreen;
