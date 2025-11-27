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
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Step titles
const steps = ['ID Proof', 'Car image', 'Car details'];

// ===============================
// FEATURE LISTS
// ===============================
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

// MERGE ALL = For saving correct structure
const allFeatures = [
  ...safetyFeatures.map(f => ({ ...f, category: "SAFETY" })),
  ...drivingFeatures.map(f => ({ ...f, category: "DRIVING" })),
  ...entertainmentFeatures.map(f => ({ ...f, category: "ENTERTAINMENT" })),
];


// ==================================
// MAIN COMPONENT
// ==================================
const CarFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const registrationDetails = route.params?.registrationDetails;
  const carImages = route.params?.carImages;

  const [description, setDescription] = useState('');
  const [fastag, setFastag] = useState('Yes');
  const [delivery, setDelivery] = useState('Yes');
  const [selected, setSelected] = useState<number[]>([]);
  const maxLength = 200;

  const currentStep = 2;

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // ==================================
  // SAVE TO FIREBASE (FIXED)
  // ==================================
  const saveFinalCarToFirebase = async () => {
    const user = auth().currentUser;

    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    const uid = user.uid;

    // Convert selected IDs → structured objects
    const selectedFeatureObjects = selected.map(id => {
      const feature = allFeatures.find(f => f.id === id);
      return {
        id,
        name: feature?.name || "",
        category: feature?.category || "",
      };
    });

    try {
      const carDetails = {
        description,
        fastag,
        delivery,
        selectedFeatures: selectedFeatureObjects, // FIXED
        isLocked: true,
        onRent: false,
        bookings: 0,
        earnings: 0,
      };

      const carsRef = firestore()
        .collection("users")
        .doc(uid)
        .collection("cars");

      const snap = await carsRef.get();
      const nextCarNumber = snap.size + 1;
      const carDocId = `car${nextCarNumber}`;

      const finalCarData = {
        registrationDetails,
        carImages,
        carDetails,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await carsRef.doc(carDocId).set(finalCarData);

      Alert.alert("Success", `Car ${nextCarNumber} saved successfully!`, [
        { text: "OK", onPress: () => navigation.navigate("CarListingScreen") }
      ]);

    } catch (error) {
      console.log("SAVE ERROR:", error);
      Alert.alert("Error", "Failed to save car.");
    }
  };

  // RENDER GRID
  const renderGrid = (title, features) => (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionSubTitle}>{title}</Text>
      <View style={styles.grid}>
        {features.map(f => (
          <TouchableOpacity
            key={f.id}
            style={[styles.card, selected.includes(f.id) && styles.selectedCard]}
            onPress={() => toggleSelect(f.id)}
          >
            <Image source={f.icon} style={styles.icon} />
            <Text style={styles.cardText}>{f.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.iconSmall} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Step Progress */}
        <View style={styles.tabContainer}>
          {steps.map((label, index) => (
            <React.Fragment key={index}>
              <View style={styles.tabItem}>
                <Text style={[
                  styles.tabText,
                  currentStep === index && styles.tabTextActive
                ]}>
                  {label}
                </Text>

                <View style={[
                  styles.tabCircle,
                  currentStep === index && styles.tabCircleActive,
                  currentStep > index && styles.tabCircleCompleted
                ]}>
                  {currentStep > index ? (
                    <Image source={require('./assets/tick1.png')} style={styles.tickIcon} />
                  ) : currentStep === index ? (
                    <View style={styles.tabDot} />
                  ) : (
                    <View style={styles.tabEmptyInner} />
                  )}
                </View>
              </View>

              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.tabLine,
                    currentStep > index && styles.tabLineActive
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        <Text style={styles.title}>Add car description & features</Text>

        {/* Description */}
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
          {['Yes', 'No'].map(option => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => setFastag(option)}
            >
              <View style={[styles.radioCircle, fastag === option && styles.radioSelected]}>
                {fastag === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery */}
        <Text style={styles.labelBelow}>Do you offer home delivery?</Text>
        <View style={styles.radioRow}>
          {['Yes', 'No'].map(option => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => setDelivery(option)}
            >
              <View style={[styles.radioCircle, delivery === option && styles.radioSelected]}>
                {delivery === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <Text style={styles.label1}>Select Car Features</Text>
        <Text style={styles.label2}>Choose up to 10</Text>

        {renderGrid('SAFETY', safetyFeatures)}
        {renderGrid('DRIVING', drivingFeatures)}
        {renderGrid('ENTERTAINMENT', entertainmentFeatures)}

        <TouchableOpacity style={styles.continueButton} onPress={saveFinalCarToFirebase}>
          <Text style={styles.continueText}>SAVE CAR</Text>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabItem: { flex: 1, alignItems: 'center' },
  tabText: { fontSize: 10, color: '#555', marginBottom: 6, textAlign: "justify" },
  tabTextActive: { color: '#000', fontWeight: '700' },

  tabCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabCircleActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    borderWidth: 0,
  },
  tabCircleCompleted: {
    backgroundColor: '#7A3EFF',
  },

  tabDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C40FF',
  },
  tabEmptyInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
  },

  tickIcon: { width: 20, height: 20 },

  tabLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: -5,
    marginBottom: 8,
  },
  tabLineActive: {
    backgroundColor: '#6C40FF',
  },

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
