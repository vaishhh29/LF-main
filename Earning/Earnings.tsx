import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Enable animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* ======================================
   MOCK DATA — Replace with API later
====================================== */
const earningsData = [
  {
    id: 'LFT23456789',
    car: 'Hyundai i20 Asta',
    amount: 4500,
    fromDate: '10/08/2025',
    toDate: '10/08/2025',
  },
  {
    id: 'LFT98765432',
    car: 'Honda City ZX',
    amount: 6000,
    fromDate: '05/08/2025',
    toDate: '30/08/2025',
  },
  {
    id: 'LFT34567891',
    car: 'Toyota Corolla Altis',
    amount: 5000,
    fromDate: '01/08/2025',
    toDate: '10/08/2025',
  },
];

/* ======================================
   MAIN COMPONENT
====================================== */
export default function Earnings() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState(earningsData);
  const [isLoading, setIsLoading] = useState(true);

  // Total of all filtered earnings
  const totalEarnings = filteredData.reduce((sum, i) => sum + i.amount, 0);

  // Animation states for smooth fade-in
  const progressAnim = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(0)).current;

  // Simulate screen load + animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, 400);
    return () => clearTimeout(timer);
  });

  /* ======================================
     FILTER LOGIC
  ====================================== */
  const handleFilter = () => {
    let result = [...earningsData];
    if (selectedCar !== 'All')
      result = result.filter(i => i.car.includes(selectedCar));
    if (selectedDate)
      result = result.filter(i => i.fromDate.includes(selectedDate));
    setFilteredData(result);
    setModalVisible(false);
  };

  const resetFilter = () => {
    setSelectedCar('All');
    setSelectedDate(null);
    setFilteredData(earningsData);
  };

  // Semi-circle fill progress interpolation
  const progress = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.75],
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  /* ======================================
     MAIN UI
  ====================================== */
  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* ===== HEADER SECTION ===== */}
        <View style={styles.headerRow}>
          {/* Filter Button */}
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setModalVisible(true)}
          >
            <Image
              source={require('./assets/filter.png')}
              style={{ width: 20, height: 20, tintColor: '#6C6C6C' }}
            />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>

          {/* Notification Bell */}
          <View style={styles.notification}>
            <Image
              source={require('./assets/bell.png')}
              style={{ width: 24, height: 24 }}
            />
            <View style={styles.badge} />
          </View>
        </View>

        {/* ===== SEMI-CIRCLE EARNINGS ===== */}
        <View style={styles.earningsBar}>
          <AnimatedSemiCircle progress={progress} amount={totalEarnings} />

          {/* Unlock button - full width */}
          <TouchableOpacity style={styles.unlockBtn}>
            <Text style={styles.unlockBtnText}>Unlock the car</Text>
          </TouchableOpacity>
        </View>

        {/* ===== EARNING OVERVIEW ===== */}
        <View style={styles.sectionHeader}>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>EARNING OVERVIEW</Text>
          <View style={styles.line} />
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            // STATIC CARD LAYOUT (No dropdown)
            <View style={styles.staticCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.bookingChip}>
                  <Text style={styles.bookingText}>Booking ID: {item.id}</Text>
                </View>
                <Text style={styles.amountText}>₹{item.amount}</Text>
              </View>

              <Text style={styles.carName}>{item.car}</Text>

              <View style={styles.dateRow}>
                <Text style={styles.dateText}>From - {item.fromDate}</Text>
                <Image
  source={require('./assets/forward.png')}
  style={styles.arrow}
/>
                <Text style={styles.dateText}>To - {item.toDate}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>

      {/* ===== FILTER MODAL ===== */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter</Text>

            {/* Car Selection Filter */}
            <Text style={styles.sectionLabel}>Cars</Text>
            <View style={styles.carFilterContainer}>
              {['All', 'Hyundai', 'Honda', 'Toyota'].map(car => (
                <TouchableOpacity
                  key={car}
                  style={[
                    styles.carChip,
                    selectedCar === car && styles.carChipSelected,
                  ]}
                  onPress={() => setSelectedCar(car)}
                >
                  <Text
                    style={[
                      styles.carChipText,
                      selectedCar === car && styles.carChipTextSelected,
                    ]}
                  >
                    {car}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Calendar Month Filter */}
            <Text style={styles.sectionLabel}>Select Month</Text>
            <View style={styles.calendarWrapper}>
              <Calendar
                onMonthChange={month =>
                  setSelectedDate(`${month.year}-${String(month.month).padStart(2, '0')}`, )
                }
                hideExtraDays
                theme={{
                  textMonthFontWeight: 'bold',
                  textMonthFontSize: 18,
                }}
                style={{ height: 80 }}
              />
            </View>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity onPress={resetFilter}>
                <Text style={styles.resetText}>Reset All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.showBtn} onPress={handleFilter}>
                <Text style={styles.showText}>
                  Show {filteredData.length} Results
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

/* ======================================
   SEMI-CIRCLE COMPONENT
====================================== */
const AnimatedSemiCircle = ({ progress, amount }) => {
  const radius = 120;
  const strokeWidth = 25;
  const circumference = Math.PI * radius;
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const strokeDashoffset = Animated.multiply(
    Animated.subtract(1, progress),
    circumference,
  );

  return (
    <View
      style={{
        width: 188,
        height: 138,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background grey arc */}
      <Svg width={radius * 2} height={radius + strokeWidth}>
        <Path
          d={`M${strokeWidth / 2},${radius} A${radius - strokeWidth / 2},${
            radius - strokeWidth / 2
          } 0 0 1 ${radius * 2 - strokeWidth / 2},${radius}`}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated purple arc */}
        <AnimatedPath
          d={`M${strokeWidth / 2},${radius} A${radius - strokeWidth / 2},${
            radius - strokeWidth / 2
          } 0 0 1 ${radius * 2 - strokeWidth / 2},${radius}`}
          stroke="#6C40FF"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      {/* Amount in center */}
      <View style={styles.amountCenter}>
        <Text style={styles.amountInside}>₹{amount}</Text>
      </View>
    </View>
  );
};

/* ======================================
   STYLES
====================================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF'  },
  safeArea: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { fontSize: 16, color: '#6C40FF', fontWeight: '600' },

  // Header
  // headerRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 20,
  //   // width:360,
  //   // height:64
  // },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 32,            // adds space from top (safe area)
  paddingBottom: 12,         // balances spacing vertically
  height: 70,                // consistent top bar height
  borderBottomWidth: 1,      // subtle divider line
  borderBottomColor: 'rgba(0,0,0,0.1)',  // light border
  backgroundColor: '#fff',   // or use blur background later
  width: '100%',
},

  filterBtn: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  filterText: { marginLeft: 6, fontSize: 12, color: '#6C6C6C' },
  notification: { position: 'relative', padding: 5 },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C40FF',
    position: 'absolute',
    top: 5,
    right: 5,
  },

  // Earnings Progress
  earningsBar: {
    marginHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  unlockBtn: {
    backgroundColor: '#6C40FF',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  // Section Title
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0D0D0', // light grey line
    marginHorizontal: 8,
  },
  // Static Card Layout
  staticCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1, // thickness of the bottom border
    borderBottomColor: '#8D6DE7', // your accent color
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
  width: 12,       // adjust width
  height: 12,      // adjust height
  marginLeft: 8,   // space from text
  tintColor: '#000000ff', // optional, if your image is monochrome
  resizeMode: 'contain',
},

  bookingChip: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  bookingText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  amountText: { fontSize: 16, fontWeight: '700', color: '#6D38E8' },
  carName: { fontSize: 16, fontWeight: '600', color: '#000', marginTop: 8 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dateText: { fontSize: 13, color: '#6B7280' },
  arrow: { fontSize: 14, color: '#6B7280', marginHorizontal: 4 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionLabel: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
  carFilterContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  carChip: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  carChipSelected: { backgroundColor: '#6C40FF' },
  carChipText: { color: '#6C6C6C', fontWeight: '500' },
  carChipTextSelected: { color: '#FFF', fontWeight: '600' },
  calendarWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  resetText: { color: '#6C40FF', fontWeight: '600', fontSize: 15 },
  showBtn: {
    backgroundColor: '#6C40FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  showText: { color: '#FFF', fontWeight: '600', fontSize: 15 },

  // Amount Center
  amountCenter: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountInside: { fontSize: 26, fontWeight: '600', color: '#000' },
});