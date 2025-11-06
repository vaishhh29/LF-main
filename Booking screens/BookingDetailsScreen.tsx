import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

const BookingDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack()}
        >
          <Image source={require('./assets/chevron-left.png')} style={styles.iconBack} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Booking details</Text>
          <Text style={styles.bookingId}>Booking ID : LFI23456789</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Banner */}
        <View style={styles.amountBanner}>
          <Text style={styles.amountLabel}>Amount to be Collected</Text>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>₹489.56</Text>
            <Image source={require('./assets/info.png')} style={styles.iconInfo} />
          </View>
        </View>
        <View style={styles.cont}>
<View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <Image
            source={require('./assets/up-arrow.png')} 
            style={styles.left}
            resizeMode="contain"
          />
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineDate}>Thu, 14 Jul</Text>
            <Text style={styles.timelineTime}> 11.00AM</Text>
          </View>
        </View>

        <View style={styles.timelineConnector} />

        <View style={styles.timelineItem}>
          <Image
            source={require('./assets/car.png')}
            style={styles.car}
            resizeMode="contain"
          />
        </View>

        <View style={styles.timelineConnector} />

        <View style={styles.timelineItem}>
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineDate}>Thu,16 JUL</Text>
            <Text style={styles.timelineTime}>12.00 PM</Text>
          </View>
          <Image
            source={require('./assets/down-arrow.png')}
            style={styles.right}
            resizeMode="contain"
          />
        </View>
      </View>

          {/* Bottom Row: Duration Line */}
 <View style={styles.timelineDivider}>
  <View style={styles.greenDot} />
  <View style={styles.dottedLine} />
  <View style={styles.clockCircle}>
    <Image source={require('./assets/Vector.png')} style={styles.iconClock} />
  </View>
  <Text style={styles.durationText}>13h 45m</Text>
  <View style={styles.dottedLine} />
  <View style={styles.redDot} />
</View>
</View>

{/* User Details */}
<View style={styles.detailCard}>
  <Text style={styles.sectionTitle}>User details</Text>
  <TouchableOpacity
    style={styles.cardRow}
    onPress={() => navigation?.navigate('DriverScreen')}
    activeOpacity={0.7}
  >
    <Image source={require('./assets/avatar.png')} style={styles.avatar} />
    <Text style={styles.cardName}>Ranga raya reddy</Text>
    <Image source={require('./assets/chevron-right.png')} style={styles.iconChevron} />
  </TouchableOpacity>
</View>
 {/* Car Details */}
        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Car Details</Text>
          <TouchableOpacity
            style={styles.cardRow}
            onPress={() => navigation?.navigate('CarDetailsScreen')}
            activeOpacity={0.7}
          >
            <Image source={require('./assets/carre.png')} style={styles.carThumb} />
            <Text style={styles.cardName}>Hundyai</Text>
            <Image source={require('./assets/chevron-right.png')} style={styles.iconChevron} />
          </TouchableOpacity>
        </View>

        {/* Trip Details */}
        <View style={styles.detailCard}>
          <Text style={styles.sectionTitle}>Trip Details</Text>

          <View style={styles.tripTimeline}>
          <View style={styles.tripItem}>
  <View style={styles.checkCircle}>
    <Image source={require('./assets/check.png')} style={styles.iconCheck} />
  </View>

  <View style={styles.tripItemContent}>
    <View style={styles.tripRow}>
      <Text style={styles.tripItemTitle}>Booking confirmed</Text>
      <Text style={styles.tripItemDate}>14 Jul 2025</Text>
    </View>
  </View>
</View>


            <View style={styles.verticalLine} />

            <View style={styles.tripItem}>
              <View style={styles.checkCircle}>
                <Image source={require('./assets/check.png')} style={styles.iconCheck} />
              </View>
              <View style={styles.tripItemContent}>
                <View style={styles.tripRow}>
                <Text style={styles.tripItemTitle}>Return & Handover</Text>
                <Text style={styles.tripItemDate}>16 Jul 2025</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.durationBadge}>
            <Text style={styles.durationLabel}>DURATION OF USE</Text>
            <Text style={styles.durationValue}>2 days</Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  cont:{
  backgroundColor: '#f1f2f8ff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  backButton: {
    padding: 4,
  },
  iconBack: {
    width: 24,
    height: 24,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  bookingId: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  left:{
height:30,
width:30,
},
car:{
  height:30,
width:30,
},
right:{
  height:30,
width:30,
},
  amountBanner: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  iconInfo: {
    width: 30,
    height: 30,
  },
  timelineCard: {
    backgroundColor: '#F3F4F6',
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
 timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
   
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 44,
    height: 44,
    marginBottom: 8,
  },
  timelineTextContainer: {
     alignItems: 'center',
     marginHorizontal: 8,
     minWidth:60,
   },
 timelineDate: {
     fontSize:13,
     color: '#6B7280',
     fontWeight: '500',
   },
  timelineTime: {
     fontSize: 13,
     color: '#9CA3AF',
     marginTop: 2,
   },
   timelineConnector: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    marginHorizontal: 4,
  },
  dots: {
    color: '#9CA3AF',
    fontSize: 16,
    letterSpacing: 2,
  },
  carIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCar: {
    width: 32,
    height: 32,
  },
  timelineDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
  dottedLine: {
    flex: 1,
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  clockCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    // backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  iconClock: {
    width: 16,
    height: 16,
    //tintColor: '#FFFFFF',
  },
  durationText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    marginHorizontal: 8,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  carThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  cardName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  iconChevron: {
    width: 15,
    height: 15,
  },
  tripTimeline: {
    marginBottom: 16,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCheck: {
    width: 30,
    height: 30,
    
  },
  tripItemContent: {
    flex: 1,
    
  },
  tripRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

  tripItemTitle: {
   fontSize: 16,
  fontWeight: '600',
  color: '#000',
  flexWrap: 'nowrap',
  },
  tripItemDate: {
   
    fontSize: 14,
  fontWeight: '400',
  color: '#555',
  },
  verticalLine: {
    width: 2,
    height: 28,
    backgroundColor: '#111827',
    marginLeft: 15,
    marginVertical: 1,
  },
  durationBadge: {
    backgroundColor: '#eff3ffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 15,
    fontWeight: '300',
    color: '#8B5CF6',
    letterSpacing: 0,
    marginBottom: 4,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
  },
});

export default BookingDetailsScreen;