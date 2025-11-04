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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import your icons from your assets folder or use react-native-vector-icons
// For example: import Icon from 'react-native-vector-icons/Feather';

export default function HandoverHelpScreen() {
  const navigation = useNavigation();

  // Handle trip completion
  const handleRideComplete = () => {
    console.log('Trip Completed');
    navigation.navigate('RideSummary'); // Navigate to Handover screen
  };
  const [speedometer, setSpeedometer] = useState({
    fuel: false,
    carReturned: false,
    carInspected: false,
    carCleaned: false,
  });

  const trackingSteps = [
    {
      icon: 'check-circle',
      label: 'Booking confirmed',
      time: '20+ min ago',
      completed: true,
    },
    {
      icon: 'map-pin',
      label: 'Vehicle Handover',
      time: '20+ min ago',
      completed: true,
    },
    {
      icon: 'tool',
      label: 'Ongoing',
      time: '20+ min ago',
      completed: true,
      active: true,
    },
    {
      icon: 'package',
      label: 'Return to Handover',
      time: '20+ min ago',
      completed: false,
    },
  ];

  // Replace with your actual car images from assets
  const carImages = [
    require('./assets/car.png'),
    require('./assets/car.png'),
    require('./assets/car.png'),
    require('./assets/car.png'),
    require('./assets/car.png'),
    require('./assets/car.png'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            {/* Use your back arrow icon from assets */}
            <Text>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Handover Help</Text>
          <TouchableOpacity>
            <Text style={styles.needHelp}>Need help</Text>
          </TouchableOpacity>
        </View>

        {/* Price Card */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>TOTAL PRICE UNLOCKED</Text>
          <Text style={styles.priceAmount}>₹489.56</Text>
          <Text style={styles.priceSubtext}>per hour</Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            {/* Replace with your car illustration from assets */}
            <Image
              source={require('./assets/car-handover.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
            <Text style={styles.illustrationText}>HANDOVER OF CAR</Text>
          </View>
          <Text style={styles.distance}>1 Hr 28 Mins</Text>
        </View>

        {/* Track Loading */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track loading</Text>
          {trackingSteps.map((step, index) => (
            <View key={index} style={styles.trackingItem}>
              <View style={styles.trackingIconContainer}>
                <View
                  style={[
                    styles.trackingIcon,
                    step.completed && styles.trackingIconCompleted,
                    step.active && styles.trackingIconActive,
                  ]}
                >
                  {/* Use your icons from assets */}
                  <Text style={styles.iconPlaceholder}>●</Text>
                </View>
                {index < trackingSteps.length - 1 && (
                  <View
                    style={[
                      styles.trackingLine,
                      step.completed && styles.trackingLineCompleted,
                    ]}
                  />
                )}
              </View>
              <View style={styles.trackingContent}>
                <Text
                  style={[
                    styles.trackingLabel,
                    step.active && styles.trackingLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.trackingTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Car Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Images</Text>
          <Text style={styles.sectionSubtext}>
            Please take a picture of your car from all directions, we ask you to
            do this in order to ensure the integrity of the car
          </Text>
          <View style={styles.imageGrid}>
            {carImages.map((img, index) => (
              <TouchableOpacity key={index} style={styles.imageContainer}>
                <Image
                  source={img}
                  style={styles.carImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Speedometer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Speedometer</Text>

          <View style={styles.speedometerItem}>
            <Text style={styles.speedometerLabel}>Fuel</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                speedometer.fuel && styles.checkboxChecked,
              ]}
              onPress={() =>
                setSpeedometer({ ...speedometer, fuel: !speedometer.fuel })
              }
            >
              {speedometer.fuel && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.speedometerItem}>
            <Text style={styles.speedometerLabel}>Car returned</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                speedometer.carReturned && styles.checkboxChecked,
              ]}
              onPress={() =>
                setSpeedometer({
                  ...speedometer,
                  carReturned: !speedometer.carReturned,
                })
              }
            >
              {speedometer.carReturned && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.speedometerItem}>
            <Text style={styles.speedometerLabel}>Car inspected</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                speedometer.carInspected && styles.checkboxChecked,
              ]}
              onPress={() =>
                setSpeedometer({
                  ...speedometer,
                  carInspected: !speedometer.carInspected,
                })
              }
            >
              {speedometer.carInspected && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.speedometerItem}>
            <Text style={styles.speedometerLabel}>Car cleaned</Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                speedometer.carCleaned && styles.checkboxChecked,
              ]}
              onPress={() =>
                setSpeedometer({
                  ...speedometer,
                  carCleaned: !speedometer.carCleaned,
                })
              }
            >
              {speedometer.carCleaned && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* End Trip Button */}
        <TouchableOpacity
          style={styles.endTripButton}
          onPress={handleRideComplete}
        >
          <Text style={styles.endTripText}>End Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  needHelp: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  priceCard: {
    backgroundColor: '#7C3AED',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  priceLabel: {
    color: '#E9D5FF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  priceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 4,
  },
  priceSubtext: {
    color: '#E9D5FF',
    fontSize: 14,
    marginTop: 2,
  },
  illustrationContainer: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: 200,
    height: 100,
  },
  illustrationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
    marginTop: 8,
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  sectionSubtext: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  trackingItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  trackingIconContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  trackingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingIconCompleted: {
    backgroundColor: '#7C3AED',
  },
  trackingIconActive: {
    backgroundColor: '#7C3AED',
  },
  iconPlaceholder: {
    fontSize: 20,
    color: '#fff',
  },
  trackingLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  trackingLineCompleted: {
    backgroundColor: '#7C3AED',
  },
  trackingContent: {
    flex: 1,
    paddingTop: 8,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  trackingLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  trackingTime: {
    fontSize: 12,
    color: '#999',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  imageContainer: {
    width: '33.33%',
    padding: 4,
  },
  carImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  speedometerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  speedometerLabel: {
    fontSize: 14,
    color: '#000',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#7C3AED',
    backgroundColor: '#F5F3FF',
  },
  checkmark: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  endTripButton: {
    backgroundColor: '#7C3AED',
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  endTripText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
