import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Custom Icons
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M15 18l-6-6 6-6" 
      stroke="#111827" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M20 6L9 17l-5-5" 
      stroke="#FFFFFF" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const NextIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M9 18l6-6-6-6" 
      stroke="#FFFFFF" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

const CarDetailsScreen = ({ navigation }) => {
  const [carReturned, setCarReturned] = useState(true);
  const [carInspected, setCarInspected] = useState(true);
  const [carCleaned, setCarCleaned] = useState(true);

  // Navigate to CarAddDetails screen - THIS SHOULD WORK NOW
  const handleAddCarDetails = () => {
    console.log('Navigating to CarAddDetails...');
    navigation.navigate('CarAddDetails');
  };

  const handleEditDetails = () => {
    console.log('Navigating to CarAddDetails with edit mode...');
    navigation.navigate('CarAddDetails', { 
      isEditing: true,
      carData: {
        speedometerStart: 484,
        speedometerEnd: 1122,
        images: []
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Car Images Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitleLarge}>Car Images</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditDetails}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.imageSubtext}>
            To ensure trust and security on our platform we ask you to retake a few images of the vehicle before handover.
          </Text>

          <View style={styles.imageGrid}>
            {[...Array(6)].map((_, index) => (
              <View key={index} style={styles.carImage}>
                <Image 
                  source={require('./assets/carre.png')} 
                  style={styles.imageFile}
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Speedometer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleLarge}>Speedometer</Text>
          
          <View style={styles.speedometerInputs}>
            <View style={styles.speedometerInput}>
              <Text style={styles.inputLabel}>Start</Text>
              <View style={styles.input}>
                <Text style={styles.inputValue}>484</Text>
              </View>
            </View>
            <View style={styles.speedometerInput}>
              <Text style={styles.inputLabel}>End</Text>
              <View style={styles.input}>
                <Text style={styles.inputValue}>1122</Text>
              </View>
            </View>
          </View>

          <Text style={styles.exceedsText}>Exceeds by 50km</Text>
        </View>

        {/* Checklist Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.checklistItem}
            onPress={() => setCarReturned(!carReturned)}
            activeOpacity={0.7}
          >
            <Text style={styles.checklistText}>Car returned</Text>
            <View style={[styles.checkbox, !carReturned && styles.checkboxUnchecked]}>
              {carReturned && <CheckIcon />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.checklistItem}
            onPress={() => setCarInspected(!carInspected)}
            activeOpacity={0.7}
          >
            <Text style={styles.checklistText}>Car inspected</Text>
            <View style={[styles.checkbox, !carInspected && styles.checkboxUnchecked]}>
              {carInspected && <CheckIcon />}
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.checklistItem}
            onPress={() => setCarCleaned(!carCleaned)}
            activeOpacity={0.7}
          >
            <Text style={styles.checklistText}>Car cleaned</Text>
            <View style={[styles.checkbox, !carCleaned && styles.checkboxUnchecked]}>
              {carCleaned && <CheckIcon />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        {/* <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleEditDetails}
          >
            <Text style={styles.secondaryButtonText}>Edit Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleAddCarDetails}
          >
            <NextIcon />
            <Text style={styles.primaryButtonText}>Add New Car</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
       
      </ScrollView>
    </SafeAreaView>
  );
};

// Your styles remain exactly the same...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  imageFile: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
  iconButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitleLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  imageSubtext: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  carImage: {
    width: '31%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  speedometerInputs: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  speedometerInput: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    minHeight: 48,
    justifyContent: 'center',
  },
  inputValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  exceedsText: {
    fontSize: 13,
    color: '#EF4444',
    marginTop: 8,
    fontWeight: '500',
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  checklistText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxUnchecked: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 24,
  },
});

export default CarDetailsScreen;