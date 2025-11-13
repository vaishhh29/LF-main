import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Image
} from 'react-native';

const ReportMethodsScreen = ({ navigation, route }) => {
  const { reportType } = route.params || {};

  const methods = [
    'Fake details / False documents',
    'Misusing discounts / offers',
    'Attempted theft',
  ];

  const handleMethodPress = (method) => {
     navigation.navigate('ReportDetailsScreen', { selectedMethod: method });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={require('./assets/chevron-left.png')} style={styles.iconBack} /> 
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>What do you want to report?</Text>

        {/* Single Card containing all methods */}
        <View style={styles.card}>
          {methods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.methodRow,
                index !== methods.length - 1 && styles.methodDivider,
              ]}
              onPress={() => handleMethodPress(method)}
              activeOpacity={0.7}
            >
              <Text style={styles.methodText}>{method}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 16 
  },

  backButton: { marginRight: 16 },
  iconBack: { width: 24, height: 24 },

  content: { flex: 1, paddingHorizontal: 16, paddingTop: 24 },

  pageTitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#000', 
    marginBottom: 24, 
    textAlign: 'center' 
  },

  // Card wrapping all methods
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
  },

  // Each row inside the card
  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  // Divider line between rows
  methodDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginLeft: 14, marginRight: 14,
    paddingHorizontal:5
  },

  methodText: { fontSize: 15, color: '#000', flex: 1 },
  chevron: { fontSize: 20, color: '#9CA3AF' },
});

export default ReportMethodsScreen;
