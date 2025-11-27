import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';

// Replace these with your actual assets
const ICONS = {
  back: require('./assets/lock.png'),
  close: require('./assets/close.png'),
  dropdown: require('./assets/down-arrow.png'),
  info: require('./assets/notification.png'),
};

interface UnlockCarModalProps {
  desiredState: boolean; // true = active/unlock, false = inactive/lock
  onConfirm: () => void;
  onClose: () => void;
}

const UnlockCarModal: React.FC<UnlockCarModalProps> = ({
  desiredState,
  onConfirm,
  onClose,
}) => {
  const [extendTiming, setExtendTiming] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('primary');

  // Animated value for pill toggle
  const translateX = useRef(new Animated.Value(extendTiming ? 22 : 0)).current;

  // Animate pill toggle when state changes
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: extendTiming ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [extendTiming]);

  return (
    <Modal
      visible={true}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {desiredState ? 'Unlock your Car' : 'Lock your Car'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={ICONS.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Car Selection */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Select Car</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownPlaceholder}>Hyundai i20 Asta</Text>
                <Image source={ICONS.dropdown} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>

            {/* Charge */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Charge</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownPlaceholder}>₹200/hour</Text>
                <Image source={ICONS.dropdown} style={styles.dropdownIcon} />
              </TouchableOpacity>
            </View>

            {/* Extend Timing - REPLACED SWITCH WITH PILL TOGGLE */}
            <View style={styles.toggleContainer}>
              <View style={styles.toggleLeft}>
                <Text style={styles.toggleLabel}>Extend Car Timing</Text>
                <TouchableOpacity style={styles.infoButton}>
                  <Image source={ICONS.info} style={styles.infoIcon} />
                </TouchableOpacity>
              </View>

              {/* Pill toggle implementation */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setExtendTiming(!extendTiming)}
              >
                <View
                  style={[
                    styles.pillToggleContainer,
                    extendTiming && styles.pillToggleActive,
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.pillToggleCircle,
                      { transform: [{ translateX }] },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Address Section */}
            <View style={styles.addressSection}>
              <Text style={styles.addressTitle}>Select Address</Text>

              {/* Primary Address */}
              <TouchableOpacity
                style={[
                  styles.addressOption,
                  selectedAddress === 'primary' && styles.addressOptionSelected,
                ]}
                onPress={() => setSelectedAddress('primary')}
              >
                <View style={styles.radioButton}>
                  {selectedAddress === 'primary' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressType}>Primary</Text>
                  <Text style={styles.addressText}>Anna Nagar, Chennai</Text>
                </View>
              </TouchableOpacity>

              {/* Secondary Address */}
              <TouchableOpacity
                style={[
                  styles.addressOption,
                  selectedAddress === 'secondary' &&
                    styles.addressOptionSelected,
                ]}
                onPress={() => setSelectedAddress('secondary')}
              >
                <View style={styles.radioButton}>
                  {selectedAddress === 'secondary' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressType}>Secondary</Text>
                  <Text style={styles.addressText}>Anna Nagar, Chennai</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Confirm / Cancel Buttons */}
            {/* Single Full-Width Button */}
            <View style={{ marginVertical: 24 }}>
              <TouchableOpacity
                style={styles.shareCarButton}
                onPress={onConfirm} // You can keep the same confirm action or replace with your own
              >
                <Text style={styles.shareCarButtonText}>
                  Share Car for 3 Days
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: { padding: 4 },
  closeIcon: { width: 24, height: 24, tintColor: '#6B7280' },
  modalContent: { paddingHorizontal: 20, paddingTop: 20 },

  fieldContainer: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownPlaceholder: { fontSize: 14, color: '#9CA3AF' },
  dropdownIcon: { width: 16, height: 16, tintColor: '#6B7280' },

  // Pill Toggle Styles
  pillToggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#d1d5db',
    padding: 3,
    justifyContent: 'center',
  },
  pillToggleActive: {
    backgroundColor: '#9b87f5',
  },
  pillToggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  toggleLabel: { fontSize: 14, fontWeight: '500', color: '#1F2937' },
  infoButton: { padding: 2 },
  infoIcon: { width: 16, height: 16, tintColor: '#9CA3AF' },

  addressSection: { marginBottom: 24 },
  addressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  addressOptionSelected: { borderColor: '#7C3AED', backgroundColor: '#FAF5FF' },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#7C3AED',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7C3AED',
  },
  addressInfo: { flex: 1 },
  addressType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    
  },
  addressText: { fontSize: 14, color: '#6B7280' },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  shareCarButton: {
  width: '100%',
  paddingVertical: 16,
  borderRadius: 12,
  backgroundColor: '#3B82F6', // Blue color for car button
  alignItems: 'center',
    
},
shareCarButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#FFFFFF',
},

});

export default UnlockCarModal;
