import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const ReportItemsScreen = ({ navigation }) => {
  const reportItems = [
    'Fraudulent or Scam Activity',
    'Unsafe or Inappropriate Behaviour',
    'Damage to Vehicle',
    'Suspicious Payments or Pricing Issues',
    'Something Wrong with Rider/Profile',
  ];

  const handleReportItemPress = (item) => {
    navigation.navigate('ReportMethodsScreen', { reportType: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('./assets/chevron-left.png')} style={styles.iconBack} />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.pageTitle}>What do you want to report?</Text>

        {/* Card Container */}
        <View style={styles.card}>
          {reportItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.reportItem}
                activeOpacity={0.7}
                onPress={() => handleReportItemPress(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {index !== reportItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  iconBack: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  chevron: {
    fontSize: 20,
    color: '#B0B0B0',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 16,
    marginRight: 16,
  },
});

export default ReportItemsScreen;
