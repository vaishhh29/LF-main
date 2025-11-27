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
  Modal,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#6C40FF';
const INACTIVE_COLOR = '#D9D9D9';
const BORDER_RADIUS = 8;
const PADDING_HORIZONTAL = 20;

// ---------------- BOTTOM SHEET MODAL ----------------
const ImageOptionsModal = ({ visible, onClose, onDelete, onReplace }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={require('./assets/close.png')} style={styles.close} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={onDelete}>
          <Image source={require('./assets/delete.png')} />
          <Text style={styles.modalOptionText}>Delete Photo</Text>
        </TouchableOpacity>

        <View style={styles.modalDivider} />

        <TouchableOpacity style={styles.modalOption} onPress={onReplace}>
          <Image source={require('./assets/camera.png')} />
          <Text style={styles.modalOptionText}>Replace Photo</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

// ---------------- MAIN SCREEN ----------------
const CarDetailListingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();        // <-- ADD THIS LINE


  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const registrationDetails = route.params?.registrationDetails;


  const steps = ['ID Proof', 'Car image', 'Car details'];
  const currentStep = 1;

  const pickImage = (index, useCamera = false) => {
    const picker = useCamera ? launchCamera : launchImageLibrary;

    picker(
      { mediaType: 'photo', quality: 0.8, maxWidth: 1024, maxHeight: 1024 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to pick image');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const updatedImages = [...images];
          updatedImages[index] = response.assets[0].uri;
          setImages(updatedImages);

          if (updatedImages.every((img) => img !== null)) {
            setShowSuccessMessage(true);
          }
        }
      }
    );
  };

  const showImagePickerOptions = (index) => {
    Alert.alert('Upload Image', 'Choose an option', [
      { text: 'Take Photo', onPress: () => pickImage(index, true) },
      { text: 'Choose from Gallery', onPress: () => pickImage(index, false) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleImageBoxPress = (index) => {
    if (images[index]) {
      setSelectedImageIndex(index);
      setModalVisible(true);
    } else {
      showImagePickerOptions(index);
    }
  };

  const handleDeleteImage = () => {
    const updatedImages = [...images];
    updatedImages[selectedImageIndex] = null;
    setImages(updatedImages);
    setShowSuccessMessage(false);
    setModalVisible(false);
    setSelectedImageIndex(null);
  };

  const handleReplaceImage = () => {
    setModalVisible(false);
    showImagePickerOptions(selectedImageIndex);
    setSelectedImageIndex(null);
  };

  const isValid = images.some((img) => img !== null);
  const allImagesUploaded = images.every((img) => img !== null);

  const handleContinue = () => {
  if (!isValid) return;

  navigation.navigate('CarDetailScreen', {
    registrationDetails: registrationDetails,
    carImages: {
      image1: images[0],
      image2: images[1],
      image3: images[2],
      image4: images[3],
      image5: images[4],
      image6: images[5],
    },
  });
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('./assets/back.png')} style={styles.backIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveExitButton}>
            <Text style={styles.saveExitText}>SAVE & EXIT</Text>
          </TouchableOpacity>
        </View>

        {/* Stepper */}
        <View style={styles.tabContainer}>
          {steps.map((label, index) => (
            <React.Fragment key={index}>
              <View style={styles.tabItem}>
                <Text
                  style={[
                    styles.tabText,
                    currentStep === index && styles.tabTextActive,
                  ]}
                >
                  {label}
                </Text>

                <View
                  style={[
                    styles.tabCircle,
                    currentStep === index && styles.tabCircleActive,
                    currentStep > index && styles.tabCircleCompleted,
                  ]}
                >
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
                    currentStep > index && styles.tabLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Header Info */}
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Upload Car Images</Text>
          <Text style={styles.subtitle}>
            {allImagesUploaded
              ? 'All images uploaded successfully.'
              : 'Click to upload car images of your vehicle'}
          </Text>
        </View>

        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {images.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageBox}
              onPress={() => handleImageBoxPress(index)}
              activeOpacity={0.7}
            >
              {img ? (
                <Image source={{ uri: img }} style={styles.uploadedImage} />
              ) : (
                <>
                  {index === 0 ? (
                    <Text style={styles.imageLabel}>Front +</Text>
                  ) : (
                    <Text style={styles.plusSymbol}>+</Text>
                  )}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Message */}
        <View style={styles.uploadSection}>
          {allImagesUploaded && showSuccessMessage ? (
            <>
              <View style={styles.successIconContainer}>
                <Image source={require('./assets/tick1.png')} />
              </View>
              <Text style={styles.successTitle}>You Are Good To Go!</Text>
              <Text style={styles.successSubtitle}>
                All the images are uploaded successfully.
              </Text>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => showImagePickerOptions(0)}>
                <Image
                  source={require('./assets/upload.png')}
                  style={styles.uploadIcon}
                />
              </TouchableOpacity>
              <Text style={styles.uploadInstructionBold}>Upload the images of your car</Text>
              <Text style={styles.uploadInstructionSmall}>
                Take all photos in landscape mode for better results.
              </Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isValid ? PRIMARY_COLOR : INACTIVE_COLOR },
          ]}
          disabled={!isValid}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <ImageOptionsModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedImageIndex(null);
        }}
        onDelete={handleDeleteImage}
        onReplace={handleReplaceImage}
      />
    </SafeAreaView>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingBottom: 120 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
  backButton: { padding: 5 },
  backIcon: { width: 24, height: 24, tintColor: '#000' },

  saveExitButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS,
  },
  saveExitText: { color: '#FFF', fontWeight: '600' },

  // Stepper
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
  tabText: { fontSize: 12, color: '#555', marginBottom: 6 },
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

  // Header section text
  contentHeader: { paddingHorizontal: PADDING_HORIZONTAL, marginTop: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 14, color: '#777', marginTop: 6 },

  // Images
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING_HORIZONTAL,
    marginTop: 25,
  },
  imageBox: {
    width: (width - PADDING_HORIZONTAL * 2 - 16) / 3,
    height: (width - PADDING_HORIZONTAL * 2 - 16) / 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  uploadedImage: { width: '100%', height: '100%', borderRadius: 10 },
  imageLabel: { fontSize: 16, fontWeight: '700', color: '#000' },
  plusSymbol: { fontSize: 26, fontWeight: '700', color: '#000' },

  uploadSection: { alignItems: 'center', marginTop: 40 },
  uploadIcon: { width: 60, height: 60, marginBottom: 10 },

  uploadInstructionBold: { fontSize: 16, fontWeight: '600', color: '#000' },
  uploadInstructionSmall: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },

  successIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  successTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  successSubtitle: { fontSize: 14, color: '#777', marginTop: 4 },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: PADDING_HORIZONTAL,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: { position: 'absolute', right: 20, top: 15 },
  close: { width: 18, height: 18 },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  modalOptionText: { fontSize: 16, marginLeft: 10 },
  modalDivider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
});

export default CarDetailListingScreen;
