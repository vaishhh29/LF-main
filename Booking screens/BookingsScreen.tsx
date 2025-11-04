// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Image,
// } from 'react-native';

// // =======================
// // Bookings Screen
// // =======================
// // This screen displays ongoing, upcoming, and completed bookings
// // with filters, detailed booking cards, and bottom navigation.
// // All icons are loaded from local assets for offline reliability.
// // =======================

// const BookingsScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState('ongoing');
//   const [activeFilter, setActiveFilter] = useState('all');

//   // Sample Booking Data (can be replaced with API data later)
//   const bookings = [
//     {
//       id: 1,
//       carName: 'Toyota Corolla 2023',
//       renterName: 'Raju',
//       bookingId: 'LF123456789',
//       pickupDate: 'Thu, 12 Feb',
//       pickupTime: '10:00 AM',
//       dropoffDate: 'Thu, 14 Feb',
//       dropoffTime: '12:00 PM',
//       status: 'Booking confirmed',
//       timestamp: '20 min ago',
//     },
//     {
//       id: 2,
//       carName: 'Honda City 2024',
//       renterName: 'Ravi',
//       bookingId: 'LF123456780',
//       pickupDate: 'Fri, 15 Feb',
//       pickupTime: '9:00 AM',
//       dropoffDate: 'Fri, 16 Feb',
//       dropoffTime: '11:00 AM',
//       status: 'Booking confirmed',
//       timestamp: '10 min ago',
//     },
//   ];

//   // -----------------------------
//   // Render Each Booking Card
//   // -----------------------------
//   const renderBookingCard = (booking) => (
//     <View key={booking.id} style={styles.bookingCard}>
//       {/* Car Name */}
//       <Text style={styles.carName}>{booking.carName}</Text>

//       {/* Renter Info + Booking ID */}
//       <View style={styles.renterRow}>
//         <View style={styles.renterInfo}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{booking.renterName[0]}</Text>
//           </View>
//           <Text style={styles.renterName}>{booking.renterName}</Text>
//         </View>
//         <Text style={styles.bookingId}>Booking ID: {booking.bookingId}</Text>
//       </View>

//       {/* Pickup and Dropoff Timeline */}
//       <View style={styles.timelineContainer}>
//         {/* Pickup */}
//         <View style={styles.timelineItem}>
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('./assets/map-pin.png')}
//               style={styles.iconSmall}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.timelineContent}>
//             <Text style={styles.timelineDate}>{booking.pickupDate}</Text>
//             <Text style={styles.timelineTime}>{booking.pickupTime}</Text>
//           </View>
//         </View>

//         {/* Car Icon Connector */}
//         <View style={styles.carIconContainer}>
//           <View style={styles.carIcon}>
//             <View style={styles.carIconDot} />
//           </View>
//         </View>

//         {/* Dropoff */}
//         <View style={styles.timelineItem}>
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('./assets/map-pin.png')}
//               style={styles.iconSmall}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={styles.timelineContent}>
//             <Text style={styles.timelineDate}>{booking.dropoffDate}</Text>
//             <Text style={styles.timelineTime}>{booking.dropoffTime}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity style={styles.contactButton}>
//           <Image
//             source={require('./assets/phone.png')}
//             style={styles.iconSmall}
//             resizeMode="contain"
//           />
//           <Text style={styles.contactButtonText}>Contact</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.handoverButton}>
//           <Text style={styles.handoverButtonText}>Vehicle Handover</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Status Footer */}
//       <View style={styles.statusFooter}>
//         <Text style={styles.statusText}>{booking.status}</Text>
//         <Text style={styles.timestampText}>{booking.timestamp}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* =======================
//           Custom Status Bar
//       ======================= */}
     

//       {/* =======================
//           Header with Back & Notification
//       ======================= */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Image
//             source={require('./assets/chevron-left.png')}
//             style={styles.iconMedium}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Bookings</Text>
//         <TouchableOpacity style={styles.notificationButton}>
//           <Image
//             source={require('./assets/bell.png')}
//             style={styles.iconMedium}
//             resizeMode="contain"
//           />
//           <View style={styles.notificationBadge}>
//             <Text style={styles.notificationBadgeText}>3</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* =======================
//           Tabs (Upcoming, Ongoing, Completed)
//       ======================= */}
//      <View style={styles.tabsContainer}>
//   {['upcoming', 'ongoing', 'completed'].map((tab) => (
//     <TouchableOpacity
//       key={tab}
//       style={[styles.tab, activeTab === tab && styles.activeTab]}
//       onPress={() => {
//         if (tab === 'upcoming') {
//           navigation.navigate('UpcomingBookingDetailScreen');
//         } 
//         else if (tab === 'completed') {
//           navigation.navigate('CompletedBookingsScreen');
//         } else {
//           setActiveTab(tab);
//         }
//       }}
//     >
//       <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
//         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//       </Text>
//     </TouchableOpacity>
//   ))}
// </View>


//       {/* =======================
//           Filter Chips
//       ======================= */}
//       <View style={styles.filterContainer}>
//         {['all', 'carNames', 'carNames2'].map((filter) => (
//           <TouchableOpacity
//             key={filter}
//             style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
//             onPress={() => setActiveFilter(filter)}
//           >
//             <Text
//               style={[
//                 styles.filterChipText,
//                 activeFilter === filter && styles.activeFilterChipText,
//               ]}
//             >
//               {filter === 'all' ? 'All' : 'Car names'}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* =======================
//           Bookings List
//       ======================= */}
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {bookings.map((booking) => renderBookingCard(booking))}
//         <View style={styles.bottomSpacing} />
//       </ScrollView>

    
      
//     </SafeAreaView>
//   );
// };

// // =======================
// // Styles
// // =======================
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F7',
//   },
//   statusBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   time: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   statusIcons: {
//     flexDirection: 'row',
//     gap: 4,
//   },
//   icon: { fontSize: 14 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   backButton: { padding: 4 },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     flex: 1,
//     marginLeft: 12,
//   },
//   notificationButton: { position: 'relative' },
//   notificationBadge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#6D38E8',
//     borderRadius: 10,
//     width: 18,
//     height: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationBadgeText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 25,
//     paddingVertical: 12,
//   },
//   tab: { marginRight: 8 },
//   activeTab: { borderBottomWidth: 2, borderBottomColor: '#6D38E8' },
//   tabText: { fontSize: 14, color: '#9E9E9E' },
//   activeTabText: { color: '#6D38E8', fontWeight: '600' },
//   filterContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     gap: 8,
//   },
//   filterChip: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   activeFilterChip: {
//     backgroundColor: '#6D38E8',
//     borderColor: '#6D38E8',
//   },
//   filterChipText: { fontSize: 13, color: '#666' },
//   activeFilterChipText: { color: '#FFF', fontWeight: '500' },
//   content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
//   bookingCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   carName: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
//   renterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   renterInfo: { flexDirection: 'row', alignItems: 'center' },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#FEE2E2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   avatarText: { color: '#DC2626', fontWeight: '600' },
//   bookingId: { fontSize: 11, color: '#666' },
//   timelineContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   timelineItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   iconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F5F5F7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   timelineDate: { fontSize: 12, fontWeight: '500' },
//   timelineTime: { fontSize: 11, color: '#666' },
//   carIconContainer: { paddingHorizontal: 12 },
//   carIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#F5F5F7',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   carIconDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#9E9E9E' },
//   actionButtons: { flexDirection: 'row', gap: 8, marginBottom: 12 },
//   contactButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#6D38E8',
//     gap: 6,
//   },
//   contactButtonText: { color: '#6D38E8', fontWeight: '600' },
//   handoverButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 8,
//     backgroundColor: '#6D38E8',
//     alignItems: 'center',
//   },
//   handoverButtonText: { color: '#FFF', fontWeight: '600' },
//   statusFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#F5F5F7',
//   },
//   statusText: { fontSize: 13, fontWeight: '500' },
//   timestampText: { fontSize: 12, color: '#9E9E9E' },
//   bottomSpacing: { height: 20 },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E0E0E0',
//     paddingVertical: 8,
//   },
//   navItem: { flex: 1, alignItems: 'center' },
//   navText: { fontSize: 11, color: '#9E9E9E', marginTop: 4 },
//   navTextActive: { color: '#6D38E8', fontWeight: '600' },
//   iconSmall: { width: 16, height: 16 },
//   iconMedium: { width: 24, height: 24 },
// });

// export default BookingsScreen;



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

/**
 * ===========================
 * Bookings Screen
 * ===========================
 * Displays all bookings categorized as:
 *   - Upcoming
 *   - Ongoing
 *   - Completed
 *
 * Each booking card shows:
 *   - Car details
 *   - Renter info
 *   - Timeline (pickup/dropoff)
 *   - Contact + Handover actions
 *
 * When a user taps a booking card → navigates to BookingDetailScreen
 * ===========================
 */

const BookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [activeFilter, setActiveFilter] = useState('all');

  /**
   * Mock Booking Data (replace later with API data)
   */
  const bookings = [
    {
      id: 1,
      carName: 'Toyota Corolla 2023',
      renterName: 'Raju',
      bookingId: 'LF123456789',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropoffDate: 'Thu, 14 Feb',
      dropoffTime: '12:00 PM',
      status: 'Booking confirmed',
      timestamp: '20 min ago',
    },
    {
      id: 2,
      carName: 'Honda City 2024',
      renterName: 'Ravi',
      bookingId: 'LF123456780',
      pickupDate: 'Fri, 15 Feb',
      pickupTime: '9:00 AM',
      dropoffDate: 'Fri, 16 Feb',
      dropoffTime: '11:00 AM',
      status: 'Booking confirmed',
      timestamp: '10 min ago',
    },
  ];

  /**
   * Renders a single booking card
   */
  const renderBookingCard = (booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('UpcomingBookingDetailScreen', { bookingId: booking.id })
      }
    >
      {/* Car Name */}
      <Text style={styles.carName}>{booking.carName}</Text>

      {/* Renter Info + Booking ID */}
      <View style={styles.renterRow}>
        <View style={styles.renterInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{booking.renterName[0]}</Text>
          </View>
          <Text style={styles.renterName}>{booking.renterName}</Text>
        </View>
        <Text style={styles.bookingId}>Booking ID: {booking.bookingId}</Text>
      </View>

      {/* Pickup and Dropoff Timeline */}
      <View style={styles.timelineContainer}>
        {/* Pickup */}
        <View style={styles.timelineItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/map-pin.png')}
              style={styles.iconSmall}
              resizeMode="contain"
            />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineDate}>{booking.pickupDate}</Text>
            <Text style={styles.timelineTime}>{booking.pickupTime}</Text>
          </View>
        </View>

        {/* Connector Icon */}
        <View style={styles.carIconContainer}>
          <View style={styles.carIcon}>
            <View style={styles.carIconDot} />
          </View>
        </View>

        {/* Dropoff */}
        <View style={styles.timelineItem}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./assets/map-pin.png')}
              style={styles.iconSmall}
              resizeMode="contain"
            />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineDate}>{booking.dropoffDate}</Text>
            <Text style={styles.timelineTime}>{booking.dropoffTime}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.contactButton}>
          <Image
            source={require('./assets/phone.png')}
            style={styles.iconSmall}
            resizeMode="contain"
          />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.handoverButton}>
          <Text style={styles.handoverButtonText}>Vehicle Handover</Text>
        </TouchableOpacity>
      </View>

      {/* Status Footer */}
      <View style={styles.statusFooter}>
        <Text style={styles.statusText}>{booking.status}</Text>
        <Text style={styles.timestampText}>{booking.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ---------------------------
          Header (Back + Title + Bell)
      ---------------------------- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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

      {/* ---------------------------
          Tabs (Upcoming / Ongoing / Completed)
      ---------------------------- */}
      <View style={styles.tabsContainer}>
        {['upcoming', 'ongoing', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
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
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------------------------
          Filter Chips
      ---------------------------- */}
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

      {/* ---------------------------
          Booking List
      ---------------------------- */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((booking) => renderBookingCard(booking))}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * ===========================
 * Styles
 * ===========================
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  notificationButton: { position: 'relative' },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#6D38E8',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  tab: { marginRight: 8 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#6D38E8' },
  tabText: { fontSize: 14, color: '#9E9E9E' },
  activeTabText: { color: '#6D38E8', fontWeight: '600' },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterChip: {
    backgroundColor: '#6D38E8',
    borderColor: '#6D38E8',
  },
  filterChipText: { fontSize: 13, color: '#666' },
  activeFilterChipText: { color: '#FFF', fontWeight: '500' },
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
  carName: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  renterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  bookingId: { fontSize: 11, color: '#666' },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  timelineItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  timelineDate: { fontSize: 12, fontWeight: '500' },
  timelineTime: { fontSize: 11, color: '#666' },
  carIconContainer: { paddingHorizontal: 12 },
  carIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carIconDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#9E9E9E' },
  actionButtons: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6D38E8',
    gap: 6,
  },
  contactButtonText: { color: '#6D38E8', fontWeight: '600' },
  handoverButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6D38E8',
    alignItems: 'center',
  },
  handoverButtonText: { color: '#FFF', fontWeight: '600' },
  statusFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F7',
  },
  statusText: { fontSize: 13, fontWeight: '500' },
  timestampText: { fontSize: 12, color: '#9E9E9E' },
  bottomSpacing: { height: 20 },
  iconSmall: { width: 16, height: 16 },
  iconMedium: { width: 24, height: 24 },
});

export default BookingsScreen;
