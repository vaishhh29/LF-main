import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const GetBackSoon = () => {
  const navigation = useNavigation();

  // 👉 Go Home Button
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  // 👉 View My Listing Button (WORKING)
  const handleViewListing = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabs",        
          state: {
            routes: [
              {
                name: "Earnings",  
                state: {
                  routes: [
                    { name: "CarListingScreen" } 
                  ]
                }
              }
            ]
          }
        }
      ]
    });
  };

  return (
    <View style={styles.container}>

      {/* Icon */}
      <Image
        source={require('./assets/Group.png')}
        style={styles.checkIcon}
        resizeMode="contain"
      />

      {/* Message */}
      <Text style={styles.text}>
        Thank you for submitting your car details. Your form is under review. We will get back to you.
      </Text>

      {/* Car GIF */}
      <FastImage
        source={require('./assets/car.gif')}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.outlinedButton} onPress={handleGoHome}>
        <Text style={styles.outlinedButtonText}>Go to home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filledButton} onPress={handleViewListing}>
        <Text style={styles.filledButtonText}>View my listing</Text>
      </TouchableOpacity>

    </View>
  );
};

export default GetBackSoon;

// -------------------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  checkIcon: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
    lineHeight: 22,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 70,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  outlinedButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  filledButton: {
    backgroundColor: '#7A3EFF',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  filledButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
