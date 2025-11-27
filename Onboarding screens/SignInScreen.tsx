import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BottomErrorModal from '../components/BottomErrorModal';
import Svg, { Path } from 'react-native-svg';

const { height } = Dimensions.get('window');

type SignInNavProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInNavProp>();
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
      webClientId:
        '603452160187-9gf1gmh4d7076np8r6bra3d0a54i1to2.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  

    const userInfo = await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;

    navigation.navigate('HostRegistration', { screen: 'BecomeHost' });

    if (!idToken) throw new Error("No ID token received from Google");

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userSignIn = await auth().signInWithCredential(googleCredential);

    console.log("Signed in user:", userSignIn.user.displayName);

  } catch (error: any) {
    console.log("Google SignIn Error:", error);
  }
};



  const handleSignIn = async () => {
    if (!phone.trim()) return showError('Please enter your phone number.');
    if (phone.length < 10) return showError('Enter a valid 10-digit phone number.');

    const formattedPhone =
      phone.startsWith('+') || phone.startsWith('00')
        ? phone
        : `${countryCode}${phone.replace(/^0+/, '')}`;

    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      navigation.navigate('OTPScreen', {
        verificationId: confirmation.verificationId,
        phoneNumber: formattedPhone,
      });
    } catch (err: any) {
      console.error('Phone Sign-In Error:', err);
      showError('Failed to send OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome Back To <Text style={styles.highlight}>Lea-Flexi</Text>
        </Text>
        <Text style={styles.subtitle}>List your car.Earn with ease.</Text>

        <View style={[styles.phoneContainer, { gap: 20 }]}>
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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Google Sign-In */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Svg width={24} height={24} viewBox="0 0 48 48">
            <Path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.33 1.46 8.27 2.69l6.15-6.15C34.65 2.41 29.69 0 24 0 14.64 0 6.48 5.68 2.69 13.87l7.5 5.84C12.2 13.17 17.55 9.5 24 9.5z"
            />
            <Path
              fill="#34A853"
              d="M46.13 24.54c0-1.58-.13-3.09-.37-4.54H24v8.59h12.5c-.54 2.89-2.16 5.34-4.59 6.98l7.02 5.46c4.1-3.78 6.47-9.36 6.47-16.49z"
            />
            <Path
              fill="#FBBC05"
              d="M10.19 28.29a14.41 14.41 0 0 1 0-8.58l-7.5-5.84A24.01 24.01 0 0 0 0 24c0 3.91.94 7.61 2.69 10.87l7.5-5.84z"
            />
            <Path
              fill="#4285F4"
              d="M24 48c6.48 0 11.91-2.15 15.88-5.87l-7.02-5.46c-2.02 1.36-4.6 2.16-7.76 2.16-6.45 0-11.8-3.67-14.81-9.21l-7.5 5.84C6.48 42.32 14.64 48 24 48z"
            />
          </Svg>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.bottomText}>
            Don’t have an account? <Text style={styles.links}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.terms}>
          By Continuing you agree to the carbon's{' '}
          <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <BottomErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: height / 8,
  },
  content: {
    flexShrink: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  highlight: {
    color: '#7C5CFC',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginBottom: 80,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    height: 56,
    width: 80,
    gap: 3,
  },
  countryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#fff',
    height: 56,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#7149E1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  line: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: 70,
    marginHorizontal: 10,
  },
  orText: {
    color: '#999',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 45,
    backgroundColor: '#fff',
  },
  googleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginLeft: 10,
  },
  bottomText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 17,
    marginBottom: 20,
  },
  links: {
    color: '#7149E1',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 100
  },
  terms: {
    textAlign: 'center',
    color: '#909090',
    fontSize: 14,
    lineHeight: 25,
    marginTop:19
  },
  link: {
    color: '#3B3B3B',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
