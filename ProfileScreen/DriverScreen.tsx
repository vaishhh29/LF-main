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

const DriverScreen = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Profile page</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <View style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Ranga raya reddy</Text>
              <Text style={styles.phoneNumber}>+91 9823478053</Text>
            </View>
          </View>
          <Text style={styles.memberSince}>Members since july 2017</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>27</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Confirmed email</Text>
            <Text style={styles.checkMark}>✔</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Confirmed phone number</Text>
            <Text style={styles.checkMark}>✔</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trips taken so far</Text>
            <Text style={styles.detailValue}>16</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate('ReportItems')}
        >
          <Text style={styles.alertIcon}>⚠️</Text>
          <Text style={styles.reportText}>Report This member</Text>
        </TouchableOpacity>
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
  userCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 24 },
  userHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F97316', marginRight: 12 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 2 },
  phoneNumber: { fontSize: 14, color: '#6B7280' },
  memberSince: { fontSize: 14, color: '#6B7280' },
  detailsContainer: { marginBottom: 32 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  detailLabel: { fontSize: 14, color: '#6B7280' },
  detailValue: { fontSize: 14, fontWeight: '500', color: '#000' },
  checkMark: { fontSize: 18, color: '#3B82F6' },
  reportButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginTop: 32, gap: 8 },
  alertIcon: { fontSize: 20 },
  reportText: { fontSize: 16, fontWeight: '500', color: '#DC2626', marginLeft: 8 },
});

export default DriverScreen;
