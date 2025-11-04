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
      <View style={styles.iconWrapper}>
  <Image source={icon} style={styles.menuIcon} />
</View>

      <Text style={[styles.menuTitle, { color: textColor }]}>{title}</Text>
    </View>
    {showArrow && <Image source={require('./assets/right-arrow.png')} style={styles.arrowIcon} />}
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const translateX = useRef(new Animated.Value(whatsappEnabled ? 22 : 0)).current;

  const [userProfile] = useState({
    name: 'RUBIKA',
    phone: '+91 9361770066',
    image: require('./assets/user.png'),
  });

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: whatsappEnabled ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [whatsappEnabled]);

  const handleLogout = () => setLogoutModalVisible(true);
  const confirmLogout = () => {
    setLogoutModalVisible(false);
    console.log('User logged out');
  };

  const navigateTo = (screen: keyof RootStackParamList) => navigation.navigate(screen);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={require('./assets/profile-bg.png')} style={styles.headerBg} />
          <View style={styles.profileInfo}>
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
                }>
                <Image source={require('./assets/camera.png')} style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{userProfile.name}</Text>
              <Image source={require('./assets/pen.png')} style={styles.penIcon} />
            </View>
            <Text style={styles.phone}>{userProfile.phone}</Text>
          </View>
        </View>

        {/* WhatsApp Card */}
        <View style={styles.whatsappCard}>
          <View style={styles.whatsappLeft}>
            <Image source={require('./assets/whatsapp.png')} style={styles.whatsappIcon} />
            <View style={styles.whatsappTextContainer}>
              <Text style={styles.whatsappTitle}>Get booking info on whatsapp</Text>
              <Text style={styles.whatsappSubtitle}>
                Receive quick notification on car bookings, renter details, ongoing, upcoming
                related details on whatsapp
              </Text>
            </View>
          </View>

          {/* Toggle */}
          <TouchableOpacity onPress={() => setWhatsappEnabled(!whatsappEnabled)}>
            <View style={[styles.toggleContainer, whatsappEnabled && styles.toggleActive]}>
              <Animated.View
                style={[styles.toggleCircle, { transform: [{ translateX }] }]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ID Proofs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ID Proofs</Text>
          <MenuItem
            icon={require('./assets/privacy.png')}
            title="Documents"
            onPress={() => navigateTo('documents')}
          />
        </View>

        {/* General */}
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

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon={require('./assets/policy.png')}
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

      {/* Logout Modal */}
      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/logout.png')} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={confirmLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerContainer: { position: 'relative', height: 230,backgroundColor:'#2F1F5F' },
  headerBg: { width: '100%', height: '100%', resizeMode: 'cover' },
  profileInfo: {
    position: 'absolute',
    top: 60,
    width: '100%',
    alignItems: 'center',
  },
  imageWrapper: { position: 'relative' },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  cameraIcon: { width: 16, height: 16, tintColor: '#7C3AED' },
  nameWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  name: { fontSize: 18, fontWeight: '700', color: '#fff' },
  penIcon: { width: 14, height: 14, tintColor: '#fff', marginLeft: 6 },
  phone: { fontSize: 13, color: '#E5E5E5', marginTop: 4 },

  whatsappCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
   
    alignItems: 'center',
  },
  whatsappLeft: { flexDirection: 'row', flex: 1, alignItems: 'flex-start' },
  whatsappIcon: { width: 32, height: 32, marginRight: 12 },
  whatsappTextContainer: { flex: 1 },
  whatsappTitle: { fontSize: 14, fontWeight: '700', color: '#000', marginBottom: 4 },
  whatsappSubtitle: { fontSize: 12, color: '#666', lineHeight: 16 },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#D1D5DB',
    padding: 3,
  },
  toggleActive: { backgroundColor: '#7C3AED' },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    elevation: 2,
  },

  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
 iconWrapper: {
  width: 40,
  height: 40,
  borderRadius: 20, 
  borderWidth: 1,
  borderColor: '#D7D7D7', 
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFF',
  marginRight: 12,
},
menuIcon: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},

  menuTitle: { fontSize: 15, color: '#000' },
  arrowIcon: { width: 16, height: 16, tintColor: '#767676' },

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
  modalIcon: { width: 40, height: 40, marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 8 },
  modalMessage: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', width: '100%', gap: 12 },
  modalButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { backgroundColor: '#F3F4F6' },
  cancelButtonText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  logoutButton: { backgroundColor: '#7C3AED' },
  logoutButtonText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
});

export default ProfileScreen;
