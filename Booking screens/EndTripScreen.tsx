// EndTripScreen.js
// ------------------------------------------------------
// A React Native screen showing detailed booking info,
// user details, trip timeline, and final "Complete Trip" action.
// ------------------------------------------------------

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EndTripScreen() {
  // Navigation hook (used to move between screens)
  const navigation = useNavigation();

  // Handle trip completion
  const handleTripComplete = () => {
    console.log('Trip Completed');
    navigation.navigate('HandOver' as never); // Navigate to Handover screen
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ------------------ HEADER ------------------ */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('./assets/chevron-left.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Booking details</Text>
            <Text style={styles.subText}>BOOKING ID: FHS0012076</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.contactBtn}>
          <Image
            source={require('./assets/phone.png')}
            style={styles.phoneIcon}
          />
          <Text style={styles.contactText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ------------------ TRIP DETAILS ------------------ */}
      <View style={styles.card}>
        <View style={styles.tripRow}>
          {/* Start Time */}
          <View style={styles.tripColumn}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>RR</Text>
            </View>
            <Text style={styles.date}>Thu, 21 Feb</Text>
            <Text style={styles.time}>10:00 AM</Text>
          </View>

          {/* Duration */}
          <View style={styles.tripDuration}>
            <Image
              source={require('./assets/home.png')}
              style={styles.msgIcon}
            />
            <Text style={styles.durationText}>08 hrs</Text>
          </View>

          {/* End Time */}
          <View style={styles.tripColumn}>
            <Text style={styles.date}>Thu, 21 Feb</Text>
            <Text style={styles.time}>10:00 PM</Text>
            <View style={[styles.circle, { marginTop: 4 }]}>
              <Text style={styles.circleText}>RR</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ------------------ USER DETAILS ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>User details</Text>
        <TouchableOpacity style={styles.userRow}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Renga Raya Reddy</Text>
          </View>
          <Image
            source={require('./assets/bell.png')}
            style={styles.chevron}
          />
        </TouchableOpacity>
      </View>

      {/* ------------------ TRACK BOOKING TIMELINE ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Track booking</Text>

        <View style={styles.timeline}>
          {/* Vertical line */}
          <View style={styles.line} />

          {[
            { label: 'Booking confirmed', time: '20 min ago', status: 'done' },
            { label: 'Vehicle Handover', time: '20 min ago', status: 'done' },
            { label: 'Ongoing', time: '20 min ago', status: 'active' },
            { label: 'Return & Handover', time: 'Pending', status: 'pending' },
          ].map((item, index) => (
            <View style={styles.timelineRow} key={index}>
              <View
                style={[
                  styles.timelineCircle,
                  item.status === 'active'
                    ? styles.circleActive
                    : item.status === 'done'
                    ? styles.circleDone
                    : styles.circlePending,
                ]}
              >
                {item.status === 'active' && (
                  <View style={styles.innerDotActive} />
                )}
                {item.status === 'done' && <View style={styles.innerDot} />}
              </View>

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineText,
                    item.status === 'pending' && { color: '#9CA3AF' },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <Text style={styles.timelineTime}>{item.time}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ------------------ PRICE DETAILS ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Price Details</Text>
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Rent (Fuel cost not included)</Text>
            <Text style={styles.priceSubLabel}>1 day 4 hours</Text>
          </View>
          <Text style={styles.priceValue}>₹ 12,000</Text>
        </View>
      </View>

      {/* ------------------ ADDITIONAL COST ------------------ */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Additional costs may occur</Text>

        <View style={styles.extraRow}>
          <View style={styles.flexRow}>
            <Text style={styles.extraLabel}>Kms above limit</Text>
            <Image
              source={require('./assets/profile.png')}
              style={styles.infoIcon}
            />
          </View>
          <Text style={styles.extraValue}>₹ 500–3000</Text>
        </View>

        <View style={styles.extraRow}>
          <View style={styles.flexRow}>
            <Text style={styles.extraLabel}>Time extension</Text>
            <Image
              source={require('./assets/profile.png')}
              style={styles.infoIcon}
            />
          </View>
          <Text style={styles.extraValue}>₹ 200/hour</Text>
        </View>
      </View>

      {/* ------------------ COMPLETE TRIP BUTTON ------------------ */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.completeBtn} onPress={handleTripComplete}>
          <Text style={styles.completeText}>Complete Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ------------------------------------------------------
// STYLESHEET
// ------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },

  // Header
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backIcon: { width: 22, height: 22, marginRight: 8, resizeMode: 'contain' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  subText: { fontSize: 12, color: '#6B7280' },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  phoneIcon: { width: 16, height: 16, marginRight: 6, resizeMode: 'contain' },
  contactText: { fontSize: 14, fontWeight: '500', color: '#111827' },

  // Card
  card: {
    backgroundColor: '#FFF',
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 1,
  },

  // Trip Details
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripColumn: { alignItems: 'center' },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  date: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  time: { fontSize: 13, fontWeight: '600' },
  msgIcon: { width: 16, height: 16, resizeMode: 'contain' },
  durationText: { fontSize: 12, color: '#4B5563', marginTop: 2 },
  tripDuration: { alignItems: 'center' },

  // User
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  userName: { fontSize: 14, fontWeight: '500' },
  chevron: { width: 18, height: 18, resizeMode: 'contain' },

  // Timeline
  timeline: { position: 'relative', marginTop: 8 },
  line: {
    position: 'absolute',
    left: 16,
    top: 16,
    bottom: 16,
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  circleDone: { backgroundColor: '#7C3AED' },
  circleActive: {
    backgroundColor: '#EDE9FE',
    borderWidth: 3,
    borderColor: '#DDD6FE',
  },
  circlePending: { backgroundColor: '#E5E7EB' },
  innerDot: { width: 8, height: 8, backgroundColor: '#FFF', borderRadius: 4 },
  innerDotActive: {
    width: 8,
    height: 8,
    backgroundColor: '#7C3AED',
    borderRadius: 4,
  },
  timelineContent: { flex: 1 },
  timelineText: { fontSize: 13, fontWeight: '500' },
  timelineTime: { fontSize: 11, color: '#9CA3AF' },

  // Price Details
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: { fontSize: 13, color: '#4B5563' },
  priceSubLabel: { fontSize: 11, color: '#9CA3AF' },
  priceValue: { fontSize: 15, fontWeight: '600' },

  // Additional Costs
  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  extraLabel: { fontSize: 13, color: '#4B5563' },
  infoIcon: { width: 14, height: 14, marginLeft: 4, tintColor: '#9CA3AF' },
  extraValue: { fontSize: 13, fontWeight: '600' },

  // Button
  buttonContainer: { padding: 16 },
  completeBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  completeText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
