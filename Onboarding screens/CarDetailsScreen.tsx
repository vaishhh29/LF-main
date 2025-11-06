import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Step titles
const steps = ['Personal', 'ID Proof', 'Car Image', 'Car Details'];

// Car features data
const safetyFeatures = [
  { id: 1, name: 'Front Airbags', icon: require('./assets/airbag.png') },
  { id: 2, name: 'Side Airbags', icon: require('./assets/airbag.png') },
  { id: 3, name: 'Back Airbags', icon: require('./assets/airbag.png') },
  { id: 4, name: 'Side Airbags', icon: require('./assets/airbag.png') },
  { id: 5, name: 'Ventilated Seats', icon: require('./assets/venti.png') },
  { id: 6, name: '360 View Camera', icon: require('./assets/camera.png') },
];

const drivingFeatures = [
  { id: 7, name: 'Keyless Entry', icon: require('./assets/airbag.png') },
  { id: 8, name: 'Spacious Interiors', icon: require('./assets/venti.png') },
  { id: 9, name: 'Parking Assist', icon: require('./assets/parking.png') },
  { id: 10, name: 'Voice Control', icon: require('./assets/voice.png') },
  { id: 11, name: 'Repair', icon: require('./assets/repair.png') },
  { id: 12, name: 'Power Steering', icon: require('./assets/powerString.png') },
];

const entertainmentFeatures = [
  { id: 13, name: 'Music System', icon: require('./assets/music.png') },
  { id: 14, name: 'Wifi Connect', icon: require('./assets/wifi.png') },
];

const CarFormScreen = () => {
  const [description, setDescription] = useState(
    'Hey there,\nThis car is my Swift and it’s absolutely the best. You won’t find comfort in any other car than my Swift.'
  );
  const [fastag, setFastag] = useState('Yes');
  const [delivery, setDelivery] = useState('Yes');
  const [selected, setSelected] = useState<number[]>([]);
  const currentStep = 4; // Car Image step
  const maxLength = 200;

    const navigation = useNavigation();

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderFeatureGrid = (title: string, features: any[]) => (
    <View style={{ marginTop: 25 }}>
      <Text style={styles.sectionSubTitle}>{title}</Text>
      <View style={styles.grid}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[styles.card, selected.includes(feature.id) && styles.selectedCard]}
            onPress={() => toggleSelect(feature.id)}>
            <Image source={feature.icon} style={styles.icon} />
            <Text style={styles.cardText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <Image source={require('./assets/back.png')} style={styles.iconSmall} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => console.log('Save & Exit pressed')}>
          <Text style={styles.saveText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Step Progress Bar */}
        <View style={styles.stepCard}>
          <View style={styles.stepContainer}>
            {steps.map((label, index) => {
              const isCompleted = index < currentStep - 1;
              const isActive = index === currentStep - 1;

              return (
                <View key={index} style={styles.stepItem}>
                  <Text
                    style={[
                      styles.stepLabel,
                      (isCompleted || isActive) && styles.stepLabelActive,
                    ]}>
                    {label}
                  </Text>
                  <View style={styles.stepRow}>
                    <View
                      style={[
                        styles.stepIconContainer,
                        isActive && styles.stepIconContainer,
                        isCompleted && styles.completedStepIconContainer,
                      ]}>
                      <Image
                        source={require('./assets/Icon.png')}
                      />
                    </View>

                    {index < steps.length - 1 && (
                      <View
                        style={[
                          styles.stepLine,
                          {
                            backgroundColor:
                              index < currentStep - 1 ? '#7A3EFF' : '#E8E8F8',
                          },
                        ]}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Description */}
        <Text style={styles.title}>Add car description & features</Text>
        <Text style={styles.label}>Tell us about your car</Text>
        <View style={styles.textBox}>
          <TextInput
            style={styles.input}
            multiline
            maxLength={maxLength}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <Text style={styles.counterText}>
          {description.length}/{maxLength}
        </Text>

        {/* FASTag */}
        <Text style={styles.labelBelow}>FASTag Enabled</Text>
        <View style={styles.radioRow}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => setFastag(option)}>
              <View style={[styles.radioCircle, fastag === option && styles.radioSelected]}>
                {fastag === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery */}
        <Text style={styles.labelBelow}>Do you offer home delivery services?</Text>
        <View style={styles.radioRow}>
          {['Yes', 'No'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => setDelivery(option)}>
              <View
                style={[styles.radioCircle, delivery === option && styles.radioSelected]}>
                {delivery === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <Text style={styles.label1}>Select Car Features</Text>
        <Text style={styles.label2}>Choose maximum 10 car features</Text>

        {renderFeatureGrid('SAFETY', safetyFeatures)}
        {renderFeatureGrid('DRIVING', drivingFeatures)}
        {renderFeatureGrid('ENTERTAINMENT', entertainmentFeatures)}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('SubmissionSuccess' as never)}>
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarFormScreen;

// ===================== STYLES =====================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconSmall: { width: 28, height: 28 },
  saveButton: {
    backgroundColor: '#7A3EFF',
    width: 110,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '600', fontSize: 13 },

  container: { paddingHorizontal: 20 },

  // Step Progress
  stepCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EDECF3',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: { alignItems: 'center', flex: 1 },
  stepRow: { flexDirection: 'row', alignItems: 'center' },

  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
   
  },

  stepIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  stepLine: {
    height: 3,
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 2,
  },
  stepLabel: { fontSize: 12, color: '#777', marginBottom: 6 },
  stepLabelActive: { color: '#000', fontWeight: '600' },

  title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 11 },
  sectionSubTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 8 },
  textBox: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    padding: 11,
    height: 130,
    marginBottom: 5,
  },
  input: { fontSize: 13, color: '#000', textAlignVertical: 'top', flex: 1 },
  counterText: { color: '#A0A0A0', fontSize: 12, textAlign: 'left' },

  labelBelow: { fontSize: 13, fontWeight: '500', color: '#111', marginTop: 15 },
  radioRow: { flexDirection: 'row', marginVertical: 8 },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 25 },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: '#8B5CF6' },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  radioLabel: { marginLeft: 8, fontSize: 14, color: '#111' },

  label1: { marginTop: 20, fontSize: 15, fontWeight: '600', color: '#111' },
  label2: { color: 'grey', fontSize: 13 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: { borderColor: '#7A3EFF' },
  icon: { width: 30, height: 30, marginBottom: 6 },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },

  continueButton: {
    backgroundColor: '#7A3EFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 1,
  },
});