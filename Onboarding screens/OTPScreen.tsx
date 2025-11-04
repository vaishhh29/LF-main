import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import BottomErrorModal from "../components/BottomErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { byPrefixAndName } from "@fortawesome/fontawesome-svg-core/import.macro";
const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { verificationId, phoneNumber } = route.params;

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      return showError("Please enter the complete 6-digit OTP");
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await auth().signInWithCredential(credential);

      await firestore()
        .collection("users")
        .doc(userCredential.user.uid)
        .set(
          {
            phone: userCredential.user.phoneNumber,
            provider: "phone",
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      showError("Welcome! Phone verified successfully.");

      setTimeout(() => {
        navigation.navigate("HostRegistration", { screen: "BecomeHost" });
      }, 1500);
    } catch (error: any) {
      console.error("OTP Verification Error:", error);

      if (error.code === "auth/invalid-verification-code") {
        showError("Invalid OTP. Please check and try again.");
      } else if (error.code === "auth/session-expired") {
        showError("OTP has expired. Please request a new one.");
      } else {
        showError("Verification failed. Please try again.");
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      await auth().signInWithPhoneNumber(phoneNumber);
      showError("OTP resent successfully!");
    } catch (error: any) {
      console.error("Resend OTP Error:", error);
      showError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Simple thin back arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        Please enter the 6-digit OTP sent to {phoneNumber}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(val) => handleOtpChange(val, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendOTP} style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn't receive OTP? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>

      <BottomErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: "25.6%",
  },
  backButton: {
  position: "absolute",
  top: 55,
  left: 20,
  zIndex: 10,
},
backArrow: {
  fontSize: 40,
  color: "#000",
  fontWeight: "200", 
  lineHeight: 40,
},
  title: { 
    fontSize: 25, 
    fontWeight: "700", 
    textAlign: "center",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: { 
    fontSize: 15, 
    textAlign: "center", 
    color: "#666", 
    marginVertical: 10,
    paddingHorizontal: 20,
    lineHeight: 25,
  },
  otpContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginTop: 40,
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 1.2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButton: {
    backgroundColor: "#7149E1",
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
  },
  verifyText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "600", 
    fontSize: 16,
  },
  resendContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  resendText: {
    color: "#666",
    fontSize: 15,
  },
  resendLink: {
    color: "#7149E1",
    fontWeight: "600",
    fontSize: 17,
  },
});

export default OTPScreen;
