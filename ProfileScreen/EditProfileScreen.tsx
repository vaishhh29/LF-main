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
      <View style={styles.content}>
        {/* Profile Image */}
        <TouchableOpacity style={styles.imageWrapper}>
          <Image source={image} style={styles.profileImage} />
          <View style={styles.editIconContainer}>
            <Image source={require('./assets/user.png')} style={styles.editIcon} />
          </View>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: 20, alignItems: 'center' },
  imageWrapper: { position: 'relative', marginBottom: 24 },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7C3AED',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: { width: 18, height: 18, tintColor: '#FFF' },
  inputGroup: { width: '100%', marginBottom: 16 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  saveText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
