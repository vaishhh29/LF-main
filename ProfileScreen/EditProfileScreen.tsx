import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: { name: string; phone: string; image: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditProfileScreen'>;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const { name: initialName, phone: initialPhone, image: initialImage } = route.params;

  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [image, setImage] = useState(initialImage);

  const handleSave = () => {
    console.log('Updated Profile:', { name, phone, image });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('./assets/back.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Image */}
        <TouchableOpacity style={styles.imageWrapper}>
          <Image source={image} style={styles.profileImage} />
          <View style={styles.cameraButton}>
            <Image source={require('./assets/camera.png')} style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Rubika"
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile no.</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 454584..."
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              placeholder="rubika@gmail.com"
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 8,
  },
  backButton: {
    padding: 11,
  },
  backIcon: {
    width: 23,
    height: 25,
    tintColor: '#000',
    
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 10,
  },

  // Main content
  content: { flex: 1, alignItems: 'center', padding: 24, marginTop:5 },

  // Profile image section
  imageWrapper: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 36,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cameraIcon: { width: 18, height: 18, tintColor: '#6B7280' },

  // Form fields
  form: { width: '100%' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 15, color: '#262422', marginBottom: 8, fontWeight: '400' },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#ABABAB',
    backgroundColor: '#FFF',
  },

  // Save button
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
