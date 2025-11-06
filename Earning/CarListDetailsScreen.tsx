import React, { useState, useEffect, useRef } from 'react';
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
  FlatList,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';


// Constants
const tabs = ['ID Proof', 'Car image', 'Car details'];
const CAR_MODELS = [
  'Ford Mustang',
  'Honda Civic',
  'Toyota Camry',
  'Tesla Model 3',
  'BMW 3 Series',
  'Mercedes C-Class',
  'Audi A4',
  'Hyundai Elantra',
  'Maruti Swift',
  'Tata Nexon',
];
const CAR_BRANDS = [
  'Ford', 'Honda', 'Toyota', 'Tesla', 'BMW',
  'Mercedes', 'Audi', 'Hyundai', 'Maruti', 'Tata',
];
const YEARS = [
  '2024', '2023', '2022', '2021', '2020',
  '2019', '2018', '2017', '2016', '2015',
];
const COLORS = [
  'White', 'Black', 'Silver', 'Gray', 'Red',
  'Blue', 'Green', 'Yellow', 'Orange', 'Brown',
];
const KM_OPTIONS = [1000, 2000, 4000, 6000, 8000];
const LICENSE_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;

// Types
interface DropdownModalProps {
  visible: boolean;
  data: string[];
  title: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const CarListDetailsScreen: React.FC = () => {
  const navigation = useNavigation();

  // State
  const [activeTab, setActiveTab] = useState(0); // Set to 0 for "ID Proof"
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [rcBookImage, setRcBookImage] = useState<string | null>(null);
  const [carModel, setCarModel] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [yearOfRegistration, setYearOfRegistration] = useState('');
  const [carColor, setCarColor] = useState('');
  const [kilometers, setKilometers] = useState(1000);
  const [showTooltip, setShowTooltip] = useState(false);

  // Dropdown states
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  // Animation
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Effects
  useEffect(() => {
    loadRcBookImage();
  }, []);

  useEffect(() => {
    // Animate label opacity when kilometers change
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [kilometers]);

  // AsyncStorage operations
  const loadRcBookImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('rcBookImage');
      if (savedImage) {
        setRcBookImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading RC book image:', error);
    }
  };

  const saveRcBookImage = async (imageUri: string) => {
    try {
      await AsyncStorage.setItem('rcBookImage', imageUri);
    } catch (error) {
      console.error('Error saving RC book image:', error);
    }
  };

  // Validation
  const validateLicenseNumber = (text: string) => {
    setLicenseNumber(text);
    if (text && !LICENSE_REGEX.test(text.toUpperCase())) {
      setLicenseError('License number is incorrect');
    } else {
      setLicenseError('');
    }
  };

  const validateForm = (): boolean => {
    if (!licenseNumber.trim()) {
      Alert.alert('Error', 'Please enter car license number');
      return false;
    }
    if (licenseError) {
      Alert.alert('Error', 'Please enter a valid license number');
      return false;
    }
    if (!rcBookImage) {
      Alert.alert('Error', 'Please upload RC book image');
      return false;
    }
    if (!carModel) {
      Alert.alert('Error', 'Please select car model');
      return false;
    }
    if (!carBrand) {
      Alert.alert('Error', 'Please select car brand');
      return false;
    }
    if (!yearOfRegistration) {
      Alert.alert('Error', 'Please select year of registration');
      return false;
    }
    return true;
  };

  // Handlers
  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo' as const,
      maxWidth: 1500,
      maxHeight: 1500,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
        Alert.alert('Error', 'Failed to upload image. Please try again.');
      } else if (response.assets?.[0]?.uri) {
        const imageUri = response.assets[0].uri;
        setRcBookImage(imageUri);
        saveRcBookImage(imageUri);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
    });
  };

  const handleContinue = () => {
    if (validateForm()) {
      console.log('Form data:', {
        licenseNumber,
        carModel,
        carBrand,
        yearOfRegistration,
        carColor,
        kilometers,
      });
      navigation.navigate('CarDetail' as never);
    }
  };

  const handleSaveAndExit = async () => {
    try {
      await AsyncStorage.setItem('draftFormData', JSON.stringify({
        licenseNumber,
        carModel,
        carBrand,
        yearOfRegistration,
        carColor,
        kilometers,
      }));
      Alert.alert('Success', 'Your progress has been saved', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('Error saving form data:', error);
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  // Render Components
  const DropdownModal: React.FC<DropdownModalProps> = ({
    visible,
    data,
    onSelect,
    onClose,
    title
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.dropdownOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndExit}
        >
          <Text style={styles.saveButtonText}>SAVE & EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation Stepper - Updated Design */}
      <View style={styles.tabContainer}>
        {tabs.map((label, index) => (
          <React.Fragment key={index}>
            <View style={styles.tabItem}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.tabTextActive,
                ]}
              >
                {label}
              </Text>

              <View
                style={[
                  styles.tabCircle,
                  activeTab === index && styles.tabCircleActive,
                  activeTab > index && styles.tabCircleCompleted,
                ]}
              >
                {activeTab > index ? (
                  <Image source={require('./assets/tick1.png')} style={styles.tickIcon} />
                ) : activeTab === index ? (
                  <View style={styles.tabDot} />
                ) : (
                  <View style={styles.tabEmptyInner} />
                )}
              </View>
            </View>

            {index < tabs.length - 1 && (
              <View
                style={[
                  styles.tabLine,
                  activeTab > index && styles.tabLineActive,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Car License Number */}
        <Text style={styles.label}>Car License Number *</Text>
        <TextInput
          style={[styles.input, licenseError && styles.inputError]}
          placeholder="Enter"
          placeholderTextColor="#9CA3AF"
          value={licenseNumber}
          onChangeText={validateLicenseNumber}
          autoCapitalize="characters"
          maxLength={13}
        />
        <View style={styles.hintRow}>
          <Text style={[styles.hintText, licenseError && styles.errorText]}>
            {licenseError || 'Please enter in "DL04AN1234" format'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.whyText}>Why?</Text>
          </TouchableOpacity>
        </View>

        {/* RC Book Upload */}
        <Text style={styles.label}>RC book *</Text>
        <TouchableOpacity
          style={styles.uploadCard}
          onPress={handleImageUpload}
          activeOpacity={0.7}
        >
          {rcBookImage ? (
            <View style={styles.uploadedImageContainer}>
              <Image
                source={{ uri: rcBookImage }}
                style={styles.uploadedImage}
                resizeMode="cover"
              />
              {showTooltip && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    We will automatically fetch your car details based on license number
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <>
              <View style={styles.uploadCardIconContainer}>
                <Image
                  source={require('./assets/upload2.png')}
                  style={styles.uploadCardIcon}
                />
              </View>
              <Text style={styles.uploadCardText}>Click to Upload Front Side of Card</Text>
              <Text style={styles.uploadCardSize}>(Max. File size: 25 MB)</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Car Model and Brand */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Car Model</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowModelDropdown(true)}
            >
              <Text style={[styles.selectText, !carModel && styles.selectPlaceholder]}>
                {carModel || 'Select'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Car Brand</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowBrandDropdown(true)}
            >
              <Text style={[styles.selectText, !carBrand && styles.selectPlaceholder]}>
                {carBrand || 'Select'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Year of Registration and Car Color */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Year of registration</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowYearDropdown(true)}
            >
              <Text style={[styles.selectText, !yearOfRegistration && styles.selectPlaceholder]}>
                {yearOfRegistration || 'Select'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Car color</Text>
            <TouchableOpacity
              style={styles.selectContainer}
              onPress={() => setShowColorDropdown(true)}
            >
              <Text style={[styles.selectText, !carColor && styles.selectPlaceholder]}>
                {carColor || 'Select'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Kilometers Slider */}
        <Text style={styles.label}>Car kilometers driven</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.kmLabels}>
            {KM_OPTIONS.map((km) => (
              <Animated.Text
                key={km}
                style={[
                  styles.kmLabel,
                  {
                    opacity: fadeAnim,
                    fontWeight: kilometers === km ? '700' : '500',
                    color: kilometers === km ? '#7C3AED' : '#374151',
                  },
                ]}
              >
                {km}km{km >= 2000 ? 's' : ''}
              </Animated.Text>
            ))}
          </View>

          <View style={styles.gradientSliderContainer}>
            {/* Gradient Background */}
            <LinearGradient
              colors={['#7C3AED', '#B794F4', '#E9D5FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientTrack}
            />

            {/* White Dots */}
            <View style={styles.dotsContainer}>
              {KM_OPTIONS.map((_, index) => (
                <View key={index} style={styles.dot} />
              ))}
            </View>

            {/* Interactive Slider */}
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={8000}
              step={2000}
              value={kilometers}
              onValueChange={setKilometers}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="#1335cdff"
              renderThumbComponent={() => (
                <LinearGradient
                  colors={['#7C3AED', '#B794F4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.thumbOuter}
                >
                  <View style={styles.thumbInner} />
                </LinearGradient>
              )}
            />
          </View>
        </View>

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

      {/* Dropdown Modals */}
      <DropdownModal
        visible={showModelDropdown}
        data={CAR_MODELS}
        title="Select Car Model"
        onSelect={setCarModel}
        onClose={() => setShowModelDropdown(false)}
      />
      <DropdownModal
        visible={showBrandDropdown}
        data={CAR_BRANDS}
        title="Select Car Brand"
        onSelect={setCarBrand}
        onClose={() => setShowBrandDropdown(false)}
      />
      <DropdownModal
        visible={showYearDropdown}
        data={YEARS}
        title="Select Year"
        onSelect={setYearOfRegistration}
        onClose={() => setShowYearDropdown(false)}
      />
      <DropdownModal
        visible={showColorDropdown}
        data={COLORS}
        title="Select Color"
        onSelect={setCarColor}
        onClose={() => setShowColorDropdown(false)}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  saveButton: {
    backgroundColor: '#6C40FF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Updated Tab Stepper Styles
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
    color: '#050505',
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
    backgroundColor: '#896af2',
    borderColor: '#aea0de',
    borderWidth: 0,
  },
  tabDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6C40FF',
  },
  tabEmptyInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  tickIcon: {
    width: 30,
    height: 30,
  },
  tabLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    flex: 1,
    marginHorizontal: -8,
    marginBottom: 8,
  },
  tabLineActive: {
    backgroundColor: '#6C40FF',
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
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  hintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  hintText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  errorText: {
    color: '#EF4444',
  },
  whyText: {
    fontSize: 13,
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 36,
    alignItems: 'center',
    marginBottom: 24,
    minHeight: 200,
    justifyContent: 'center',
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
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 6,
  },
  uploadCardSize: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  uploadedImageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  tooltip: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    maxWidth: 200,
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  selectContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  selectPlaceholder: {
    color: '#9CA3AF',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  sliderContainer: {
    marginBottom: 24,
    marginTop: 8,
  },
  kmLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  kmLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    minWidth: 30,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bottomSpacing: {
    height: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  continueButton: {
    backgroundColor: '#6C40FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    paddingVertical: 16,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  gradientSliderContainer: {
    position: 'relative',
    height: 25,
    justifyContent: 'center',
    marginTop: 15,
  },
  gradientTrack: {
    position: 'absolute',
    height: 15,
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
  },
  dotsContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    opacity: 0.9,
  },
  thumbOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#5910d9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  thumbInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#180303',
  },
});

export default CarListDetailsScreen;