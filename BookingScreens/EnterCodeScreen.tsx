import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EnterCodeScreen = () => {
  const navigation = useNavigation();

  // Store 4-digit code
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle text input for each box
  const handleCodeChange = (text, index) => {
    if (text.length > 1) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto move to next field
    if (text && index < 3) inputRefs.current[index + 1].focus();

    // Auto blur on last input
    if (index === 3 && text) inputRefs.current[index].blur();
  };

  // When pressing "Start Ride"
  const handleStartRide = () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 4) {
      alert("Please enter the complete 4-digit code");
      return;
    }
    console.log("Code entered:", enteredCode);
    navigation.navigate("EndTripScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Enter Code</Text>
          <Text style={styles.subtitle}>
            Please ask your renter to provide the ride code to start the ride.
            This ensures security and confirms the booking.
          </Text>

          {/* 4-digit Input Boxes */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={[
                  styles.codeInput,
                  digit ? styles.codeInputActive : null,
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                returnKeyType="next"
              />
            ))}
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartRide}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>Start Ride</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 60,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
    color: "#000",
    backgroundColor: "#FFF",
  },
  codeInputActive: {
    borderColor: "#6D38E8",
    shadowColor: "#6D38E8",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: "#6D38E8",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
