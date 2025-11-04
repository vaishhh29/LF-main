import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: { name: string; phone: string; image: any };
  AppPermissionScreen: undefined;
  NotificationScreen: undefined;
  documents: undefined;
  PrivacyPolicy: undefined;
  SupportChat: undefined;
  Invite: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

interface MenuItemProps {
  icon: any;
  title: string;
  onPress: () => void;
  showArrow?: boolean;
  textColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  onPress,
  showArrow = true,
  textColor = '#000',
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuLeft}>
      <Image source={icon} style={styles.menuIcon} />
      <Text style={[styles.menuTitle, { color: textColor }]}>{title}</Text>
    </View>
    {showArrow && <Text style={styles.arrow}>›</Text>}
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const translateX = useRef(new Animated.Value(whatsappEnabled ? 22 : 0)).current;

  const [userProfile, setUserProfile] = useState({
    name: 'RUBIKA',
    phone: '+91 9361770066',
    image: require('./assets/user.png'),
  });

  // Animate toggle switch
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: whatsappEnabled ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [whatsappEnabled, translateX]);

  const handleLogout = () => setLogoutModalVisible(true);

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    console.log('User logged out');
    // Add your logout logic here
  };

  const navigateTo = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------------------- */}
        {/* Profile Card */}
        {/* ---------------------- */}
        <View style={styles.profileCard}>
          <Image source={require('./assets/profile-bg.png')} style={styles.profileBg} />

          <View style={styles.imageWrapper}>
            <Image source={userProfile.image} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() =>
                navigation.navigate('EditProfileScreen', {
                  name: userProfile.name,
                  phone: userProfile.phone,
                  image: userProfile.image,
                })
              }
            >
              <Image source={require('./assets/camera.png')} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Image source={require('./assets/pen.png')} style={styles.penIcon} />
          </View>

          <Text style={styles.phone}>{userProfile.phone}</Text>
        </View>

        {/* WhatsApp Card */}
        <View style={styles.whatsappCard}>
          <View style={styles.whatsappLeft}>
            <Image
              source={require('./assets/whatsapp.png')}
              style={styles.whatsappIcon}
              resizeMode="contain"
            />
            <View style={styles.whatsappTextContainer}>
              <Text style={styles.whatsappTitle}>Get booking info on WhatsApp</Text>
              <Text style={styles.whatsappSubtitle}>
                Receive quick notifications about car bookings, renter details, and updates.
              </Text>
            </View>
          </View>

          {/* Toggle Switch */}
          <TouchableOpacity onPress={() => setWhatsappEnabled(!whatsappEnabled)} activeOpacity={0.8}>
            <View style={[styles.toggleContainer, whatsappEnabled && styles.toggleActive]}>
              <Animated.View
                style={[styles.toggleCircle, { transform: [{ translateX }] }]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ID Proofs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ID Proofs</Text>
          <MenuItem
            icon={require('./assets/privacy.png')}
            title="Documents"
            onPress={() => navigateTo('documents')}
          />
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <MenuItem
            icon={require('./assets/avatar.png')}
            title="Profile"
            onPress={() =>
              navigation.navigate('EditProfileScreen', {
                name: userProfile.name,
                phone: userProfile.phone,
                image: userProfile.image,
              })
            }
          />
          <MenuItem
            icon={require('./assets/notification.png')}
            title="Notifications"
            onPress={() => navigateTo('NotificationScreen')}
          />
          <MenuItem
            icon={require('./assets/shield.png')}
            title="App Permission"
            onPress={() => navigateTo('AppPermissionScreen')}
          />
          <MenuItem
            icon={require('./assets/friends.png')}
            title="Invite Friends"
            onPress={() => navigateTo('Invite')}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon={require('./assets/privacy.png')}
            title="Privacy Policy"
            onPress={() => navigateTo('PrivacyPolicy')}
          />
          <MenuItem
            icon={require('./assets/help.png')}
            title="Help & Support"
            onPress={() => navigateTo('SupportChat')}
          />
          <MenuItem
            icon={require('./assets/logout.png')}
            title="Log out"
            onPress={handleLogout}
            showArrow={false}
            textColor="#EF4444"
          />
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/logout.png')} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={confirmLogout}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
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
    backgroundColor: '#FFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cameraIcon: {
    width: 18,
    height: 18,
    tintColor: '#7C3AED',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  whatsappCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
   
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  whatsappLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  whatsappIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  whatsappTextContainer: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  whatsappSubtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#D1D5DB',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#7C3AED',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: 'contain',
  },
  menuTitle: {
    fontSize: 15,
    color: '#000',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 279,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#7C3AED',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ProfileScreen;