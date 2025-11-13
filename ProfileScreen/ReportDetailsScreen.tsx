import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';

const ReportDetailsScreen = ({ navigation, route }) => {
  const { selectedMethod } = route.params || {};
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!details.trim()) {
      Alert.alert('Please add a short description before submitting.');
      return;
    }

    Alert.alert(
      'Report Submitted',
      `Report Type: ${selectedMethod}\n\nDetails: ${details}`,
      [{ text: 'OK', onPress: () => navigation.popToTop() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./assets/chevron-left.png')} style={styles.iconBack} /> 
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Please tell us more</Text>

        {/* Text input area */}
        <TextInput
          style={styles.textArea}
          placeholder="Max. 150 characters"
          placeholderTextColor="#9CA3AF"
          value={details}
          onChangeText={setDetails}
          multiline
          maxLength={150}
        />

        {/* Submit button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            details.trim() ? styles.activeButton : styles.disabledButton,
          ]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { marginRight: 16 },
  iconBack: { width: 24, height: 24 },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 24,
  },

  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#000',
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
  },

  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: '#7C3AED', // Purple active
  },

  disabledButton: {
    backgroundColor: '#C4B5FD', // Light purple when empty
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportDetailsScreen;
