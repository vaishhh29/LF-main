import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export default function IdProofUI() {
  // Hooks MUST stay at top level — SAFE ✔
  const [aadharFront, setAadharFront] = useState(null);
  const [aadharBack, setAadharBack] = useState(null);

  // Reusable picker function
  const pickImage = (setter) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log("Image Picker Error:", response.errorMessage);
          return;
        }

        setter(response.assets[0].uri); // Save selected image
      }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Heading */}
      <Text style={styles.heading}>Add Medias</Text>
      <Text style={styles.subHeading}>
        Upload your visiting cards and catalog
      </Text>

      {/* Aadhar Front */}
      <Text style={styles.sectionTitle}>Aadhar Card Front</Text>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => pickImage(setAadharFront)}
      >
        {aadharFront ? (
          <Image source={{ uri: aadharFront }} style={styles.imageFull} />
        ) : (
          <Text style={styles.plus}>+</Text>
        )}
      </TouchableOpacity>

      {/* Aadhar Back */}
      <Text style={styles.sectionTitle}>Aadhar Card Back</Text>

      <TouchableOpacity
        style={styles.uploadBox}
        onPress={() => pickImage(setAadharBack)}
      >
        {aadharBack ? (
          <Image source={{ uri: aadharBack }} style={styles.imageFull} />
        ) : (
          <Text style={styles.plus}>+</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 8,
  },

  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginTop: 8,
  },

  subHeading: {
    fontSize: 15,
    color: "#6B6B6B",
    marginTop: 4,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginTop: 28,
    marginBottom: 10,
  },

  imageContainer: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  imageFull: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  uploadBox: {
    width: "100%",
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 5,
    overflow: "hidden",
  },

  plus: {
    fontSize: 42,
    color: "#FF6231",
  },
});
