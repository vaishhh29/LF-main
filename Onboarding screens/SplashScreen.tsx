import React, { useEffect, useRef } from 'react';
import {
  View,
  // Image,
  StyleSheet,
  Dimensions, 
  StatusBar,
  Animated, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window'); 

// ✅ Local navigation type (no circular import issues)
type RootStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
  OTP: undefined;
};

type SplashNavProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // animation opacity

  useEffect(() => {
    // Fade in logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Navigate after 3s
    const timer = setTimeout(() => {
      navigation.replace('SignUp');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Animated.Image
        source={require('./assets/logo.png')} // ✅ make sure logo path is correct
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.55,
    height: 80,
  },
});

export default SplashScreen;
