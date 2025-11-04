import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const UpcomingSubmission = ({ navigation }: any) => {
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    }); // Adjust route name
  };

  const handleViewListing = () => {
    navigation.navigate(''); // Adjust route name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Check Icon */}
        <Image
          source={require('./assets/tick.png')} // Replace with your actual image path
          style={styles.image}
          resizeMode="contain"
        />

        {/* Title and message */}
        <Text style={styles.title}>
          You’ve approved this booking request. The customer can now take the
          car from you and start the trip at the scheduled time.
        </Text>
        {/* <Text style={styles.subtitle}>
          Your form is under review. We will get back to you
        </Text> */}

        {/* Image */}
        <Image
          source={require('./assets/approved-car.png')} // Replace with your actual image path
          style={styles.carimage}
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
          <Text style={styles.filledButtonText}>Track Your car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'DM Sans',
    marginBottom: 70,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 24,
  },
  image: {
    width: '70%',
    height: 70,
    marginBottom: 80,
  },
  carimage: {
    width: '250%',
    height: 190,
    marginBottom: 150,
    borderRadius: 24,
  },
  outlinedButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlinedButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
  filledButton: {
    width: '100%',
    backgroundColor: '#7e22ce',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  filledButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpcomingSubmission;
