import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#6D38E8';
const INACTIVE_COLOR = '#D9D9D9';
const BORDER_RADIUS = 8;
const PADDING_HORIZONTAL = 20; 

// Custom upload icon (replace with your asset path)
const CustomUploadIcon = require('./assets/upload.png');

// ---------------- STEP COMPONENT ----------------
const StepperItem = ({ label, index, currentStep }) => {
  const isActive = index <= currentStep;
  const isComplete = index < currentStep;

  return (
    <View style={styles.stepperItem}>
      <View
        style={[
          styles.stepperIndicator,
          {
            backgroundColor: isComplete ? PRIMARY_COLOR : 'transparent',
            borderColor: isActive ? PRIMARY_COLOR : INACTIVE_COLOR,
            borderWidth: isComplete ? 0 : 2,
          },
        ]}
      >
        {isComplete ? (
          <Feather name="check" size={14} color="#FFF" />
        ) : (
          <View
            style={[
              styles.stepperDot,
              { backgroundColor: isActive ? PRIMARY_COLOR : 'transparent' },
            ]}
          />
        )}
      </View>

      <Text style={[styles.stepperLabel, { color: isActive ? '#000' : '#888' }]}>
        {label}
      </Text>

      {index < 3 && (
        <View style={styles.stepperLineContainer}>
          <View
            style={[styles.stepperLine, { backgroundColor: isActive ? PRIMARY_COLOR : INACTIVE_COLOR }]}
          />
        </View>
      )}
    </View>
  );
};

// ---------------- IMAGE UPLOAD SLOT ----------------
const ImageUploadSlot = ({ label, image, onPress }) => (
  <TouchableOpacity style={styles.uploadSlot} onPress={onPress}>
    {image ? (
      <Image source={{ uri: image }} style={styles.uploadedImage} />
    ) : (
      <>
        <Text style={styles.uploadSlotText}>{label}</Text>
        <Feather name="plus" size={24} color="#888" />
      </>
    )}
  </TouchableOpacity>
);

// ---------------- MAIN SCREEN ----------------
const CarImageUploadScreen = () => {
  const navigation = useNavigation();

  // Store uploaded images
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null, null]);

  const steps = ['Personal', 'ID Proof', 'Car image', 'Car details'];
  const currentStep = 2;

  // Open image picker or mock function
  const handleUpload = (index: number) => {
    // Replace with real image picker logic
    const dummyImage = 'https://via.placeholder.com/150';
    const updatedImages = [...images];
    updatedImages[index] = dummyImage;
    setImages(updatedImages);
  };

  // Enable continue if at least 1 image is uploaded
  const isValid = images.some(img => img !== null);

  const handleContinue = () => {
    if (!isValid) return;
    navigation.navigate('SubmissionSuccess'); // Navigate inside HostRegistrationStack
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveExitButton}>
            <Text style={styles.saveExitText}>SAVE & EXIT</Text>
          </TouchableOpacity>
        </View>

        {/* Stepper */}
        <View style={styles.stepperContainer}>
          {steps.map((label, index) => (
            <StepperItem key={index} label={label} index={index} currentStep={currentStep} />
          ))}
        </View>

        {/* Content Header */}
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Upload Car Images</Text>
          <Text style={styles.subtitle}>
            To ensure trust and security on our platform, we require a valid ID proof.
          </Text>
        </View>

        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {images.map((img, index) => (
            <ImageUploadSlot
              key={index}
              label={index === 0 ? 'Front +' : '+'}
              image={img}
              onPress={() => handleUpload(index)}
            />
          ))}
        </View>

        {/* Upload Instruction */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.blackCircleIcon}>
            <Image
              source={CustomUploadIcon}
              style={{ width: 14, height: 14, tintColor: '#dededeff' }}
            />
          </TouchableOpacity>
          <Text style={styles.uploadInstructionBold}>Upload the images of your car</Text>
          <Text style={styles.uploadInstructionSmall}>
            Take all photos in landscape mode for better results.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: isValid ? PRIMARY_COLOR : INACTIVE_COLOR }]}
          disabled={!isValid}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingBottom: 100 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  backButton: { padding: 5 },
  saveExitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS,
  },
  saveExitText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  // Stepper
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  stepperItem: { flex: 1, alignItems: 'center', maxWidth: width / 4 },
  stepperIndicator: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  stepperDot: { width: 8, height: 8, borderRadius: 4 },
  stepperLabel: { fontSize: 12, marginTop: 5, textAlign: 'center', color: '#000' },
  stepperLineContainer: { position: 'absolute', left: '50%', right: -width * 0.08, top: 10, zIndex: -1 },
  stepperLine: { height: 4, width: '100%', borderRadius: 2, marginLeft: 10 },

  // Content Header
  contentHeader: { paddingHorizontal: PADDING_HORIZONTAL, marginTop: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#888', lineHeight: 20 },

  // Image Grid
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: 30,
  },
  uploadSlot: {
    width: (width - PADDING_HORIZONTAL * 2 - 10) / 3,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: INACTIVE_COLOR,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadedImage: { width: '100%', height: '100%', borderRadius: BORDER_RADIUS },
  uploadSlotText: { position: 'absolute', top: 10, left: 10, fontSize: 16, fontWeight: '500', color: '#000' },

  // Upload Section
  uploadSection: { alignItems: 'center', marginTop: 40 },
  blackCircleIcon: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadInstructionBold: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 5 },
  uploadInstructionSmall: { fontSize: 13, color: '#888', textAlign: 'center', paddingHorizontal: 40 },

  // Footer Continue Button
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

export default CarImageUploadScreen;
