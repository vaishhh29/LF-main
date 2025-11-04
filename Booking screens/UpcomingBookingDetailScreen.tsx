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
//   Modal
// } from 'react-native';
// import EnterCodeScreen from './EnterCodeScreen';

// const UpcomingBookingDetailScreen = ({ navigation }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Booking data (mock)
//   const bookingData = {
//     carName: 'Toyota Corolla 2023',
//     bookingId: 'LF123456789',
//     pickupDate: 'Thu, 12 Feb',
//     pickupTime: '10:00 AM',
//     dropoffDate: 'Thu, 14 Feb',
//     dropoffTime: '12:00 PM',
//     renterName: 'Ranga raya reddy',
//     rentalCharge: '₹1200',
//     duration: '1 day 4 hours',
//     damageCharge: '₹500-3000',
//     tillingCharge: '₹7/km',
//   };

//   const trackingSteps = [
//     { id: 1, label: 'Booking confirmed', time: '20 min ago', completed: true },
//     { id: 2, label: 'Vehicle Handover', time: '10 min ago', completed: false, active: true },
//     { id: 3, label: 'Ongoing', time: '-', completed: false },
//     { id: 4, label: 'Return & Handover', time: '-', completed: false },
//   ];

//   const openModal = () => setIsModalVisible(true);
//   const closeModal = () => setIsModalVisible(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Image
//             source={require('./assets/chevron-left.png')}
//             style={{ width: 24, height: 24, tintColor: '#000' }}
//           />
//         </TouchableOpacity>

//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Hosting details</Text>
//           <Text style={styles.headerSubtitle}>
//             Booking ID: {bookingData.bookingId}
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.contactButton}>
//           <Text style={styles.contactButtonText}>Contact</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Scrollable Content */}
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

//         {/* Trip Timeline */}
//         <View style={styles.card}>
//           <View style={styles.timelineContainer}>
//             {/* Pickup */}
//             <View style={styles.timelineItem}>
//               <View style={styles.iconCircle}>
//                 <Image
//                   source={require('./assets/map-pin.png')}
//                   style={{ width: 16, height: 16, tintColor: '#6B7280' }}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.timelineDate}>{bookingData.pickupDate}</Text>
//                 <Text style={styles.timelineTime}>{bookingData.pickupTime}</Text>
//               </View>
//             </View>

//             {/* Progress Line */}
//             <View style={styles.dottedLine}>
//               {[...Array(5)].map((_, i) => (
//                 <View key={i} style={styles.dot} />
//               ))}
//             </View>

//             <View style={styles.onDutyContainer}>
//               <View style={styles.carIconCircle}>
//                 <View style={styles.carIconDot} />
//               </View>
//               <Text style={styles.onDutyText}>On-duty</Text>
//             </View>

//             <View style={styles.dottedLine}>
//               {[...Array(5)].map((_, i) => (
//                 <View key={i} style={styles.dot} />
//               ))}
//             </View>

//             {/* Dropoff */}
//             <View style={styles.timelineItem}>
//               <View style={styles.iconCircle}>
//                 <Image
//                   source={require('./assets/map-pin.png')}
//                   style={{ width: 16, height: 16, tintColor: '#6B7280' }}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.timelineDate}>{bookingData.dropoffDate}</Text>
//                 <Text style={styles.timelineTime}>{bookingData.dropoffTime}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* User Details */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>User details</Text>
//           <TouchableOpacity style={styles.userRow}>
//             <View style={styles.userInfo}>
//               <View style={styles.avatar}>
//                 <Text style={styles.avatarText}>R</Text>
//               </View>
//               <Text style={styles.userName}>{bookingData.renterName}</Text>
//             </View>
//             <Image
//               source={require('./assets/chevron-left.png')}
//               style={{
//                 width: 20,
//                 height: 20,
//                 tintColor: '#9CA3AF',
//                 transform: [{ rotate: '180deg' }],
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Booking Tracking */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Track booking</Text>
//           <View style={styles.trackingContainer}>
//             {trackingSteps.map((step, index) => (
//               <View key={step.id} style={styles.trackingStep}>
//                 <View style={styles.trackingIconContainer}>
//                   <View
//                     style={[
//                       styles.trackingIcon,
//                       step.completed && styles.trackingIconCompleted,
//                       step.active && styles.trackingIconActive,
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.trackingIconText,
//                         (step.completed || step.active) && styles.trackingIconTextWhite,
//                       ]}
//                     >
//                       {step.id}
//                     </Text>
//                   </View>
//                   {index < trackingSteps.length - 1 && (
//                     <View
//                       style={[
//                         styles.trackingLine,
//                         step.completed && styles.trackingLineCompleted,
//                       ]}
//                     />
//                   )}
//                 </View>
//                 <View style={styles.trackingContent}>
//                   <Text style={styles.trackingLabel}>{step.label}</Text>
//                   <Text style={styles.trackingTime}>{step.time}</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Price Details */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Price Details</Text>
//           <View style={styles.priceRow}>
//             <Text style={styles.priceLabel}>
//               Rental Charge (Fuel not included){'\n'}
//               <Text style={styles.priceDuration}>{bookingData.duration}</Text>
//             </Text>
//             <Text style={styles.priceValue}>{bookingData.rentalCharge}</Text>
//           </View>
//         </View>

//         {/* Additional Costs */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Additional cost may occur</Text>
//           <View style={styles.additionalCostRow}>
//             <Text style={styles.additionalCostLabel}>Any damage</Text>
//             <Text style={styles.additionalCostValue}>
//               {bookingData.damageCharge}
//             </Text>
//           </View>
//           <View style={styles.additionalCostRow}>
//             <View style={styles.tillingRow}>
//               <Text style={styles.additionalCostLabel}>Tilling extend</Text>
//               <Image
//                 source={require('./assets/bell.png')}
//                 style={{ width: 14, height: 14, tintColor: '#9CA3AF' }}
//               />
//             </View>
//             <Text style={styles.additionalCostValue}>
//               {bookingData.tillingCharge}
//             </Text>
//           </View>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* Bottom Buttons */}
//       <View style={styles.bottomButtons}>
//         <TouchableOpacity style={styles.cancelButton}>
//           <Text style={styles.cancelButtonText}>Cancel booking</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.getCodeButton} onPress={openModal}>
//           <Text style={styles.getCodeButtonText}>Get code for start</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal */}
//       <Modal
//         visible={isModalVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContentHalf}>
//             <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
//               <Text style={{ fontSize: 18, fontWeight: '600' }}>✕</Text>
//             </TouchableOpacity>
//             <ScrollView>
//               <EnterCodeScreen />
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// // --- STYLES (same as your version) ---
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F7' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F0F0',
//   },
//   backButton: { padding: 4 },
//   headerContent: { flex: 1, marginLeft: 12 },
//   headerTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
//   headerSubtitle: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
//   contactButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: '#6D38E8',
//   },
//   contactButtonText: { fontSize: 13, fontWeight: '600', color: '#6D38E8' },
//   content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   timelineContainer: { paddingVertical: 8 },
//   timelineItem: { flexDirection: 'row', alignItems: 'center' },
//   iconCircle: {
//     width: 32, height: 32, borderRadius: 16,
//     backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12,
//   },
//   dottedLine: { height: 24, justifyContent: 'space-between', alignItems: 'center', marginLeft: 15, marginVertical: 4 },
//   dot: { width: 2, height: 2, borderRadius: 1, backgroundColor: '#D1D5DB' },
//   onDutyContainer: { flexDirection: 'row', alignItems: 'center' },
//   carIconCircle: {
//     width: 32, height: 32, borderRadius: 16,
//     backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12,
//   },
//   carIconDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6B7280' },
//   onDutyText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
//   sectionTitle: { fontSize: 15, fontWeight: '600', color: '#000', marginBottom: 12 },
//   userRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
//   userInfo: { flexDirection: 'row', alignItems: 'center' },
//   avatar: {
//     width: 36, height: 36, borderRadius: 18, backgroundColor: '#FEE2E2',
//     justifyContent: 'center', alignItems: 'center', marginRight: 12,
//   },
//   avatarText: { fontSize: 14, fontWeight: '600', color: '#DC2626' },
//   userName: { fontSize: 14, fontWeight: '500', color: '#000' },
//   trackingContainer: { paddingLeft: 4 },
//   trackingStep: { flexDirection: 'row', marginBottom: 4 },
//   trackingIconContainer: { alignItems: 'center', marginRight: 16, width: 32 },
//   trackingIcon: {
//     width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6',
//     justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB',
//   },
//   trackingIconCompleted: { backgroundColor: '#6D38E8', borderColor: '#6D38E8' },
//   trackingIconActive: { backgroundColor: '#FFFFFF', borderColor: '#6D38E8', borderWidth: 3 },
//   trackingIconText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
//   trackingIconTextWhite: { color: '#FFFFFF' },
//   trackingLine: { width: 2, height: 28, backgroundColor: '#E5E7EB', marginTop: 4 },
//   trackingLineCompleted: { backgroundColor: '#6D38E8' },
//   trackingContent: { flex: 1, paddingTop: 6 },
//   trackingLabel: { fontSize: 14, fontWeight: '500', color: '#000' },
//   trackingTime: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
//   priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
//   priceLabel: { fontSize: 13, color: '#374151', flex: 1 },
//   priceDuration: { fontSize: 11, color: '#9CA3AF' },
//   priceValue: { fontSize: 15, fontWeight: '600', color: '#000' },
//   additionalCostRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
//   additionalCostLabel: { fontSize: 13, color: '#374151' },
//   additionalCostValue: { fontSize: 13, fontWeight: '500', color: '#000' },
//   tillingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
//   bottomButtons: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     gap: 12,
//   },
//   cancelButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 8,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     alignItems: 'center',
//   },
//   cancelButtonText: { fontSize: 14, fontWeight: '600', color: '#374151' },
//   getCodeButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 8,
//     backgroundColor: '#6D38E8',
//     alignItems: 'center',
//   },
//   getCodeButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
//   modalContentHalf: {
//     height: '85%',
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingBottom: 20,
//   },
//   modalCloseButton: { alignSelf: 'flex-end', padding: 12 },
// });

// export default UpcomingBookingDetailScreen;

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
  Modal,
} from 'react-native';
import EnterCodeScreen from './EnterCodeScreen';

/**
 * UpcomingBookingDetailScreen
 * ----------------------------
 * Shows all details of an upcoming host booking, including:
 *  - Pickup/drop-off timeline
 *  - Renter details
 *  - Booking progress (tracking)
 *  - Pricing and additional charges
 *
 * Also provides:
 *  - Option to cancel booking
 *  - Secure code modal to start trip
 */
const UpcomingBookingDetailScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  /** --------------------------------------
   * Mock Booking Data
   * (Replace with API integration)
   * -------------------------------------- */
  const bookingData = {
    carName: 'Toyota Corolla 2023',
    bookingId: 'LF123456789',
    pickupDate: 'Thu, 12 Feb',
    pickupTime: '10:00 AM',
    dropoffDate: 'Thu, 14 Feb',
    dropoffTime: '12:00 PM',
    renterName: 'Ranga Raya Reddy',
    rentalCharge: '₹1200',
    duration: '1 day 4 hours',
    damageCharge: '₹500–3000',
    tillingCharge: '₹7/km',
  };

  /** --------------------------------------
   * Booking Tracking Progress
   * -------------------------------------- */
  const trackingSteps = [
    { id: 1, label: 'Booking confirmed', time: '20 min ago', completed: true },
    { id: 2, label: 'Vehicle Handover', time: '10 min ago', active: true },
    { id: 3, label: 'Ongoing', time: '-', completed: false },
    { id: 4, label: 'Return & Handover', time: '-', completed: false },
  ];

  /** --------------------------------------
   * Modal Controls
   * -------------------------------------- */
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  /** --------------------------------------
   * JSX Render
   * -------------------------------------- */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/chevron-left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Hosting Details</Text>
          <Text style={styles.headerSubtitle}>
            Booking ID: {bookingData.bookingId}
          </Text>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- MAIN SCROLL ---------- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TIMELINE CARD */}
        <View style={styles.card}>
          <View style={styles.timelineContainer}>
            {/* Pickup */}
            <TimelineItem
              date={bookingData.pickupDate}
              time={bookingData.pickupTime}
            />

            <DottedLine />
            <OnDutyIndicator />
            <DottedLine />

            {/* Drop-off */}
            <TimelineItem
              date={bookingData.dropoffDate}
              time={bookingData.dropoffTime}
            />
          </View>
        </View>

        {/* USER DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>User Details</Text>
          <TouchableOpacity style={styles.userRow}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>
              <Text style={styles.userName}>{bookingData.renterName}</Text>
            </View>
            <Image
              source={require('./assets/chevron-left.png')}
              style={styles.chevronRight}
            />
          </TouchableOpacity>
        </View>

        {/* TRACK BOOKING CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Track Booking</Text>
          <View style={styles.trackingContainer}>
            {trackingSteps.map((step, index) => (
              <TrackingStep
                key={step.id}
                step={step}
                isLast={index === trackingSteps.length - 1}
              />
            ))}
          </View>
        </View>

        {/* PRICE DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Rental Charge (Fuel not included){'\n'}
              <Text style={styles.priceDuration}>{bookingData.duration}</Text>
            </Text>
            <Text style={styles.priceValue}>{bookingData.rentalCharge}</Text>
          </View>
        </View>

        {/* ADDITIONAL COSTS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Additional Costs</Text>
          <AdditionalCost label="Any damage" value={bookingData.damageCharge} />
          <AdditionalCost label="Tilling extend" value={bookingData.tillingCharge} />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ---------- FOOTER BUTTONS ---------- */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton} onPress={openModal}>
          <Text style={styles.startText}>Get Code for Start</Text>
        </TouchableOpacity>
      </View>

      {/* ---------- ENTER CODE MODAL ---------- */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            <ScrollView>
              <EnterCodeScreen navigation={navigation} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UpcomingBookingDetailScreen;

/* -------------------------------------------------------------------------- */
/* --- SUBCOMPONENTS -------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const TimelineItem = ({ date, time }) => (
  <View style={styles.timelineItem}>
    <View style={styles.iconCircle}>
      <Image
        source={require('./assets/map-pin.png')}
        style={{ width: 16, height: 16, tintColor: '#6B7280' }}
      />
    </View>
    <View>
      <Text style={styles.timelineDate}>{date}</Text>
      <Text style={styles.timelineTime}>{time}</Text>
    </View>
  </View>
);

const DottedLine = () => (
  <View style={styles.dottedLine}>
    {[...Array(5)].map((_, i) => (
      <View key={i} style={styles.dot} />
    ))}
  </View>
);

const OnDutyIndicator = () => (
  <View style={styles.onDutyContainer}>
    <View style={styles.carIconCircle}>
      <View style={styles.carIconDot} />
    </View>
    <Text style={styles.onDutyText}>On-duty</Text>
  </View>
);

const TrackingStep = ({ step, isLast }) => (
  <View style={styles.trackingStep}>
    <View style={styles.trackingIconContainer}>
      <View
        style={[
          styles.trackingIcon,
          step.completed && styles.trackingIconCompleted,
          step.active && styles.trackingIconActive,
        ]}
      >
        <Text
          style={[
            styles.trackingIconText,
            (step.completed || step.active) && styles.trackingIconTextWhite,
          ]}
        >
          {step.id}
        </Text>
      </View>
      {!isLast && (
        <View
          style={[
            styles.trackingLine,
            step.completed && styles.trackingLineCompleted,
          ]}
        />
      )}
    </View>
    <View style={styles.trackingContent}>
      <Text style={styles.trackingLabel}>{step.label}</Text>
      <Text style={styles.trackingTime}>{step.time}</Text>
    </View>
  </View>
);

const AdditionalCost = ({ label, value }) => (
  <View style={styles.additionalCostRow}>
    <Text style={styles.additionalCostLabel}>{label}</Text>
    <Text style={styles.additionalCostValue}>{value}</Text>
  </View>
);

/* -------------------------------------------------------------------------- */
/* --- STYLES --------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  backButton: { paddingRight: 10 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  headerSubtitle: { fontSize: 13, color: '#6B7280' },
  contactButton: {
    backgroundColor: '#6D38E8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  contactText: { color: '#FFF', fontSize: 13, fontWeight: '600' },

  // Card layout
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#000' },

  // Timeline
  timelineContainer: { alignItems: 'center' },
  timelineItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  timelineDate: { fontSize: 14, fontWeight: '600', color: '#000' },
  timelineTime: { fontSize: 12, color: '#6B7280' },
  dottedLine: { flexDirection: 'row', marginVertical: 4 },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 3,
  },
  onDutyContainer: { alignItems: 'center', marginVertical: 4 },
  carIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#6D38E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carIconDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6D38E8' },
  onDutyText: { color: '#6D38E8', fontWeight: '600', fontSize: 13, marginTop: 4 },

  // Tracking
  trackingContainer: { marginTop: 8 },
  trackingStep: { flexDirection: 'row', alignItems: 'flex-start' },
  trackingIconContainer: { alignItems: 'center' },
  trackingIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingIconCompleted: { backgroundColor: '#10B981', borderColor: '#10B981' },
  trackingIconActive: { backgroundColor: '#6D38E8', borderColor: '#6D38E8' },
  trackingIconText: { fontSize: 12, color: '#6B7280' },
  trackingIconTextWhite: { color: '#FFF' },
  trackingLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  trackingLineCompleted: { backgroundColor: '#6D38E8' },
  trackingContent: { marginLeft: 10, flex: 1 },
  trackingLabel: { fontSize: 14, fontWeight: '500', color: '#000' },
  trackingTime: { fontSize: 12, color: '#9CA3AF' },

  // Price & Additional
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  priceLabel: { fontSize: 14, color: '#000' },
  priceDuration: { fontSize: 12, color: '#6B7280' },
  priceValue: { fontSize: 15, fontWeight: '600', color: '#000' },
  additionalCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  additionalCostLabel: { fontSize: 14, color: '#000' },
  additionalCostValue: { fontSize: 14, color: '#6B7280' },

  // User Row
  userRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { fontWeight: '700', fontSize: 16, color: '#000' },
  userName: { fontSize: 15, fontWeight: '500' },
  chevronRight: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
    transform: [{ rotate: '180deg' }],
  },

  // Footer
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelText: { color: '#DC2626', fontWeight: '600' },
  startButton: {
    flex: 1,
    backgroundColor: '#6D38E8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },
  startText: { color: '#FFF', fontWeight: '600' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalCloseButton: { alignSelf: 'flex-end', padding: 16 },
  modalCloseText: { fontSize: 18, fontWeight: '600' },
});
