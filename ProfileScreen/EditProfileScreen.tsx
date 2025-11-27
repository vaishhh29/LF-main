import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform, // <-- Import Platform for path handling
} from "react-native";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";

// Define Types
type ImageSource = { uri: string } | number;
const DEFAULT_USER_IMAGE = require("./assets/user.png");

type RootStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: {
    name?: string;
    phone?: string;
    email?: string;
    image?: string; // Expecting the URL string from Firestore
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "EditProfileScreen">;
type EditProfileRouteProp = RouteProp<RootStackParamList, "EditProfileScreen">;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditProfileRouteProp>();

  const {
    name: initialName,
    phone: initialPhone,
    email: initialEmail,
    image: initialImage,
  } = route.params || {};

  /**
   * Helper to clean the URI (remove query params)
   */
  const getCleanUri = (uri: string | undefined): string => {
    if (typeof uri === "string") {
      return uri.split("?")[0];
    }
    return "";
  };

  // State Initialization
  const initialImageUri = getCleanUri(initialImage);

  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState(initialPhone || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<ImageSource>(
    initialImageUri ? { uri: initialImageUri } : DEFAULT_USER_IMAGE
  );

  /* -----------------------------
    PICK IMAGE (Gallery)
  ------------------------------ */
  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 1, quality: 0.8 },
      (response) => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          if (response.errorMessage) console.warn("Picker Error:", response.errorMessage);
          return;
        }
        if (response.assets?.[0]?.uri) {
          setImage({ uri: response.assets[0].uri });
        }
      }
    );
  };

  /* -----------------------------
    UPLOAD TO FIREBASE STORAGE
  ------------------------------ */
  const uploadImageToStorage = async (localUri: string): Promise<string> => {
    const user = auth().currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }

    try {
      let cleanedUri = getCleanUri(localUri);

      // 🔥 CRITICAL FIX FOR UPLOAD (Ensures absolute path is correct)
      // Removes 'file://' scheme for compatibility with putFile across iOS/Android
      if (cleanedUri.startsWith('file://')) {
          cleanedUri = cleanedUri.replace('file://', '');
      }
      
      console.log("✅ Cleaned URI before upload:", cleanedUri);
      
      const timestamp = Date.now();
      const filename = `profile_${timestamp}.jpg`;
      const storagePath = `users/${user.uid}/profile/${filename}`;

      const storageRef = storage().ref(storagePath);
      
      // Attempt the upload with the cleaned URI
      await storageRef.putFile(cleanedUri);

      const downloadUrl = await storageRef.getDownloadURL();
      return downloadUrl;

    } catch (err: any) {
      console.error("❌ Upload error:", err);
      // Re-throw specific errors for better user feedback
      if (err.code === "storage/unauthorized") {
        throw new Error("Permission denied. Check Firebase Storage rules.");
      } else if (err.code === "storage/object-not-found") {
        // Explicitly warn about path/permission issues causing the error
        throw new Error("File not found or inaccessible (storage/object-not-found). Check Android permissions or URI format.");
      } else {
        throw new Error(err.message || "Failed to upload image");
      }
    }
  };

  /* -----------------------------
    SAVE TO FIRESTORE HELPER
  ------------------------------ */
  const saveToFirestore = async (userId: string, imageUrl: string) => {
    // Robust name parsing: split by one or more spaces
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const profileData = {
      personalDetails: {
        firstName: firstName,
        lastName: lastName,
        contact: phone.trim() || "",
        email: email.trim() || "",
        profilepic: imageUrl,
      },
    };

    // Save to structure: users/{userId}/cars/car1
    await firestore()
      .collection("users")
      .doc(userId)
      .collection("cars")
      .doc("car1")
      .set(profileData, { merge: true });

    Alert.alert("Success", "Profile updated successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  /* -----------------------------
        HANDLE SAVE
  ------------------------------ */
  const handleSave = async () => {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    setUploading(true);

    let finalImageUrl = initialImageUri; // Keep existing image by default

    try {
      // Determine the URI of the currently selected image
      const currentImageUri = getCleanUri(typeof image === "object" && 'uri' in image ? image.uri : undefined);
      
      // Check if a NEW image was selected (i.e., the URI is valid and different from the initial one)
      const hasNewImage = !!currentImageUri && currentImageUri !== initialImageUri;

      if (hasNewImage) {
        // Upload the new image and get the public URL
        const uploadedUrl = await uploadImageToStorage(currentImageUri);
        finalImageUrl = uploadedUrl;
      }

      // Proceed to save all details to Firestore
      await saveToFirestore(user.uid, finalImageUrl);

    } catch (err: any) {
      console.error("❌ Save error:", err);

      // Offer to save text details even if image upload failed
      if (err.message && (err.message.includes("upload") || err.message.includes("not-found")) && hasNewImage) {
        Alert.alert(
          "Upload Failed",
          err.message + "\n\nSave profile without updating the image?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Save Anyway",
              onPress: async () => {
                setUploading(true);
                try {
                  // Save using the original image URL
                  await saveToFirestore(user.uid, initialImageUri); 
                } catch (e) {
                  Alert.alert("Error", "Failed to save text details.");
                } finally {
                  setUploading(false);
                }
              },
            },
          ]
        );
      } else {
        // General error
        Alert.alert("Error", err.message || "Failed to update profile.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          disabled={uploading}
        >
          <Image
            source={require("./assets/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Image */}
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={pickImage}
          disabled={uploading}
        >
          {/* Ensure the image source is correctly rendered */}
          <Image source={typeof image === 'number' ? image : { uri: image.uri }} style={styles.profileImage} />

          <View style={styles.cameraButton}>
            <Image
              source={require("./assets/camera.png")}
              style={styles.cameraIcon}
            />
          </View>
        </TouchableOpacity>

        {/* Upload Progress */}
        {uploading && (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="small" color="#7C3AED" />
            <Text style={styles.uploadingText}>Processing...</Text>
          </View>
        )}

        {/* FORM */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              editable={!uploading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile No.</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+91 9876543210"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              editable={!uploading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              editable={!uploading}
            />
          </View>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[styles.saveButton, uploading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={uploading}
        >
          {uploading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#FFF" />
              <Text style={styles.saveText}>Saving...</Text>
            </View>
          ) : (
            <Text style={styles.saveText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 8,
  },
  backButton: { padding: 11 },
  backIcon: { width: 23, height: 25, tintColor: "#000" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 10,
  },

  content: { flex: 1, alignItems: "center", padding: 24, marginTop: 5 },

  imageWrapper: {
    position: "relative",
    marginTop: 20,
    marginBottom: 36,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cameraIcon: { width: 18, height: 18, tintColor: "#6B7280" },

  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  uploadingText: {
    marginLeft: 8,
    color: "#7C3AED",
    fontSize: 14,
  },

  form: { width: "100%" },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 15, color: "#262422", marginBottom: 8 },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#FFF",
  },

  saveButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: "#A78BFA",
    opacity: 0.7,
  },
  saveText: { color: "#FFF", fontSize: 16, fontWeight: "600" },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});