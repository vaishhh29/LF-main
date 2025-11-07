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
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#6C40FF';
const INACTIVE_COLOR = '#D9D9D9';
const BORDER_RADIUS = 8;
const PADDING_HORIZONTAL = 20;

// ---------------- BOTTOM SHEET MODAL ----------------
const ImageOptionsModal = ({ visible, onClose, onDelete, onReplace }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
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
const CarImageUploadScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([null, null, null, null, null, null]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const TABS = ['Personal', 'ID Proof', 'Car image', 'Car details'];
  const activeTab = 2;

  // Image Picker Options
  const imagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024,
  };

  // Function to pick image from gallery or camera
  const pickImage = (index, useCamera = false) => {
    const picker = useCamera ? launchCamera : launchImageLibrary;

    picker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        const updatedImages = [...images];
        updatedImages[index] = imageUri;
        setImages(updatedImages);

        // Check if all images are uploaded
        if (updatedImages.every((img) => img !== null)) {
          setShowSuccessMessage(true);
        }
      }
    });
  };

  // Show action sheet for camera or gallery
  const showImagePickerOptions = (index) => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => pickImage(index, true),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => pickImage(index, false),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Handle image box press
  const handleImageBoxPress = (index) => {
    if (images[index]) {
      // If image exists, show options modal
      setSelectedImageIndex(index);
      setModalVisible(true);
    } else {
      // If no image, show picker
      showImagePickerOptions(index);
    }
  };

  // Delete image
  const handleDeleteImage = () => {
    if (selectedImageIndex !== null) {
      const updatedImages = [...images];
      updatedImages[selectedImageIndex] = null;
      setImages(updatedImages);
      setShowSuccessMessage(false);
    }
    setModalVisible(false);
    setSelectedImageIndex(null);
  };

  // Replace image
  const handleReplaceImage = () => {
    setModalVisible(false);
    if (selectedImageIndex !== null) {
      showImagePickerOptions(selectedImageIndex);
    }
    setSelectedImageIndex(null);
  };

  const isValid = images.some((img) => img !== null);
  const allImagesUploaded = images.every((img) => img !== null);

  // FIXED: Navigate to EnterCarDetails instead of CarDetails
  const handleContinue = () => {
    if (!isValid) return;
    navigation.navigate('EnterCarDetails' as never);
  };

  // Render Tab Item
  const renderTabItem = (tab: string, index: number) => (
    <React.Fragment key={index}>
      <View style={styles.tabItem}>
        <Text
          style={[
            styles.tabText,
            activeTab === index && styles.tabTextActive
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {tab}
        </Text>
        <View style={styles.circleContainer}>
          <View style={[
            styles.tabCircle,
            activeTab === index && styles.tabCircleActive,
            activeTab > index && styles.tabCircleCompleted
          ]}>
            {activeTab > index ? (
              <Text style={styles.checkmark}>✓</Text>
            ) : activeTab === index ? (
              <View style={styles.tabDot} />
            ) : (
              <View style={styles.tabEmptyInner} />
            )}
          </View>
        </View>
      </View>
      {index < TABS.length - 1 && (
        <View style={[
          styles.tabLine,
          activeTab > index && styles.tabLineActive
        ]} />
      )}
    </React.Fragment>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backIconContainer}>
              <Text style={styles.backIconText}>←</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveExitButton}>
            <Text style={styles.saveExitText}>SAVE & EXIT</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation Stepper */}
        <View style={styles.tabContainer}>
          {TABS.map(renderTabItem)}
        </View>

        {/* Content Header */}
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Upload Car Images</Text>
          <Text style={styles.subtitle}>
            {allImagesUploaded
              ? 'To ensure trust and security on our platform, we require a valid ID proof.'
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
                  {index === 0 && <Text style={styles.imageLabel}>Front +</Text>}
                  {index !== 0 && <Text style={styles.plusSymbol}>+</Text>}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Instruction or Success Message */}
        <View style={styles.uploadSection}>
          {allImagesUploaded && showSuccessMessage ? (
            <>
              <View style={styles.successIconContainer}>
                <Image source={require('./assets/tick1.png')} />
              </View>
              <Text style={styles.successTitle}>You Are good To go.</Text>
              <Text style={styles.successSubtitle}>
                All The Images Are Perfectly Fit Fined.
              </Text>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => showImagePickerOptions(0)}>
                <Image
                  source={require('./assets/upload.png')}
                  style={styles.uploadIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.uploadInstructionBold}>
                Upload the images of your car
              </Text>
              <Text style={styles.uploadInstructionSmall}>
                Take all photos in landscape mode for better looking.
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

      {/* Image Options Modal */}
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
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  container: { 
    paddingBottom: 120 
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 24,
    color: '#000',
  },
  saveExitButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 6,
  },
  close: {
    height: 20,
    width: 20,
  },
  saveExitText: { 
    color: '#FFF', 
    fontWeight: '600', 
    fontSize: 14 
  },

  // Tab Stepper
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: 70,
  },
  circleContainer: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tabText: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  tabCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabCircleActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    borderWidth: 0,
  },
  tabCircleCompleted: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
    borderWidth: 0,
    width: 25,
    height: 25,
    borderRadius: 14,
  },
  tabDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7C3AED',
  },
  tabEmptyInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    flex: 1,
    marginHorizontal: -12,
    marginBottom: 14,
  },
  tabLineActive: {
    backgroundColor: '#7C3AED',
  },

  // Content Header
  contentHeader: { 
    paddingHorizontal: PADDING_HORIZONTAL, 
    marginTop: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#000', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#888', 
    lineHeight: 20 
  },

  // Image Grid
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
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  plusSymbol: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000',
  },

  // Upload Section
  uploadSection: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  uploadIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
    borderRadius: 30,
  },
  uploadInstructionBold: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  uploadInstructionSmall: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  // Success Message
  successIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },

  // Footer
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
  continueButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 15,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
  },
});

export default CarImageUploadScreen;