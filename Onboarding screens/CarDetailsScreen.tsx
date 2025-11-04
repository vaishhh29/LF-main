import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CarDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params || {};

  // Mock car data - replace with actual data fetch based on carId
  const carDetails = {
    id: 'LF234546789',
    name: 'Toyota Corolla',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
    bookings: 2,
    earnings: 2000,
    aboutCar: 'Hey there.This car is my swift and it\'s absolutely the best car that I have driven so far. Better car than my swift.',
    charge: 200,
    licenseNumber: 'DL04AN1234',
    rcBook: 'https://via.placeholder.com/80x60',
    carColor: '#7C3AED',
    carRegistration: '2017',
    fastTagEnabled: 'Yes',
    homeDeliveryServices: 'Yes',
    carImages: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
    ],
    safety: ['Air bags', 'Child Seats'],
    driving: ['Voice Assist'],
    entertainment: ['FM Radio', 'Youtube'],
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={require('./assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car details</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <Image source={require('./assets/more-vertical.png')} style={styles.moreIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Car Header Card */}
        <View style={styles.carHeaderCard}>
          <Image source={{ uri: carDetails.image }} style={styles.carHeaderImage} />
          <View style={styles.carHeaderInfo}>
            <Text style={styles.carHeaderName}>{carDetails.name}</Text>
            <View style={styles.carHeaderId}>
              <Image source={require('./assets/id-icon.png')} style={styles.idIcon} />
              <Text style={styles.carHeaderIdText}>{carDetails.id}</Text>
            </View>
          </View>
        </View>

        {/* Bookings and Earnings */}
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bookings : {carDetails.bookings}</Text>
          <Image source={require('./assets/chevron-right.png')} style={styles.chevronIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>Earnings : ₹ {carDetails.earnings}</Text>
          <Image source={require('./assets/chevron-right.png')} style={styles.chevronIcon} />
        </TouchableOpacity>

        {/* About Car */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About car</Text>
          <Text style={styles.aboutText}>{carDetails.aboutCar}</Text>
        </View>

        {/* Charge */}
        <View style={styles.chargeRow}>
          <Text style={styles.chargeLabel}>
            Charge <Image source={require('./assets/zap.png')} style={styles.zapIcon} />
          </Text>
          <View style={styles.chargeValue}>
            <Text style={styles.chargePrice}>₹ {carDetails.charge}</Text>
            <Text style={styles.chargeUnit}> / hour </Text>
            <View style={styles.rentBadge}>
              <Text style={styles.rentText}>• On Rent</Text>
            </View>
          </View>
        </View>

        {/* License Number */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>License number</Text>
          <Text style={styles.detailValue}>{carDetails.licenseNumber}</Text>
        </View>

        {/* RC Book */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>RC Book</Text>
          <Image source={{ uri: carDetails.rcBook }} style={styles.rcImage} />
        </View>

        {/* Car Color */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Car color</Text>
          <View style={[styles.colorCircle, { backgroundColor: carDetails.carColor }]} />
        </View>

        {/* Car Registration */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Car registration</Text>
          <Text style={styles.detailValue}>{carDetails.carRegistration}</Text>
        </View>

        {/* FASTag Enabled */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>FASTag Enabled</Text>
          <Text style={styles.detailValue}>{carDetails.fastTagEnabled}</Text>
        </View>

        {/* Home Delivery Services */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Home delivery services?</Text>
          <Text style={styles.detailValue}>{carDetails.homeDeliveryServices}</Text>
        </View>

        {/* Car Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Images</Text>
          <View style={styles.imagesGrid}>
            {carDetails.carImages.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.gridImage} />
            ))}
          </View>
        </View>

        {/* Safety */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety</Text>
          <View style={styles.featuresRow}>
            {carDetails.safety.map((item, idx) => (
              <View key={idx} style={styles.featureBox}>
                <Image 
                  source={require('./assets/airbag.png')} 
                  style={styles.featureIcon} 
                />
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Driving */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driving</Text>
          <View style={styles.featuresRow}>
            {carDetails.driving.map((item, idx) => (
              <View key={idx} style={styles.featureBox}>
                <Image 
                  source={require('./assets/voice.png')} 
                  style={styles.featureIcon} 
                />
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Entertainment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entertainment</Text>
          <View style={styles.featuresRow}>
            {carDetails.entertainment.map((item, idx) => (
              <View key={idx} style={styles.featureBox}>
                <Image 
                  source={require('./assets/radio.png')} 
                  style={styles.featureIcon} 
                />
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    padding: 8,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginLeft: 12,
  },
  moreBtn: {
    padding: 8,
  },
  moreIcon: {
    width: 4,
    height: 16,
    tintColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  carHeaderCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  carHeaderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  carHeaderInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  carHeaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  carHeaderId: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idIcon: {
    width: 12,
    height: 12,
    tintColor: '#6B7280',
    marginRight: 4,
  },
  carHeaderIdText: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
  },
  section: {
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  chargeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
  },
  zapIcon: {
    width: 16,
    height: 16,
    tintColor: '#F59E0B',
    marginLeft: 4,
  },
  chargeValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chargePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  chargeUnit: {
    fontSize: 13,
    color: '#6B7280',
  },
  rentBadge: {
    marginLeft: 8,
  },
  rentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  rcImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  gridImage: {
    width: '31.33%',
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  featureBox: {
    width: '48%',
    margin: 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  featureIcon: {
    width: 32,
    height: 32,
    tintColor: '#7C3AED',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
});