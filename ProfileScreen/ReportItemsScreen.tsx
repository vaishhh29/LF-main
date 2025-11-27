import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
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
    navigation.navigate('ReportMethods', { reportType: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>12:30pm</Text>
        <View style={styles.statusIcons}>
          <View style={styles.signalBars}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </View>
          <Text style={styles.icon}>📶</Text>
          <Text style={styles.icon}>🔋</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>report items</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>What do you want to report?</Text>

        <View style={styles.itemsContainer}>
          {reportItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reportItem}
              onPress={() => handleReportItemPress(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.itemText}>{item}</Text>
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
  statusBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 },
  time: { fontSize: 12, fontWeight: '500', color: '#000' },
  statusIcons: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  signalBars: { flexDirection: 'row', gap: 2 },
  bar: { width: 2, height: 8, backgroundColor: '#000', borderRadius: 2 },
  icon: { fontSize: 14 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { marginRight: 16 },
  backArrow: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 24 },
  pageTitle: { fontSize: 20, fontWeight: '600', color: '#000', marginBottom: 24 },
  itemsContainer: { gap: 12 },
  reportItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, marginBottom: 12 },
  itemText: { fontSize: 15, color: '#000', flex: 1 },
  chevron: { fontSize: 20, color: '#9CA3AF' },
});

export default ReportItemsScreen;
