// ProfileScreen.tsx (FINAL — IMAGE FIX + AUTO REFRESH)

import React, { useState, useRef, useEffect } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";

type RootStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: { name: string; phone: string; image: any };
  AppPermissionScreen: undefined;
  NotificationScreen: undefined;
  documents: undefined;
  PrivacyPolicy: undefined;
  SupportChat: undefined;
  Invite: undefined;
  IdProof: { car?: any; personalDetails?: any; carId?: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProfileScreen">;

const MenuItem = ({ icon, title, onPress, showArrow = true, textColor = "#000" }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.menuIcon} />
      </View>
      <Text style={[styles.menuTitle, { color: textColor }]}>{title}</Text>
    </View>

    {showArrow && (
      <Image source={require("./assets/right-arrow.png")} style={styles.arrowIcon} />
    )}
  </TouchableOpacity>
);

/* ------------------------------------------------------- */

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const translateX = useRef(new Animated.Value(22)).current;

  const [userProfile, setUserProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [carDoc, setCarDoc] = useState(null);
  const [loadingCar, setLoadingCar] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const CAR_ID = "car1";

  /* -------------------------------------------------------
     FORCE IMAGE REFRESH (fixes caching)
  --------------------------------------------------------- */
  const cacheBust = `?v=${Date.now()}`;

  /* -------------------------------------------------------
     FETCH PROFILE + CAR DETAILS
  --------------------------------------------------------- */
  const fetchProfile = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const snap = await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("cars")
        .doc(CAR_ID)
        .get();

      if (!snap.exists) return;

      const data = snap.data();
      const p = data?.personalDetails;

      // --------- FIXED IMAGE PRIORITY ----------
      const profileImage =
  p?.profilepic && p.profilepic.trim() !== ""
    ? { uri: p.profilepic + cacheBust }
    : require("./assets/user.png");


      setUserProfile({
        name: p?.firstName ? `${p.firstName} ${p.lastName ?? ""}` : "Unknown",
        phone: p?.contact ?? "",
        image: profileImage,
      });
    } catch (err) {
      console.log("❌ Fetch Profile Error:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchCarDetails = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const snap = await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("cars")
        .doc(CAR_ID)
        .get();

      if (snap.exists) setCarDoc(snap.data());
    } catch (err) {
      console.log("Car fetch error:", err);
    } finally {
      setLoadingCar(false);
    }
  };

  /* -------------------------------------------------------
     REFETCH WHEN SCREEN FOCUSES
  --------------------------------------------------------- */
  useEffect(() => {
    if (isFocused) {
      setLoadingProfile(true);
      setLoadingCar(true);

      fetchProfile();
      fetchCarDetails();
    }
  }, [isFocused]);

  /* -------------------------------------------------------
     CHANGE PROFILE IMAGE
  --------------------------------------------------------- */
  const changeProfileImage = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.7,
      });

      if (result.didCancel || !result.assets?.[0]) return;

      const uri = result.assets[0].uri;
      const fileName = `profile_${Date.now()}.jpg`;

      const storageRef = storage().ref(`users/${user.uid}/profile/${fileName}`);
      await storageRef.putFile(uri);
      const downloadURL = await storageRef.getDownloadURL();

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("cars")
        .doc(CAR_ID)
        .update({
          "personalDetails.profilepic": downloadURL,
        });

      // FORCE REFRESH IN UI
      setUserProfile((prev) => ({
        ...prev,
        image: { uri: downloadURL + "?v=" + Date.now() },
      }));

      Alert.alert("Success", "Profile picture updated!");
    } catch (err) {
      console.log("❌ Image Upload Error:", err);
      Alert.alert("Error", "Unable to update profile image.");
    }
  };

  /* -------------------------------------------------------
     UI
  --------------------------------------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Image source={require("./assets/profile-bg.png")} style={styles.headerBg} />

          <View style={styles.profileInfo}>
            {loadingProfile ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <>
                {/* Image */}
                <View style={styles.imageWrapper}>
                  <Image source={userProfile.image} style={styles.profileImage} />
                  <TouchableOpacity style={styles.cameraButton} onPress={changeProfileImage}>
                    <Image
                      source={require("./assets/camera.png")}
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                </View>

                {/* Name */}
                <TouchableOpacity
                  style={styles.nameWrapper}
                  onPress={() =>
                    navigation.navigate("EditProfileScreen", {
                      name: userProfile.name,
                      phone: userProfile.phone,
                      image: userProfile.image,
                    })
                  }
                >
                  <Text style={styles.name}>{userProfile.name}</Text>
                  <Image source={require("./assets/pen.png")} style={styles.penIcon} />
                </TouchableOpacity>

                <Text style={styles.phone}>{userProfile.phone}</Text>
              </>
            )}
          </View>
        </View>

        {/* WHATSAPP */}
        <View style={styles.whatsappCard}>
          <View style={styles.whatsappLeft}>
            <Image source={require("./assets/whatsapp.png")} style={styles.whatsappIcon} />
            <View>
              <Text style={styles.whatsappTitle}>Get booking info on Whatsapp</Text>
              <Text style={styles.whatsappSubtitle}>
                Receive quick notification on bookings, renter details, etc.
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => setWhatsappEnabled(!whatsappEnabled)}>
            <View style={[styles.toggleContainer, whatsappEnabled && styles.toggleActive]}>
              <Animated.View style={[styles.toggleCircle, { transform: [{ translateX }] }]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ID PROOFS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ID Proofs</Text>
          {loadingCar ? (
            <ActivityIndicator color="#7C3AED" />
          ) : (
            <MenuItem
              icon={require("./assets/privacy.png")}
              title="Documents"
              onPress={() =>
                navigation.navigate("IdProof", {
                  car: carDoc ?? null,
                  personalDetails: carDoc?.personalDetails ?? null,
                  carId: CAR_ID,
                })
              }
            />
          )}
        </View>

        {/* GENERAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <MenuItem
            icon={require("./assets/avatar.png")}
            title="Profile"
            onPress={() =>
              navigation.navigate("EditProfileScreen", {
                name: userProfile?.name ?? "",
                phone: userProfile?.phone ?? "",
                image: userProfile?.image ?? require("./assets/user.png"),
              })
            }
          />

          <MenuItem
            icon={require("./assets/notification.png")}
            title="Notifications"
            onPress={() => navigation.navigate("NotificationScreen")}
          />

          <MenuItem
            icon={require("./assets/shield.png")}
            title="App Permission"
            onPress={() => navigation.navigate("AppPermissionScreen")}
          />

          <MenuItem
            icon={require("./assets/friends.png")}
            title="Invite Friends"
            onPress={() => navigation.navigate("Invite")}
          />
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem
            icon={require("./assets/policy.png")}
            title="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />

          <MenuItem
            icon={require("./assets/help.png")}
            title="Help & Support"
            onPress={() => navigation.navigate("SupportChat")}
          />

          <MenuItem
            icon={require("./assets/logout.png")}
            title="Log out"
            onPress={() => setLogoutModalVisible(true)}
            showArrow={false}
            textColor="#EF4444"
          />
        </View>
      </ScrollView>

      {/* LOGOUT MODAL */}
      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={require("./assets/logout.png")} style={styles.modalIcon} />
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
                onPress={() => auth().signOut()}
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

export default ProfileScreen;

/* ------------------------------------------------------- */
/* STYLES — Unchanged */
/* ------------------------------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerContainer: {
    position: "relative",
    height: 230,
    backgroundColor: "#2F1F5F",
  },
  headerBg: { width: "100%", height: "100%", resizeMode: "cover" },

  profileInfo: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },

  imageWrapper: { position: "relative" },
  profileImage: { width: 80, height: 80, borderRadius: 40 },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  cameraIcon: { width: 16, height: 16, tintColor: "#7C3AED" },

  nameWrapper: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  name: { fontSize: 18, fontWeight: "700", color: "#fff" },
  penIcon: { width: 14, height: 14, tintColor: "#fff", marginLeft: 6 },

  phone: { fontSize: 13, color: "#E5E5E5", marginTop: 4 },

  whatsappCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
    alignItems: "center",
  },
  whatsappLeft: { flexDirection: "row", flex: 1 },
  whatsappIcon: { width: 32, height: 32, marginRight: 12 },

  whatsappTitle: { fontSize: 14, fontWeight: "700", color: "#000" },
  whatsappSubtitle: { fontSize: 12, color: "#666", lineHeight: 16 },

  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: "#D1D5DB",
    padding: 3,
  },
  toggleActive: { backgroundColor: "#7C3AED" },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    elevation: 2,
  },

  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  menuLeft: { flexDirection: "row", alignItems: "center" },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginRight: 12,
  },
  menuIcon: { width: 20, height: 20, resizeMode: "contain" },
  menuTitle: { fontSize: 15, color: "#000" },
  arrowIcon: { width: 16, height: 16, tintColor: "#767676" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },

  modalContent: {
    width: 279,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },

  modalIcon: { width: 40, height: 40, marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalMessage: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },

  modalButtons: { flexDirection: "row", width: "100%", columnGap: 12 },

  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButton: { backgroundColor: "#F3F4F6" },
  cancelButtonText: { color: "#6B7280", fontWeight: "600" },

  logoutButton: { backgroundColor: "#7C3AED" },
  logoutButtonText: { color: "#FFF", fontWeight: "600" },
});
