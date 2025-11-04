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
} from 'react-native';

const ReportMethodsScreen = ({ navigation, route }) => {
  const { reportType } = route.params || {};

  const methods = [
    'Fake details / False documents',
    'Misusing discounts/offers',
    'Attempted theft',
  ];

  const handleMethodPress = (method) => {
    Alert.alert(
      'Report Submitted',
      `You have reported: ${method}`,
      [
        { text: 'OK', onPress: () => navigation.popToTop() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

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

      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Methods under particular report</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.pageTitle}>What do you want to report?</Text>

        <View style={styles.methodsContainer}>
          {methods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.methodItem}
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
  methodsContainer: { gap: 12 },
  methodItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, marginBottom: 12 },
  methodText: { fontSize: 15, color: '#000', flex: 1 },
  chevron: { fontSize: 20, color: '#9CA3AF' },
});

export default ReportMethodsScreen;
