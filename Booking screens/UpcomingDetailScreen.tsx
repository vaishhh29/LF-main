import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfirmModal from '../components/ConfirmModal';

const UpcomingDetailScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); 

  const bookings = [
    {
      id: 1,
      renterName: 'Raman',
      bookingId: 'LF123456789',
      pickupDate: 'Thu, 12 Feb',
      pickupTime: '10:00 AM',
      dropoffDate: 'Thu, 14 Feb',
      dropoffTime: '12:00 PM',
      price: '₹ 2000',
      carName: 'Hyundai',
      duration: '13h 45m',
    },
  ];

  const booking = bookings[0];

  // Open modal with type
  const handleAction = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  // Confirm action
  const handleConfirm = () => {
    console.log(`${modalType} confirmed`);
    setModalVisible(false);
  };

  // Cancel modal
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.bookingIdContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('./assets/chevron-left.png')}
              style={styles.iconMedium}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.bookingIdText}>Booking ID : {booking.bookingId}</Text>
        </View>

        <View style={styles.containerbox}>
          <View style={styles.timelineContainer}>
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

            <View style={styles.centerConnector}>
              <View style={styles.dottedLine} />
              <Image
                source={require('./assets/map-pin.png')}
                style={styles.carIcon}
                resizeMode="contain"
              />
              <View style={styles.dottedLine} />
            </View>

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

          <View style={styles.durationLineContainer}>
            <View style={[styles.durationDot, { backgroundColor: '#31C554' }]} />
            <View style={styles.durationLine} />
            <View style={styles.durationInfo}>
              <Image
                source={require('./assets/clock.png')}
                style={styles.clockIcon}
                resizeMode="contain"
              />
              <Text style={styles.durationText}>{booking.duration}</Text>
            </View>
            <View style={styles.durationLine} />
            <View style={[styles.durationDot, { backgroundColor: '#E74C3C' }]} />
          </View>
          <View style={styles.carCard}>
            <Image
              source={require('./assets/car.png')}
              style={styles.carImage}
              resizeMode="cover"
            />
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{booking.carName}</Text>
              <Text style={styles.carPrice}>{booking.price}</Text>
            </View>
          </View>

          <View style={styles.driverCard}>
            <View style={styles.driverTopRow}>
              <View style={styles.driverLeft}>
                <Image
                  source={require('./assets/avatar.png')}
                  style={styles.driverImg}
                />
                <Text style={styles.driverName}>{booking.renterName}</Text>
              </View>

              <TouchableOpacity style={styles.contactBtn}>
                <Text style={styles.contactText}>Contact</Text>
                <Image
                  source={require('./assets/whatsapp.png')}
                  style={styles.AlertIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.driverInfoBlock}>
              <Text style={styles.infoText}>
                Raman’s Id Status – {' '}
                <Image
                  source={require('./assets/check-mark.png')}
                  style={styles.checkmarkicon}
                  resizeMode="contain"
                />
                <Text style={styles.infoBold}> Verified</Text>
              </Text>

              <Text style={styles.infoText}>
                Raman’s Trip History – <Text style={styles.infoBold}>5 trips</Text>
              </Text>

             <TouchableOpacity
  style={styles.ratingRow}
  onPress={() => navigation.navigate('RatingScreen')}
>
  <Text style={styles.infoText}>
    Raman’s Ratings – <Text style={styles.infoBold}>4.7</Text>
    <Image
      source={require('./assets/stardark.png')}
      style={styles.starIcon}
      resizeMode="contain"
    />
  </Text>
  <Image
    source={require('./assets/next-button.png')}
    style={styles.nextButtonIcon}
    resizeMode="contain"
  />
</TouchableOpacity>


            </View>
          </View>

          <View style={styles.reportSection}>
            <Image
              source={require('./assets/alert-sign.png')}
              style={styles.AlertIcon}
              resizeMode="contain"
            />
            <Text style={styles.reportText}>  Report customer</Text>
          </View>

          <View style={styles.helpRow}>
            <Text style={styles.helpText}>Need help? </Text>
            <Text style={styles.contactUsText}>Contact Us</Text>
          </View>
        </View>


        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.declineBtn}
            onPress={() => handleAction('declined')}>
            <Text style={styles.declineText}>Declined</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.approveBtn}
            onPress={() => handleAction('approved')}>
            <Text style={styles.approveText}>Approved</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        type={modalType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default UpcomingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  bookingIdContainer: {
    paddingVertical: 12,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMedium: { width: 30, height: 30, marginRight: 10 },
  bookingIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    backgroundColor: '#F1EDFC',
    padding: 18,
    borderRadius: 8,
  },
  containerbox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  durationLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  durationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  durationLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#BFBFBF',
    borderStyle: 'dashed',
  },
  durationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  durationText: {
    color: '#8C8C8C',
    fontSize: 12,
    marginLeft: 5,
  },
  carCard: {
    backgroundColor: '#FFF9F9',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
  },
  carImage: {
    width: 50,
    height: 40,
    borderRadius: 8,
  },
  carInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  carName: {
    fontWeight: '600',
    color: '#000',
  },
  carPrice: {
    fontWeight: '600',
    color: '#000',
  },
  clockIcon: {
    width: 12,
    height: 12,
  },
  AlertIcon: {
    width: 16,
    height: 16,
  },
  checkmarkicon: {
    width: 12,
    height: 12,
    marginLeft: 4,
  },
  starIcon: {
    width: 12,
    height: 12,
    marginLeft: 2,
    marginBottom: -2,
  },
  driverCard: {
    backgroundColor: '#FFF9F9',
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
  },
  driverTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  driverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  driverName: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contactText: {
    marginRight: 4,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    marginTop: 8,
    marginBottom: 6,
  },
  driverInfoBlock: {
    gap: 4,
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#333333',
    height: 30,
    fontWeight: '600',
  },
  infoBold: {
    color: '#808080',
    fontWeight: '600',
  },
  reportSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F9',
    borderRadius: 8,
    padding: 15,
    marginTop: 16,
  },
  reportText: {
    color: '#000',
    fontSize: 13,
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  helpText: {
    color: '#666',
  },
  contactUsText: {
    color: '#7149E1',
    fontWeight: '600',
     textDecorationLine: 'underline', 
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  declineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 15,
    marginRight: 8,
    alignItems: 'center',
  },
  approveBtn: {
    flex: 1,
    backgroundColor: '#7149E1',
    borderRadius: 10,
    paddingVertical: 15,
    marginLeft: 8,
    alignItems: 'center',
  },
  declineText: {
    color: '#000',
    fontWeight: '600',
  },
  approveText: {
    color: '#fff',
    fontWeight: '600',
  },
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
    marginLeft: 4,
    marginRight: 4,
  },
  carIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 6,
    tintColor: '#000',
  },
ratingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 30,
},
nextButtonIcon: {
  width: 16,
  height: 16,
  tintColor: '#666',
},


});
