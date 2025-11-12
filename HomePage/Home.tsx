import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import UnlockCarModal from './UnlockCarModal';

const screenWidth = Dimensions.get('window').width;

const Home = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [isActive, setIsActive] = useState(false); // actual car status
  const [pendingToggle, setPendingToggle] = useState(false); // for animation

  const translateX = useRef(new Animated.Value(0)).current;

  // Animate toggle when status changes
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isActive ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const chartData = [30, 80, 45, 60, 120, 90, 150];

  const faqItems = [
    {
      id: 1,
      title: 'Earnings & Payments',
      icon: require('./assets/earnings.png'),
      content: 'Information about earnings and payment methods...',
    },
    {
      id: 2,
      title: 'Car Safety',
      icon: require('./assets/car-safety.png'),
      content: 'Safety guidelines and insurance information...',
    },
    {
      id: 3,
      title: 'Car Sharing Convenience',
      icon: require('./assets/car-sharing.png'),
      content: 'How car sharing works and convenience features...',
    },
    {
      id: 4,
      title: 'Policies',
      icon: require('./assets/policy.png'),
      content: 'Terms of service and usage policies...',
    },
  ];

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleTogglePress = () => {
    // Open modal to confirm action
    setPendingToggle(!isActive); // track desired state
    setShowUnlockModal(true);
  };

  // Confirm action from modal
  const handleConfirmToggle = () => {
    setIsActive(pendingToggle); // update actual status
    setShowUnlockModal(false);
  };

  const handleCancelToggle = () => {
    setPendingToggle(false);
    setShowUnlockModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.card}>
          <Image source={require('./img/rupee.png')} style={styles.icon} />
          <View>
            <Text style={styles.label}>Weekly earnings</Text>
            <Text style={styles.amount}>630.10</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.notificationContainer}>
            <TouchableOpacity>
              <Image source={require("./img/bell.png")} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusLeft}>
            <View style={styles.carIconContainer}>
              <Text style={styles.carIcon}>🚗</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text
                style={[
                  styles.statusInactive,
                  { color: isActive ? '#22c55e' : '#ef4444' },
                ]}
              >
                {isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>

          {/* Pill toggle */}
          <TouchableOpacity onPress={handleTogglePress}>
            <View
              style={[styles.toggleContainer, isActive && styles.toggleActive]}
            >
              <Animated.View
                style={[styles.toggleCircle, { transform: [{ translateX }] }]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.carName}>Hyundai i20 Asta</Text>
        <Text style={styles.carSubtext}>
          Your car is currently not listed for car rentals
        </Text>

        <View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>Chennai</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>From:</Text>
            <Text style={styles.detailValue}>01/01/2025</Text>
            <Image
              source={require('./assets/arrow.png')}
              style={{ width: 16, height: 16, marginHorizontal: 4 }}
            />
            <Text style={styles.detailLabel}>To:</Text>
            <Text style={styles.detailValue}>01/04/2025</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <View style={styles.dottedLine} />
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.actionButtons}>
          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.roundButton} onPress={handleTogglePress}>
              <Image
                source={require('./assets/lock.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>Unlock car</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity style={styles.roundButton}>
              <Image
                source={require('./assets/settings.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>My Car Settings</Text>
          </View>
        </View>
      </View>

      {/* Dashboard Stats */}
      <View style={styles.section}>
        <View style={styles.sectionDivider}>
          <View style={styles.dottedLine} />
          <Text style={styles.sectionTitle}>YOUR DASHBOARD</Text>
          <View style={styles.dottedLine} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Earnings ₹0</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Bookings 12</Text>
          </View>
        </View>
      </View>

      {/* Line Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Earnings This Month</Text>
        <LineChart
          data={{
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
            datasets: [{ data: chartData }],
          }}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
            propsForDots: { r: '4', strokeWidth: '2', stroke: '#7c3aed' },
          }}
          bezier
          withDots={false}
          style={{ borderRadius: 12, marginTop: 12 }}
        />
      </View>

      {/* FAQ Section */}
      <View style={{ marginHorizontal: 20, marginTop: 24, marginBottom: 24 }}>
        <Text style={styles.faqHeaderText}>HAVE OTHER QUIRES?</Text>

        {faqItems.map((item) => (
          <View key={item.id} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.accordionItem}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.itemLeft}>
                <View style={styles.iconContainer}>
                  <Image
                    source={item.icon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Image
                source={require('./assets/down-arrow.png')}
                style={[
                  styles.chevron,
                  expandedItem === item.id && { transform: [{ rotate: '180deg' }] },
                ]}
              />
            </TouchableOpacity>

            {expandedItem === item.id && (
              <View style={styles.expandedContent}>
                <Text style={styles.contentText}>{item.content}</Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.questionsLink} activeOpacity={0.7}>
          <Text style={styles.questionsLinkText}>STILL HAVE QUESTIONS</Text>
          <Image
            source={require('./assets/right-arrow.png')}
            style={styles.chevronRight}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Unlock Car Modal */}
      {showUnlockModal && (
        <UnlockCarModal
          onClose={handleCancelToggle}
          onConfirm={handleConfirmToggle}
          desiredState={pendingToggle}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationContainer: { position: 'relative', marginLeft: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: { width: 30, height: 30, marginRight: 20 },
  label: { fontSize: 11, fontWeight: '500' },
  amount: { fontSize: 16, color: '#111827', fontWeight: '600', marginTop: 2 },
  statusCard: {
    backgroundColor: '#f3e8ff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
  },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statusLeft: { flexDirection: 'row', alignItems: 'center' },
  carIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  carIcon: { fontSize: 20 },
  statusLabel: { fontSize: 14, color: '#1f2937' },
  statusInactive: { fontSize: 14, fontWeight: '600' },
  carName: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  carSubtext: { fontSize: 12, color: '#6b7280', marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  detailLabel: { fontSize: 12, color: '#6b7280' },
  detailValue: { fontSize: 12, color: '#1f2937', fontWeight: '600' },

  // Dotted Divider Styles
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dottedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#d1d5db',
    marginHorizontal: 10,
  },

  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#9ca3af' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  actionItem: { alignItems: 'center' },
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  iconImage: { width: 24, height: 24, resizeMode: 'contain' },
  actionLabel: { fontSize: 12, color: '#1f2937', marginTop: 6, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statText: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  chartCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
  },
  chartTitle: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#d1d5db',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: { backgroundColor: '#9b87f5' },
  toggleCircle: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },

  // FAQ styles
  faqHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  faqCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  accordionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitle: { fontSize: 16, fontWeight: '500', color: '#1F2937', flex: 1 },
  chevron: { width: 16, height: 16, tintColor: '#6B7280' },
  expandedContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  contentText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  questionsLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  questionsLinkText: { fontSize: 13, fontWeight: '700', color: '#7C3AED' },
  chevronRight: { width: 20, height: 20, tintColor: '#7C3AED' },
});

export default Home;
