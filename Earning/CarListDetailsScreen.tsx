import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Reusable Components ---  

// Progress Stepper Component
const ProgressStep = ({ name, isComplete }: { name: string; isComplete: boolean }) => (
  <View style={styles.stepContainer}>
    <View style={[styles.stepCircle, isComplete && styles.stepCircleComplete]}>
      <Icon name="check" size={16} color="#FFF" />
    </View>
    <Text style={styles.stepText}>{name}</Text>
  </View>
);

// Radio Button Component
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// Feature Button Component
const FeatureButton = ({ icon, label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.featureButton, selected && styles.featureButtonSelected]}
    onPress={onPress}>
    <Icon
      name={icon}
      size={28}
      color={selected ? '#5E2D91' : '#444'}
    />
    <Text style={styles.featureLabel}>{label}</Text>
  </TouchableOpacity>
);


// --- Main Screen ---

const CarListDetailsScreen = () => {
  // --- State Management ---
  const [description, setDescription] = useState(
    "Hey there, This car is my swift and it's absolutely the best. You won't find comfort in any other car than my swift."
  );
  const [fastagEnabled, setFastagEnabled] = useState(true);
  const [homeDelivery, setHomeDelivery] = useState(true);
  const [selectedFeatures, setSelectedFeatures] = useState([
    'child-safety',
    '360-camera',
    'parking-assist',
    'wifi-connect',
  ]);

  // --- Data for Features ---
  const features = {
    safety: [
      { id: 'airbags', icon: 'airbag', label: '6 Airbags' },
      { id: 'child-safety', icon: 'car-child-seat', label: 'Child Safety' },
      { id: 'abs', icon: 'car-brake-abs', label: 'ABS' },
      { id: 'ventilated-seats', icon: 'car-seat-cooler', label: 'Ventilated Seats' },
      { id: 'side-ratings', icon: 'star-outline', label: 'Side Ratings' },
      { id: '360-camera', icon: 'camera-around-outline', label: '360 view camera' },
    ],
    driving: [
      { id: 'keyless-entry', icon: 'car-key', label: 'Keyless Entry' },
      { id: 'spacious-interiors', icon: 'car-seat', label: 'Spacious Interiors' },
      { id: 'parking-assist', icon: 'parking', label: 'Parking Assist' },
      { id: 'voice-control', icon: 'microphone-outline', label: 'Voice Control' },
      { id: 'spare-tyre', icon: 'tire', label: 'Spare Tyre' },
      { id: 'power-steering', icon: 'steering', label: 'Power Steering' },
    ],
    entertainment: [
      { id: 'music-system', icon: 'music-box-outline', label: 'Music System' },
      { id: 'wifi-connect', icon: 'wifi', label: 'WiFi Connect' },
    ],
  };

  // --- Event Handlers ---
  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((featId) => featId !== id) : [...prev, id]
    );
  };

  // --- Render Logic ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F9" />

      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="#333" />
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Stepper */}
      <View style={styles.stepperContainer}>
        <ProgressStep name="Personal" isComplete={true} />
        <View style={styles.stepperLine} />
        <ProgressStep name="ID Proof" isComplete={true} />
        <View style={styles.stepperLine} />
        <ProgressStep name="Car image" isComplete={true} />
        <View style={styles.stepperLine} />
        <ProgressStep name="Car details" isComplete={true} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main Content Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Add car description & features</Text>

          {/* Description Input */}
          <Text style={styles.label}>Tell us about your car</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              value={description}
              onChangeText={setDescription}
              maxLength={100}
            />
            <Text style={styles.charCount}>{description.length}/100</Text>
          </View>

          {/* Radio Button Groups */}
          <View style={styles.radioGroup}>
            <Text style={styles.label}>FASTag Enabled?</Text>
            <View style={styles.radioOptions}>
              <RadioButton
                label="Yes"
                selected={fastagEnabled}
                onPress={() => setFastagEnabled(true)}
              />
              <RadioButton
                label="No"
                selected={!fastagEnabled}
                onPress={() => setFastagEnabled(false)}
              />
            </View>
          </View>

          <View style={styles.radioGroup}>
            <Text style={styles.label}>Do you offer home delivery services?</Text>
            <View style={styles.radioOptions}>
              <RadioButton
                label="Yes"
                selected={homeDelivery}
                onPress={() => setHomeDelivery(true)}
              />
              <RadioButton
                label="No"
                selected={!homeDelivery}
                onPress={() => setHomeDelivery(false)}
              />
            </View>
          </View>

          {/* Car Features Section */}
          <Text style={styles.label}>Select Car Features</Text>
          <Text style={styles.subLabel}>Choose (maximum 10) car features</Text>
          
          {Object.keys(features).map((category) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
              <View style={styles.featuresGrid}>
                {features[category].map((feature) => (
                  <FeatureButton
                    key={feature.id}
                    icon={feature.icon}
                    label={feature.label}
                    selected={selectedFeatures.includes(feature.id)}
                    onPress={() => toggleFeature(feature.id)}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


// --- Styles ---
const PRIMARY_COLOR = '#5E2D91';
const BORDER_COLOR = '#E0E0E0';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  saveButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleComplete: {
    backgroundColor: PRIMARY_COLOR,
  },
  stepText: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  stepperLine: {
    flex: 1,
    height: 2,
    backgroundColor: PRIMARY_COLOR,
    marginTop: 11,
  },
  scrollContainer: {
    paddingBottom: 100, // Space for the footer button
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInputContainer: {
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    height: 100,
    padding: 8,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    fontSize: 12,
  },
  radioGroup: {
    marginBottom: 20,
  },
  radioOptions: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PRIMARY_COLOR,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  subLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureButton: {
    width: '31%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  featureButtonSelected: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    backgroundColor: '#F3E5F5',
  },
  featureLabel: {
    marginTop: 6,
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
  },
  continueButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarListDetailsScreen;