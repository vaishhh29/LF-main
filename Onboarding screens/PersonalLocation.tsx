import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  
  // Location Modal States
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationDetails, setLocationDetails] = useState({
    location: '',
    landmark: '',
    plotNo: '',
  });

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
    navigation.navigate('UploadRegistration' as never);
  };

  const handleAddLocation = () => {
    setLocationModalVisible(true);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationDetails({ ...locationDetails, location });
  };

  const handleConfirmLocation = () => {
    setLocationModalVisible(false);
  };

  const handleCloseLocationModal = () => {
    setLocationModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.backIcon} />
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
              ]}>
                {tab}
              </Text>
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
        <Text style={styles.sectionSubtitle}>Enter your basic details to proceed furthur</Text>

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
        <TouchableOpacity style={styles.uploadBox}>
          <View style={styles.uploadIconContainer}>
            <Image source={require('./assets/upload.png')} style={styles.uploadIcon} />
          </View>
          <Text style={styles.uploadText}>File format png, jpg of size up to 5MB</Text>
        </TouchableOpacity>

        {/* Add Location */}
        <Text style={styles.sectionTitle}>Add your current location</Text>
        {selectedLocation ? (
          <View style={styles.locationDisplayCard}>
            <View style={styles.locationDisplayContent}>
              <Image source={require('./assets/location.png')} style={styles.locationIcon} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationDisplayText}>{locationDetails.location}</Text>
                {locationDetails.landmark && (
                  <Text style={styles.locationSubtext}>{locationDetails.landmark}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => setLocationModalVisible(true)}>
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
        <TouchableOpacity style={styles.uploadCard}>
          <View style={styles.uploadCardIconContainer}>
            <Image source={require('./assets/upload.png')} style={styles.uploadCardIcon} />
          </View>
          <Text style={styles.uploadCardText}>Click to Upload Front Side of Card</Text>
          <Text style={styles.uploadCardSize}>(Max. File size: 25 MB)</Text>
        </TouchableOpacity>

        {/* Back Side Upload */}
        <Text style={styles.label}>Back Side of Card*</Text>
        <TouchableOpacity style={styles.uploadCard}>
          <View style={styles.uploadCardIconContainer}>
            <Image source={require('./assets/upload.png')} style={styles.uploadCardIcon} />
          </View>
          <Text style={styles.uploadCardText}>Click to Upload Back Side of Card</Text>
          <Text style={styles.uploadCardSize}>(Max. File size: 25 MB)</Text>
        </TouchableOpacity>

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

      {/* Location Modal */}
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
          <View style={styles.locationModalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseLocationModal}
            >
              <Image source={require('./assets/close.png')} style={styles.closeIcon} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Search Location</Text>

            {/* Search Input */}
            <TextInput
              style={styles.searchInput}
              placeholder="Indiranagar"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Location Suggestions */}
            <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
              {filteredLocations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(location.name)}
                >
                  <View style={styles.locationItemContent}>
                    <Text style={styles.locationItemName}>{location.name}</Text>
                    <Text style={styles.locationItemSubtitle}>{location.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Location Details Form */}
            {selectedLocation && (
              <View style={styles.locationDetailsForm}>
                <Text style={styles.formSectionTitle}>Add your current location</Text>
                <Text style={styles.formSectionSubtitle}>Enter your basic details to proceed furthur</Text>

                <Text style={styles.formLabel}>Location *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Anna Nagar"
                  placeholderTextColor="#9CA3AF"
                  value={locationDetails.location}
                  onChangeText={(text) => setLocationDetails({ ...locationDetails, location: text })}
                />

                <Text style={styles.formLabel}>Landmark</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Landmark"
                  placeholderTextColor="#9CA3AF"
                  value={locationDetails.landmark}
                  onChangeText={(text) => setLocationDetails({ ...locationDetails, landmark: text })}
                />

                <Text style={styles.formLabel}>Plot no./Block/Parking Slot no.</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Plot no./Block/Parking Slot no."
                  placeholderTextColor="#9CA3AF"
                  value={locationDetails.plotNo}
                  onChangeText={(text) => setLocationDetails({ ...locationDetails, plotNo: text })}
                />
              </View>
            )}

            {/* Confirm Button */}
            <TouchableOpacity 
              style={styles.modalConfirmButton}
              onPress={handleConfirmLocation}
            >
              <Text style={styles.modalConfirmButtonText}>CONFIRM LOCATION</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

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
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 10,
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    flex: 1,
    marginHorizontal: -8,
    marginBottom: 8,
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
    marginBottom: 4,
    marginTop: 8,
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
  uploadBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 48,
    alignItems: 'center',
    marginBottom: 28,
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
  uploadIcon: {
    width: 28,
    height: 28,
    tintColor: '#7C3AED',
  },
  uploadText: {
    fontSize: 13,
    color: '#6B7280',
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
  uploadCardIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  uploadCardIcon: {
    width: 24,
    height: 24,
    tintColor: '#7C3AED',
  },
  uploadCardText: {
    fontSize: 15,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 6,
  },
  uploadCardSize: {
    fontSize: 13,
    color: '#9CA3AF',
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
  // Location Display Card
  locationDisplayCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
    borderRadius: 8,
    padding: 16,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationDisplayContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: '#7C3AED',
    marginRight: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationDisplayText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 13,
    color: '#6B7280',
  },
  editLocationText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
  },
  // Location Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  locationModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    tintColor: '#374151',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
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
    maxHeight: 200,
    marginBottom: 20,
  },
  locationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  locationItemContent: {
    flex: 1,
  },
  locationItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  locationItemSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  locationDetailsForm: {
    marginBottom: 20,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  formSectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
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
  },
  modalConfirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});

export default PersonalDetailsScreen;