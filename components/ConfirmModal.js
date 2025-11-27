import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmModal = ({ visible, type, onConfirm, onCancel }) => {
  const navigation = useNavigation(); // ✅ add this line

  if (!visible) return null;

  const isApproved = type === 'approved';

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Image
              source={
                isApproved
                  ? require('./assets/check-circle.png')
                  : require('./assets/remove.png')
              }
              style={styles.icon}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.title,
                { color: isApproved ? '#7149E1' : '#FF4C4C' },
              ]}>
              {isApproved ? 'Approved' : 'Declined'}
            </Text>
          </View>

          {/* Message */}
          <Text style={styles.message}>
            Are you sure you want to {isApproved ? 'approve' : 'decline'} the customer booking request?
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.noButton} onPress={onCancel}>
              <Text style={styles.noText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.yesButton, { backgroundColor: '#7149E1' }]}
              onPress={() => {
                onConfirm();
                if (isApproved) {
                  navigation.navigate('UpcomingSubmission'); // ✅ now works
                }
              }}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 34,
    paddingHorizontal: 20,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
  },
  message: {
    textAlign: 'left',
    fontSize: 14,
    color: '#444',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  noButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    marginRight: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  yesButton: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  noText: {
    fontWeight: '600',
    color: '#000',
  },
  yesText: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default ConfirmModal;
