// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   StatusBar,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const EnterCodeScreen = ({}) => {
//   // Default code is "1000"
//   const navigation = useNavigation();
//   const [code, setCode] = useState(['1', '0', '0', '0']);

//   const handleCodeChange = (text, index) => {
//     if (text.length > 1) return;
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);
//   };

//   const handleVehicleHandover = () => {
//     navigation.navigate('EndTripScreen')
//     console.log('Code entered:', code.join(''));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <View style={styles.content}>
//           <Text style={styles.codeTitle}>Enter Code</Text>
//           <Text style={styles.codeDescription}>
//             Please ask your renter to provide the ride code in order to start his ride. This ensures security and confirms the booking.
//           </Text>

//           {/* Code Input */}
//           <View style={styles.codeInputContainer}>
//             {code.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.codeInput}
//                 value={digit}
//                 onChangeText={(text) => handleCodeChange(text, index)}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 selectTextOnFocus
//               />
//             ))}
//           </View>
//         </View>

//         {/* Button fixed at bottom with more spacing */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.handoverButton}
//             onPress={handleVehicleHandover}
//           >
//             <Text style={styles.handoverButtonText}>Start Ride</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F7',
//   },
//   content: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center', // Center vertically
//   },
//   codeTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#000',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   codeDescription: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 40,
//   },
//   codeInputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 16,
//     marginBottom: 60, // More space before button
//   },
//   codeInput: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#E5E7EB',
//     fontSize: 26,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: '#000',
//     backgroundColor: '#FFFFFF',
//   },
//   buttonContainer: {
//     paddingHorizontal: 30,
//     paddingBottom: 40, // Space from bottom
//   },
//   handoverButton: {
//     width: '100%',
//     paddingVertical: 18,
//     borderRadius: 14,
//     backgroundColor: '#6D38E8',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   handoverButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

// export default EnterCodeScreen;


// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   StatusBar,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// /**
//  * EnterCodeScreen
//  * ----------------
//  * This screen allows the renter to input a 4-digit verification code
//  * before starting the ride. Once the code is entered, user navigates
//  * to EndTripScreen (for now).
//  */
// const EnterCodeScreen = () => {
//   const navigation = useNavigation();

//   // Maintain the 4-digit code in an array
//   const [code, setCode] = useState(['1', '0', '0', '0']);

//   // Refs to automatically move focus between inputs
//   const inputRefs = useRef([]);

//   /**
//    * Handle input changes for each digit
//    */
//   const handleCodeChange = (text, index) => {
//     if (text.length > 1) return; // prevent pasting multiple characters

//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     // Move to next input automatically
//     if (text && index < code.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }

//     // If last digit entered, hide keyboard (optional UX improvement)
//     if (index === code.length - 1 && text) {
//       inputRefs.current[index].blur();
//     }
//   };

//   /**
//    * Handle "Start Ride" button press
//    */
//   const handleVehicleHandover = () => {
//     const enteredCode = code.join('');
//     console.log('Code entered:', enteredCode);
//     navigation.navigate('EndTripScreen');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         {/* ---------- Page Content ---------- */}
//         <View style={styles.content}>
//           <Text style={styles.codeTitle}>Enter Code</Text>

//           <Text style={styles.codeDescription}>
//             Please ask your renter to provide the ride code before starting the
//             ride. This ensures security and confirms the booking.
//           </Text>

//           {/* ---------- 4-Digit Code Input ---------- */}
//           <View style={styles.codeInputContainer}>
//             {code.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 style={styles.codeInput}
//                 value={digit}
//                 onChangeText={(text) => handleCodeChange(text, index)}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 selectTextOnFocus
//                 returnKeyType="next"
//               />
//             ))}
//           </View>
//         </View>

//         {/* ---------- Bottom Button ---------- */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.handoverButton}
//             onPress={handleVehicleHandover}
//           >
//             <Text style={styles.handoverButtonText}>Start Ride</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// /**
//  * Styles
//  * ------
//  * Follows consistent spacing and color hierarchy
//  */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F7',
//   },
//   content: {
//     flex: 1,
//     padding: 30,
//     justifyContent: 'center',
//   },
//   codeTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#000',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   codeDescription: {
//     fontSize: 14,
//     color: '#6B7280',
//     textAlign: 'center',
//     lineHeight: 22,
//     marginBottom: 40,
//   },
//   codeInputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 16,
//     marginBottom: 60,
//   },
//   codeInput: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#E5E7EB',
//     fontSize: 26,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: '#000',
//     backgroundColor: '#FFFFFF',
//   },
//   buttonContainer: {
//     paddingHorizontal: 30,
//     paddingBottom: 40,
//   },
//   handoverButton: {
//     width: '100%',
//     paddingVertical: 18,
//     borderRadius: 14,
//     backgroundColor: '#6D38E8',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   handoverButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
// });

// export default EnterCodeScreen;


//##########

import React, { useState } from 'react';
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
} from 'react-native';

const EnterCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['1', '0', '0', '0']);

  const handleCodeChange = (text, index) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleStartRide = () => {
    console.log('Code entered:', code.join(''));
    navigation.navigate('EndTripScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.codeTitle}>Enter Code</Text>
          <Text style={styles.codeDescription}>
            Please ask your renter to provide the ride code to start the ride. This ensures security and confirms the booking.
          </Text>

          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startRideButton} onPress={handleStartRide}>
            <Text style={styles.startRideButtonText}>Start Ride</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F7' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  codeTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  codeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  codeInputContainer: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 60 },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#FFF',
  },
  buttonContainer: { paddingHorizontal: 30, paddingBottom: 40 },
  startRideButton: {
    backgroundColor: '#6D38E8',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  startRideButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default EnterCodeScreen;
