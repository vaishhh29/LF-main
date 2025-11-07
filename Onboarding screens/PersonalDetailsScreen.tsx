import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const PersonalDetailsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);

  // Location Modal States
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationData, setLocationData] = useState({
    fullAddress: '',
    location: '',
    landmark: '',
    plotNo: '',
    latitude: 12.9716,
    longitude: 77.5946,
  });
  const mapRef = useRef(null);

  const tabs = ['Personal', 'ID Proof', 'Car Images', 'Car details'];

  // Sample location suggestions
  const locationSuggestions = [
    { name: 'Diamond District, Domlur', subtitle: 'Bengaluru, Karnataka, India' },
    { name: 'Diamond District Office Building, Domlur', subtitle: 'Bengaluru, Karnataka, India' },
    { name: 'Anna Nagar', subtitle: 'Chennai, Tamil Nadu, India' },
    { name: 'Indiranagar', subtitle: 'Bengaluru, Karnataka, India' },
  ];

  const filteredLocations = locationSuggestions.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    navigation.navigate('UploadRegistration');
  };

  const handleAddLocation = () => {
    setLocationModalVisible(true);
    setShowLocationForm(false);
    setShowMapView(false);
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          ...locationData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleLocationSelect = (location) => {
    setLocationData({
      ...locationData,
      fullAddress: location.name + ', ' + location.subtitle,
      location: location.name,
    });
    setShowLocationForm(true);
    setShowMapView(false);
  };

  const handleUseMapLocation = () => {
    setShowMapView(true);
    setShowLocationForm(false);
  };

  const handleMapPinDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocationData({
      ...locationData,
      latitude,
      longitude,
    });
  };

  const handleConfirmMapLocation = () => {
    setShowMapView(false);
    setShowLocationForm(true);
  };

  const handleConfirmLocation = () => {
    setLocationModalVisible(false);
  };

  const handleCloseLocationModal = () => {
    setLocationModalVisible(false);
    setShowLocationForm(false);
    setShowMapView(false);
  };

  const handleEditLocation = () => {
    setLocationModalVisible(true);
    setShowLocationForm(true);
    setShowMapView(false);
  };

  // Image Picker Functions
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePicker = async (type) => {
    console.log('Image picker triggered for:', type);
    
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Gallery',
          onPress: () => launchImagePicker(type),
        },
        {
          text: 'Camera',
          onPress: () => launchCameraPicker(type),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const launchImagePicker = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      console.log('Image Picker Response:', response);
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to pick image: ' + response.error);
      } else if (response.assets && response.assets[0]) {
        const image = response.assets[0];
        handleImageSelection(type, image);
      }
    });
  };

  const launchCameraPicker = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      saveToPhotos: true,
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      console.log('Camera Response:', response);
      
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
        Alert.alert('Error', 'Failed to capture image: ' + response.error);
      } else if (response.assets && response.assets[0]) {
        const image = response.assets[0];
        handleImageSelection(type, image);
      }
    });
  };

  const handleImageSelection = (type, image) => {
    const fileSize = image.fileSize || 0;
    const maxSize = type === 'profile' ? 5 * 1024 * 1024 : 25 * 1024 * 1024;

    if (fileSize > maxSize) {
      Alert.alert(
        'File Too Large',
        type === 'profile' 
          ? 'Please select an image smaller than 5MB'
          : 'Please select an image smaller than 25MB'
      );
      return;
    }

    console.log('Image selected:', image);
    
    switch (type) {
      case 'profile':
        setProfilePicture(image);
        break;
      case 'front':
        setFrontSideImage(image);
        break;
      case 'back':
        setBackSideImage(image);
        break;
      default:
        break;
    }
  };

  const renderUploadSection = (type, image, description, maxSizeText) => {
    const hasImage = image !== null;
    
    return (
      <TouchableOpacity 
        style={[
          type === 'profile' ? styles.uploadBox : styles.uploadCard,
          hasImage && styles.uploadContainerWithImage
        ]}
        onPress={() => {
          console.log('Upload section pressed:', type);
          handleImagePicker(type);
        }}
        activeOpacity={0.7}
      >
        {hasImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image 
              source={{ uri: image.uri }} 
              style={styles.previewImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.changeImageText}>Change Image</Text>
            </View>
          </View>
        ) : (
          <>
            <View style={type === 'profile' ? styles.uploadIconContainer : styles.uploadCardIconContainer}>
              <Text style={styles.uploadPlaceholderText}>+</Text>
            </View>
            <Text style={type === 'profile' ? styles.uploadText : styles.uploadCardText}>
              {description}
            </Text>
            <Text style={styles.uploadCardSize}>{maxSizeText}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation Stepper */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <View style={styles.tabItem}>
              <Text style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive
              ]} numberOfLines={1}>
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
            {index < tabs.length - 1 && (
              <View style={[
                styles.tabLine,
                activeTab > index && styles.tabLineActive
              ]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Personal Details Section */}
        <Text style={styles.sectionTitle}>Personal details</Text>
        <Text style={styles.sectionSubtitle}>Enter your basic details to proceed further</Text>

        {/* Name Fields */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>First name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter"
              placeholderTextColor="#9CA3AF"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter"
              placeholderTextColor="#9CA3AF"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          {['Male', 'Female', 'Others'].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.radioItem}
              onPress={() => setGender(g)}
            >
              <View style={[
                styles.radioOuter,
                gender === g && styles.radioOuterActive,
              ]}>
                {gender === g && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date of Birth */}
        <Text style={styles.label}>Date of birth*</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/yyyy"
          placeholderTextColor="#9CA3AF"
          value={dob}
          onChangeText={setDob}
        />

        {/* Contact */}
        <Text style={styles.label}>Contact*</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter mobile number"
            placeholderTextColor="#9CA3AF"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Id</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email ID"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Upload Picture */}
        <Text style={styles.label}>Upload your picture</Text>
        {renderUploadSection(
          'profile', 
          profilePicture, 
          'File format png, jpg of size up to 5MB', 
          '(Max. File size: 5 MB)'
        )}

        {/* Add Location */}
        <Text style={styles.sectionTitle}>Add your current location</Text>
        {locationData.fullAddress ? (
          <View style={styles.locationDisplayCard}>
            <View style={styles.locationDisplayContent}>
              <Text style={styles.locationIcon}>📍</Text>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationDisplayText} numberOfLines={1}>
                  {locationData.fullAddress}
                </Text>
                {(locationData.landmark || locationData.plotNo) && (
                  <Text style={styles.locationSubtext} numberOfLines={1}>
                    {[locationData.landmark, locationData.plotNo].filter(Boolean).join(' • ')}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={handleEditLocation}>
              <Text style={styles.editLocationText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addLocationButton}
            onPress={handleAddLocation}
          >
            <Text style={styles.addLocationIcon}>+</Text>
            <Text style={styles.addLocationText}>Add location</Text>
          </TouchableOpacity>
        )}

        {/* Aadhar Card Section */}
        <Text style={styles.sectionTitle}>Aadhar Card</Text>
        <Text style={styles.sectionSubtitle}>Upload your Aadhar for your ID proof</Text>

        <Text style={styles.label}>Aadhar Card Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter aadhar card number"
          placeholderTextColor="#9CA3AF"
          value={aadharNumber}
          onChangeText={setAadharNumber}
          keyboardType="number-pad"
          maxLength={12}
        />

        {/* Front Side Upload */}
        <Text style={styles.label}>Front Side of Card*</Text>
        {renderUploadSection(
          'front', 
          frontSideImage, 
          'Click to Upload Front Side of Card', 
          '(Max. File size: 25 MB)'
        )}

        {/* Back Side Upload */}
        <Text style={styles.label}>Back Side of Card*</Text>
        {renderUploadSection(
          'back', 
          backSideImage, 
          'Click to Upload Back Side of Card', 
          '(Max. File size: 25 MB)'
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      {/* Location Bottom Sheet Modal */}
      <Modal
        visible={locationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseLocationModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCloseLocationModal}
          />
          <View style={styles.locationBottomSheet}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseLocationModal}
            >
              <View style={styles.closeIconCircle}>
                <Text style={styles.closeIconText}>×</Text>
              </View>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {showMapView ? (
                <>
                  {/* Map View */}
                  <Text style={styles.modalTitle}>Select Location</Text>
                  <Text style={styles.mapInstructionText}>Move pin to exact parking location</Text>

                  <View style={styles.mapContainer}>
                    <MapView
                      ref={mapRef}
                      style={styles.map}
                      initialRegion={{
                        latitude: locationData.latitude,
                        longitude: locationData.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: locationData.latitude,
                          longitude: locationData.longitude,
                        }}
                        draggable
                        onDragEnd={handleMapPinDragEnd}
                      >
                        <View style={styles.customMarker}>
                          <View style={styles.markerPin} />
                        </View>
                      </Marker>
                    </MapView>

                    {/* Current Location Button */}
                    <TouchableOpacity
                      style={styles.currentLocationButton}
                      onPress={getCurrentLocation}
                    >
                      <Text style={styles.targetIcon}>📍</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Address Display */}
                  <View style={styles.addressDisplayBox}>
                    <Text style={styles.addressDisplayText} numberOfLines={2}>
                      {locationData.fullAddress || 'Bengaluru · Diamond District, Domlur...'}
                    </Text>
                    <TouchableOpacity onPress={() => setShowMapView(false)}>
                      <Text style={styles.editAddressText}>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Confirm Location Button */}
                  <TouchableOpacity
                    style={styles.modalConfirmButton}
                    onPress={handleConfirmMapLocation}
                  >
                    <Text style={styles.modalConfirmButtonText}>CONFIRM LOCATION</Text>
                  </TouchableOpacity>
                </>
              ) : !showLocationForm ? (
                <>
                  {/* Search Location */}
                  <Text style={styles.modalTitle}>Search Location</Text>

                  <TextInput
                    style={styles.searchInput}
                    placeholder="Indiranagar"
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />

                  {/* Use Current Location Button */}
                  <TouchableOpacity
                    style={styles.useMapButton}
                    onPress={handleUseMapLocation}
                  >
                    <Text style={styles.useMapIcon}>📍</Text>
                    <Text style={styles.useMapText}>Use map to select location</Text>
                  </TouchableOpacity>

                  {/* Location Suggestions */}
                  <View style={styles.locationList}>
                    {filteredLocations.map((location, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.locationItem}
                        onPress={() => handleLocationSelect(location)}
                      >
                        <View>
                          <Text style={styles.locationItemName}>{location.name}</Text>
                          <Text style={styles.locationItemSubtitle}>{location.subtitle}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : (
                <>
                  {/* Location Details Form */}
                  <Text style={styles.modalTitle}>Add your current location</Text>
                  <Text style={styles.modalSubtitle}>Enter your basic details to proceed further</Text>

                  <Text style={styles.formLabel}>Location *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Anna Nagar"
                    placeholderTextColor="#9CA3AF"
                    value={locationData.location}
                    onChangeText={(text) => setLocationData({ ...locationData, location: text })}
                  />

                  <Text style={styles.formLabel}>Landmark</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Landmark"
                    placeholderTextColor="#9CA3AF"
                    value={locationData.landmark}
                    onChangeText={(text) => setLocationData({ ...locationData, landmark: text })}
                  />

                  <Text style={styles.formLabel}>Plot no./Block/Parking Slot no.</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Plot no./Block/Parking Slot no."
                    placeholderTextColor="#9CA3AF"
                    value={locationData.plotNo}
                    onChangeText={(text) => setLocationData({ ...locationData, plotNo: text })}
                  />
                </>
              )}

              {/* Confirm Button */}
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmLocation}
              >
                <Text style={styles.modalConfirmButtonText}>CONFIRM LOCATION</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

// Keep all the same styles from the previous code, but use this simplified version:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  backButton: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
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
    paddingHorizontal: 4,
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
    marginHorizontal: -16,
    marginTop: 20,
  },
  tabLineActive: {
    backgroundColor: '#7C3AED',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 28,
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#7C3AED',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C3AED',
  },
  radioLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 13,
    paddingRight: 16,
    fontSize: 14,
    color: '#000',
  },
  // Upload Styles
  uploadBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 48,
    alignItems: 'center',
    marginBottom: 28,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 36,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadContainerWithImage: {
    padding: 0,
    overflow: 'hidden',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadCardIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  uploadPlaceholderText: {
    fontSize: 24,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  uploadText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  uploadCardText: {
    fontSize: 15,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  uploadCardSize: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  // Image Preview Styles
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 28,
    gap: 8,
  },
  addLocationIcon: {
    fontSize: 22,
    color: '#7C3AED',
    fontWeight: '400',
    marginTop: -2,
  },
  addLocationText: {
    fontSize: 15,
    color: '#7C3AED',
    fontWeight: '600',
  },
  locationDisplayCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    borderRadius: 8,
    padding: 14,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationDisplayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationDisplayText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  editLocationText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  locationBottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
    maxHeight: '75%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    fontSize: 28,
    color: '#374151',
    fontWeight: '300',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 18,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
    marginBottom: 20,
  },
  locationList: {
    marginBottom: 20,
  },
  locationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  locationItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  locationItemSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  formLabel: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '500',
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
  },
  modalConfirmButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  modalConfirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  // Map Styles
  mapContainer: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    alignItems: 'center',
  },
  markerPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  targetIcon: {
    fontSize: 20,
  },
  mapInstructionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  addressDisplayBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addressDisplayText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    marginRight: 12,
  },
  editAddressText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  useMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20,
    gap: 8,
  },
  useMapIcon: {
    fontSize: 20,
  },
  useMapText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
});

export default PersonalDetailsScreen;