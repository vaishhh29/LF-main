import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

export default function RideSummaryScreen() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Summary</Text>
      </View>

      {/* Main Content - Full Screen Card */}
      <View style={styles.mainCard}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          
          {/* User Info Section */}
          <View style={styles.userInfoSection}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userPhone}>+91 9876543210</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ 4.5</Text>
            </View>
          </View>

          {/* Ride Price Button - Opens Modal */}
          <TouchableOpacity 
            style={styles.ridePriceButton}
            onPress={() => setShowCalculator(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.ridePriceText}>₹489 for 3</Text>
          </TouchableOpacity>

          {/* Booking Details Section */}
          <View style={styles.bookingSection}>
            <Text style={styles.bookingLabel}>Booking ID</Text>
            <Text style={styles.bookingValue}>#BK123456</Text>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>QR Code</Text>
            <Text style={styles.qrSubtext}>Scan to verify</Text>
            
            <View style={styles.qrCodeContainer}>
              {/* Replace with your QR code image from assets */}
              <Image 
                source={require('./assets/qr-code.png')}
                style={styles.qrCode}
                resizeMode="contain"
              />
            </View>
          </View>

        </ScrollView>
      </View>

      {/* Fare Calculations Bottom Sheet Modal */}
      <Modal
        visible={showCalculator}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalculator(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalculator(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            style={styles.bottomSheet}
            onPress={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCalculator(false)}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            {/* Modal Content - Fare Calculations */}
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Fare Calculations</Text>
              
              {/* Fare Breakdown */}
              <View style={styles.fareList}>
                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>Driver Fee:</Text>
                  <Text style={styles.fareValue}>+ ₹438.8</Text>
                </View>

                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>Convenience Fee:</Text>
                  <Text style={styles.fareValue}>+ ₹111.94</Text>
                </View>

                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>Go/Chauffeurs Secure Fee:</Text>
                  <Text style={styles.fareValue}>+ ₹15.0</Text>
                </View>

                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>GST:</Text>
                  <Text style={styles.fareValue}>+ ₹22.85</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>Sub Total:</Text>
                  <Text style={styles.fareValue}>₹580.59</Text>
                </View>

                <View style={styles.fareItem}>
                  <Text style={styles.fareLabel}>Rounding Up:</Text>
                  <Text style={styles.fareValue}>+ ₹0.41</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.fareItemTotal}>
                  <Text style={styles.fareLabelTotal}>Grand Total:</Text>
                  <Text style={styles.fareValueTotal}>₹581</Text>
                </View>
              </View>

            </View>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D9E5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#D5D9E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  mainCard: {
    flex: 1,
    backgroundColor: '#F0F2F8',
    marginHorizontal: 0,
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 3,
    borderColor: '#5B9BD5',
    borderBottomWidth: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  userInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D4E0',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 13,
    color: '#7A7A7A',
  },
  ratingBadge: {
    backgroundColor: '#E8EAF0',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  ridePriceButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  ridePriceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bookingSection: {
    backgroundColor: '#E8EBF5',
    padding: 18,
    borderRadius: 10,
    marginBottom: 30,
  },
  bookingLabel: {
    fontSize: 11,
    color: '#8A8FA3',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  bookingValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  qrSection: {
    alignItems: 'center',
    paddingTop: 10,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 6,
  },
  qrSubtext: {
    fontSize: 13,
    color: '#8A8FA3',
    marginBottom: 24,
  },
  qrCodeContainer: {
    width: '100%',
    maxWidth: 280,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrCode: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: height * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '400',
  },
  modalContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 24,
    paddingRight: 50,
  },
  fareList: {
    gap: 16,
  },
  fareItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 14,
    color: '#5A5A5A',
    fontWeight: '400',
  },
  fareValue: {
    fontSize: 14,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 4,
  },
  fareItemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  fareLabelTotal: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  fareValueTotal: {
    fontSize: 20,
    color: '#7C3AED',
    fontWeight: '700',
  },
});