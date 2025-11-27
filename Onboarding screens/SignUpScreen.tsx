import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import BottomErrorModal from '../components/BottomErrorModal';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

type SignUpNavProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpNavProp>();

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const showError = (msg: string) => {
    setErrorMessage(msg);
    setErrorVisible(true);
  };

  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '603452160187-9gf1gmh4d7076np8r6bra3d0a54i1to2.apps.googleusercontent.com', 
      offlineAccess: true,
    });
        console.log('Google Sign-In ready ✔');

  }, []);

  //  GOOGLE SIGN IN FLOW
  const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Step 1: Sign in Google UI
    const googleUser = await GoogleSignin.signIn();

    // Step 2: Get Firebase-Compatible Token
    const { idToken } = await GoogleSignin.getTokens();

    if (!idToken) {
      return showError("Google token missing, please try again.");
    }

    // Step 3: Create Firebase Credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Step 4: Firebase Sign In
    const result = await auth().signInWithCredential(googleCredential);

    console.log("🔥 Firebase Auth Success:", result.user.uid);

    // Step 5: Save User to Firestore
    await firestore().collection("users").doc(result.user.uid).set({
      name: result.user.displayName || "",
      email: result.user.email || "",
      photoURL: result.user.photoURL || "",
      provider: "google",
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // Step 6: Navigate
    navigation.navigate("HostRegistration", { screen: "BecomeHost" });

  } catch (error) {
    console.log("🔥 GOOGLE ERROR:", error);
    showError("Google Sign-In failed. Please try again.");
  }
};



  // -------------------- PHONE OTP --------------------
  const handleSignUp = async () => {
    if (!phone.trim()) return showError('Please enter your phone number.');
    if (phone.replace(/\D/g, '').length < 10)
      return showError('Enter a valid 10-digit phone number.');

    const formattedPhone = `${countryCode}${phone.replace(/^0+/, '')}`;

    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      navigation.navigate('OTPScreen', {
        verificationId: confirmation.verificationId,
        phoneNumber: formattedPhone,
      });
    } catch (err) {
      console.log(err);
      showError('Failed to send OTP. Try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome To <Text style={styles.highlight}>Lea-Flexi</Text>
        </Text>
        <Text style={styles.subtitle}>List your car. Earn with ease.</Text>

        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryBox}>
            <Text style={styles.countryText}>{countryCode}</Text>
            <Svg width={18} height={18} viewBox="0 0 24 24">
              <Path
                d="M5 9l7 7 7-7"
                stroke="#666"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </TouchableOpacity>

          <TextInput
            style={styles.phoneInput}
            placeholder="Enter Phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Svg width={24} height={24} viewBox="0 0 48 48">
            <Path fill="#EA4335" d="M24 9.5c3.54 0 6.33 1.46 8.27 2.69l6.15-6.15C34.65 2.41 29.69 0 24 0 14.64 0 6.48 5.68 2.69 13.87l7.5 5.84C12.2 13.17 17.55 9.5 24 9.5z" />
            <Path fill="#34A853" d="M46.13 24.54c0-1.58-.13-3.09-.37-4.54H24v8.59h12.5c-.54 2.89-2.16 5.34-4.59 6.98l7.02 5.46c4.1-3.78 6.47-9.36 6.47-16.49z" />
            <Path fill="#FBBC05" d="M10.19 28.29a14.41 14.41 0 0 1 0-8.58l-7.5-5.84A24.01 24.01 0 0 0 0 24c0 3.91.94 7.61 2.69 10.87l7.5-5.84z" />
            <Path fill="#4285F4" d="M24 48c6.48 0 11.91-2.15 15.88-5.87l-7.02-5.46c-2.02 1.36-4.6 2.16-7.76 2.16-6.45 0-11.8-3.67-14.81-9.21l-7.5 5.84C6.48 42.32 14.64 48 24 48z" />
          </Svg>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.bottomText}>
            Already a member? <Text style={styles.links}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing, you agree to Lea-Flexi’s <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <BottomErrorModal visible={errorVisible} message={errorMessage} onClose={() => setErrorVisible(false)} />
    </ScrollView>
  );
};

export default SignUpScreen;

/* ---- Styles REMAIN UNCHANGED ---- */
const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40, backgroundColor: '#fff', paddingHorizontal: 20 },
  content: { flex: 1 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#000' },
  highlight: { color: '#7C5CFC' },
  subtitle: { textAlign: 'center', fontSize: 14, color: '#999', marginBottom: 60 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  countryBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E5E5', backgroundColor: '#fff', paddingHorizontal: 14, height: 56, width: 80, borderRadius: 12, marginRight: 12, justifyContent: 'center' },
  countryText: { fontSize: 16, fontWeight: '500', color: '#000', marginRight: 5 },
  phoneInput: { flex: 1, borderWidth: 1.5, borderColor: '#E5E5E5', height: 56, borderRadius: 12, paddingHorizontal: 14, fontSize: 16, color: '#000', backgroundColor: '#fff' },
  button: { backgroundColor: '#7149E1', borderRadius: 12, padding: 16, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  line: { height: 1, backgroundColor: '#E5E5E5', width: 80, marginHorizontal: 10 },
  orText: { color: '#999', fontSize: 15 },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#E5E5E5', borderRadius: 12, paddingVertical: 14, backgroundColor: '#fff', marginBottom: 40 },
  googleText: { fontSize: 15, fontWeight: '500', color: '#000', marginLeft: 10 },
  bottomText: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 10, marginBottom: 25 },
  links: { color: '#7149E1', fontWeight: '600', textDecorationLine: 'underline' },
  link: { color: '#3B3B3B', fontWeight: '600', textDecorationLine: 'underline' },
  terms: { textAlign: 'center', color: '#909090', fontSize: 14, lineHeight: 22, marginTop: 150 }
});
