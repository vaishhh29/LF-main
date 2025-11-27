import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const UpcomingSubmission = ({ navigation }) => {
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }], // main tab route
    });
  };

  const handleViewListing = () => {
    navigation.navigate("UpcomingBookingDetailScreen"); // your tracking screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("./assets/back.png")} // make sure this exists (left arrow)
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Main Content */}
      <View style={styles.content}>
        {/* Check Icon */}
        <Image
          source={require("./assets/tick.png")}
          style={styles.checkIcon}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>
          You’ve approved this booking request. The customer can now take the
          car from you and start the trip at the scheduled time.
        </Text>

        {/* Car Image */}
        <Image
          source={require("./assets/approved-car.png")}
          style={styles.carImage}
          resizeMode="contain"
        />

        {/* Buttons */}
        <TouchableOpacity style={styles.outlinedButton} onPress={handleGoHome}>
          <Text style={styles.outlinedButtonText}>Go to home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filledButton}
          onPress={handleViewListing}
        >
          <Text style={styles.filledButtonText}>Track your car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpcomingSubmission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /** 🔙 Header **/
  header: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: "flex-start",

  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginTop: 20
  },

  /** ✅ Main Content **/
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  checkIcon: {
    width: 80,
    height: 80,
    marginBottom: 30,
    tintColor: "#6D38E8",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#111827",
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 6,
  },
  carImage: {
    width: 260,
    height: 200,
    marginBottom: 60,
  },
  outlinedButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  outlinedButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
  },
  filledButton: {
    width: "100%",
    backgroundColor: "#6D38E8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  filledButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
