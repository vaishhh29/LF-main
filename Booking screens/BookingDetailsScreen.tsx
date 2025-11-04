
// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import Svg, { Path, Circle } from 'react-native-svg';

// // Custom Icons
// const BackIcon = () => (
//   <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <Path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </Svg>
// );

// const ChevronRightIcon = () => (
//   <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//     <Path d="M9 18l6-6-6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </Svg>
// );

// const InfoIcon = () => (
//   <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <Circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="2"/>
//     <Path d="M12 16v-4M12 8h.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
//   </Svg>
// );

// const CheckIcon = () => (
//   <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//     <Path d="M20 6L9 17l-5-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </Svg>
// );

// const HomeIcon = () => (
//   <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#9CA3AF" strokeWidth="2"/>
//   </Svg>
// );

// const BookingsIcon = ({ active }) => (
//   <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <Path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" 
//           stroke={active ? "#8B5CF6" : "#9CA3AF"} strokeWidth="2"/>
//   </Svg>
// );

// const EarningIcon = () => (
//   <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <Circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2"/>
//     <Path d="M12 6v6l4 2" stroke="#9CA3AF" strokeWidth="2"/>
//   </Svg>
// );

// const AccountIcon = () => (
//   <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#9CA3AF" strokeWidth="2"/>
//     <Circle cx="12" cy="7" r="4" stroke="#9CA3AF" strokeWidth="2"/>
//   </Svg>
// );

// const BookingDetailsScreen = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
//           <BackIcon />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Booking details</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Amount Banner */}
//         <View style={styles.amountBanner}>
//           <Text style={styles.amountLabel}>Amount to be Collected</Text>
//           <View style={styles.amountRow}>
//             <Text style={styles.amount}>₹489.56</Text>
//             <InfoIcon />
//           </View>
//         </View>

//         {/* Timeline */}
//         <View style={styles.timelineBanner}>
//           <View style={styles.timelineRow}>
//             <View style={styles.timelineDotGreen} />
//             <View style={styles.timelineInfo}>
//               <Text style={styles.timelineDate}>Thu, 14 Jul</Text>
//               <Text style={styles.timelineTime}>10:00 AM</Text>
//             </View>
//             <View style={styles.carIconSmall} />
//             <View style={styles.timelineInfo}>
//               <Text style={styles.timelineDate}>Thu, 30 Jul</Text>
//               <Text style={styles.timelineTime}>10:00 PM</Text>
//             </View>
//             <View style={styles.timelineDotRed} />
//           </View>
//           <View style={styles.timelineDivider} />
//           <Text style={styles.durationText}>2h 40m</Text>
//         </View>

//         {/* User Details */}
//         <TouchableOpacity 
//           style={styles.detailCard}
//           onPress={() => navigation.navigate('DriverScreen')}
//         >
//           <Text style={styles.sectionTitle}>User details</Text>
//           <View style={styles.cardRow}>
//             <View style={styles.avatar} />
//             <Text style={styles.cardName}>Ranga raya reddy</Text>
//             <ChevronRightIcon />
//           </View>
//         </TouchableOpacity>

//         {/* Car Details */}
//         <TouchableOpacity style={styles.detailCard} onPress={() => navigation.navigate('CarDetailsScreen')}>
//           <Text style={styles.sectionTitle}>Car Details</Text>
//           <View style={styles.cardRow}>
//             <View style={styles.carThumb} />
//             <Text style={styles.cardName}>Hundyai</Text>
//             <ChevronRightIcon />
//           </View>
//         </TouchableOpacity>

//         {/* Trip Details */}
//         <View style={styles.detailCard}>
//           <Text style={styles.sectionTitle}>Trip Details</Text>
          
//           <View style={styles.tripItem}>
//             <View style={styles.checkCircle}>
//               <CheckIcon />
//             </View>
//             <View style={styles.tripItemContent}>
//               <Text style={styles.tripItemTitle}>Booking confirmed</Text>
//               <Text style={styles.tripItemDate}>14 Jul 2025</Text>
//             </View>
//           </View>

//           <View style={styles.tripItem}>
//             <View style={styles.checkCircle}>
//               <CheckIcon />
//             </View>
//             <View style={styles.tripItemContent}>
//               <Text style={styles.tripItemTitle}>Return & Handover</Text>
//               <Text style={styles.tripItemDate}>16 Jul 2025</Text>
//             </View>
//           </View>

//           <View style={styles.durationBadge}>
//             <Text style={styles.durationLabel}>DURATION OF USE</Text>
//             <Text style={styles.durationValue}>2 days</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem}>
//           <HomeIcon />
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <BookingsIcon active={true} />
//           <Text style={[styles.navText, styles.navTextActive]}>Bookings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <EarningIcon />
//           <Text style={styles.navText}>Earning</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItem}>
//           <AccountIcon />
//           <Text style={styles.navText}>Account</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   iconButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   content: {
//     flex: 1,
//   },
//   amountBanner: {
//     backgroundColor: '#8B5CF6',
//     padding: 20,
//     alignItems: 'center',
//   },
//   amountLabel: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     marginBottom: 8,
//   },
//   amountRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   amount: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginRight: 8,
//   },
//   timelineBanner: {
//     backgroundColor: '#FEF3F2',
//     padding: 16,
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 12,
//   },
//   timelineRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   timelineDotGreen: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#10B981',
//   },
//   timelineDotRed: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#EF4444',
//   },
//   timelineInfo: {
//     alignItems: 'center',
//   },
//   timelineDate: {
//     fontSize: 12,
//     color: '#111827',
//     fontWeight: '500',
//   },
//   timelineTime: {
//     fontSize: 11,
//     color: '#6B7280',
//   },
//   carIconSmall: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     backgroundColor: '#E5E7EB',
//   },
//   timelineDivider: {
//     height: 2,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 8,
//   },
//   durationText: {
//     fontSize: 12,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   detailCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 12,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E5E7EB',
//     marginRight: 12,
//   },
//   cardName: {
//     flex: 1,
//     fontSize: 16,
//     color: '#111827',
//     fontWeight: '500',
//   },
//   carThumb: {
//     width: 48,
//     height: 48,
//     borderRadius: 8,
//     backgroundColor: '#E5E7EB',
//     marginRight: 12,
//   },
//   tripItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginBottom: 16,
//   },
//   checkCircle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#8B5CF6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   tripItemContent: {
//     flex: 1,
//   },
//   tripItemTitle: {
//     fontSize: 14,
//     color: '#111827',
//     fontWeight: '500',
//     marginBottom: 2,
//   },
//   tripItemDate: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   durationBadge: {
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   durationLabel: {
//     fontSize: 11,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   durationValue: {
//     fontSize: 16,
//     color: '#111827',
//     fontWeight: '600',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     paddingVertical: 8,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   navText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 4,
//   },
//   navTextActive: {
//     color: '#8B5CF6',
//   },
// });

// export default BookingDetailsScreen;



import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// ========== Custom SVG Icons ==========
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M12 16v-4M12 8h.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const HomeIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#9CA3AF" strokeWidth="2" />
  </Svg>
);

const BookingsIcon = ({ active }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"
      stroke={active ? "#8B5CF6" : "#9CA3AF"}
      strokeWidth="2"
    />
  </Svg>
);

const EarningIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2" />
    <Path d="M12 6v6l4 2" stroke="#9CA3AF" strokeWidth="2" />
  </Svg>
);

const AccountIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#9CA3AF" strokeWidth="2" />
    <Circle cx="12" cy="7" r="4" stroke="#9CA3AF" strokeWidth="2" />
  </Svg>
);

// ========== Main Screen ==========
const BookingDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Section */}
        <View style={styles.amountBanner}>
          <Text style={styles.amountLabel}>Amount to be Collected</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>₹489.56</Text>
            <InfoIcon />
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineBanner}>
          <View style={styles.timelineRow}>
            <View style={styles.timelineDotGreen} />
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineDate}>Thu, 14 Jul</Text>
              <Text style={styles.timelineTime}>10:00 AM</Text>
            </View>
            <View style={styles.carIconSmall} />
            <View style={styles.timelineInfo}>
              <Text style={styles.timelineDate}>Thu, 30 Jul</Text>
              <Text style={styles.timelineTime}>10:00 PM</Text>
            </View>
            <View style={styles.timelineDotRed} />
          </View>
          <View style={styles.timelineDivider} />
          <Text style={styles.durationText}>2h 40m</Text>
        </View>

        {/* User Details */}
        <TouchableOpacity
          style={styles.detailCard}
          onPress={() => navigation.navigate('DriverScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>User details</Text>
          <View style={styles.cardRow}>
            <View style={styles.avatar} />
            <Text style={styles.cardName}>Ranga raya reddy</Text>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>

        {/* ✅ FIXED Car Details Section */}
        <TouchableOpacity
          style={styles.detailCard}
          onPress={() => navigation.navigate('CarDetailsScreen', { carId: 123 })}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Car details</Text>
          <View style={styles.cardRow}>
            <View style={styles.carThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardName}>Hyundai i20</Text>
              <Text style={styles.cardSub}>Reg. No: KA 03 AB 1234</Text>
            </View>
            <ChevronRightIcon />
          </View>
        </TouchableOpacity>

        {/* Trip Details */}
        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Trip details</Text>

          <View style={styles.tripItem}>
            <View style={styles.checkCircle}>
              <CheckIcon />
            </View>
            <View style={styles.tripItemContent}>
              <Text style={styles.tripItemTitle}>Booking confirmed</Text>
              <Text style={styles.tripItemDate}>14 Jul 2025</Text>
            </View>
          </View>

          <View style={styles.tripItem}>
            <View style={styles.checkCircle}>
              <CheckIcon />
            </View>
            <View style={styles.tripItemContent}>
              <Text style={styles.tripItemTitle}>Return & Handover</Text>
              <Text style={styles.tripItemDate}>16 Jul 2025</Text>
            </View>
          </View>

          <View style={styles.durationBadge}>
            <Text style={styles.durationLabel}>DURATION OF USE</Text>
            <Text style={styles.durationValue}>2 days</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <HomeIcon />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <BookingsIcon active={true} />
          <Text style={[styles.navText, styles.navTextActive]}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <EarningIcon />
          <Text style={styles.navText}>Earning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AccountIcon />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ========== Styles ==========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconButton: { padding: 8 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: { flex: 1 },

  amountBanner: {
    backgroundColor: '#8B5CF6',
    padding: 20,
    alignItems: 'center',
  },
  amountLabel: { fontSize: 14, color: '#FFFFFF', marginBottom: 8 },
  amountRow: { flexDirection: 'row', alignItems: 'center' },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },

  timelineBanner: {
    backgroundColor: '#FEF3F2',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  timelineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timelineDotGreen: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  timelineDotRed: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  carIconSmall: { width: 20, height: 20, borderRadius: 4, backgroundColor: '#E5E7EB' },
  timelineInfo: { alignItems: 'center' },
  timelineDate: { fontSize: 12, fontWeight: '500', color: '#111827' },
  timelineTime: { fontSize: 11, color: '#6B7280' },
  timelineDivider: { height: 2, backgroundColor: '#E5E7EB', marginVertical: 8 },
  durationText: { fontSize: 12, color: '#6B7280', textAlign: 'center' },

  detailCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', marginRight: 12 },
  carThumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#E5E7EB', marginRight: 12 },
  cardName: { fontSize: 16, color: '#111827', fontWeight: '500' },
  cardSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  tripItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripItemContent: { flex: 1 },
  tripItemTitle: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 2 },
  tripItemDate: { fontSize: 12, color: '#6B7280' },

  durationBadge: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  durationLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4 },
  durationValue: { fontSize: 16, fontWeight: '600', color: '#111827' },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  navText: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  navTextActive: { color: '#8B5CF6' },
});

export default BookingDetailsScreen;
