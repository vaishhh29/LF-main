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
  Platform,
  UIManager,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

export default function Earnings() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState(earningsData);
  const [isLoading, setIsLoading] = useState(true);

  const totalEarnings = filteredData.reduce((sum, i) => sum + i.amount, 0);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(0)).current;

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
  }, []);

  const handleFilter = () => {
    let result = [...earningsData];
    if (selectedCar !== 'All') result = result.filter(i => i.car.includes(selectedCar));
    if (selectedDate) result = result.filter(i => i.fromDate.includes(selectedDate));
    setFilteredData(result);
    setModalVisible(false);
  };

  const resetFilter = () => {
    setSelectedCar('All');
    setSelectedDate(null);
    setFilteredData(earningsData);
  };

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

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={localStyles.header}>
          <TouchableOpacity style={localStyles.filterBtn} onPress={() => setModalVisible(true)}>
            <Image source={require('./assets/filter.png')} style={localStyles.iconSm} />
            <Text style={localStyles.filterText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localStyles.notificationWrapper}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Image source={require('./assets/bell.png')} style={localStyles.iconMd} />
            <View style={localStyles.badge}>
              <Text style={localStyles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Semi Circle Earnings */}
        <View style={styles.earningsBar}>
          <AnimatedSemiCircle progress={progress} amount={totalEarnings} />

          <TouchableOpacity style={styles.unlockBtn}>
            <Text style={styles.unlockBtnText}>Unlock the car</Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}
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
                <Image source={require('./assets/forward.png')} style={styles.arrow} />
                <Text style={styles.dateText}>To - {item.toDate}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>

      {/* ================================
           FILTER POPUP — 75% HEIGHT
      ================================= */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Dim background */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />

          {/* Popup */}
          <View style={styles.popupContainer}>
            <View style={styles.popupHandle} />

            <Text style={styles.modalTitle}>Filter</Text>

            <ScrollView 
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Cars */}
              <Text style={styles.sectionLabel}>Cars</Text>
              <View style={styles.carFilterContainer}>
                {['All', 'Toyota', 'Honda'].map(car => (
                  <TouchableOpacity
                    key={car}
                    style={[styles.carChip, selectedCar === car && styles.carChipSelected]}
                    onPress={() => setSelectedCar(car)}
                  >
                    <Text style={[styles.carChipText, selectedCar === car && styles.carChipTextSelected]}>
                      {car}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Calendar */}
              <Text style={styles.sectionLabel}>Calendar</Text>

              <View style={styles.calendarPopup}>
                <Calendar
                  onDayPress={day => setSelectedDate(day.dateString)}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#7C3AED',
                      selectedTextColor: '#fff',
                    },
                  }}
                  theme={{
                    // Header styling - Show only month
                    'stylesheet.calendar.header': {
                      header: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 6,
                        marginBottom: 10,
                      },
                      monthText: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000',
                      },
                      arrow: {
                        padding: 10,
                      },
                      week: {
                        marginTop: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderBottomWidth: 1,
                        borderBottomColor: '#E5E5E5',
                        paddingBottom: 8,
                      },
                      dayHeader: {
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#666',
                        width: 32,
                        textAlign: 'center',
                      },
                    },
                    // Day styling
                    textSectionTitleColor: '#000',
                    textDayFontSize: 14,
                    textDayHeaderFontSize: 12,
                    textDayFontWeight: '400',
                    selectedDayBackgroundColor: '#7C3AED',
                    selectedDayTextColor: '#fff',
                    todayTextColor: '#7C3AED',
                    dayTextColor: '#000',
                    textDisabledColor: '#d9d9d9',
                    dotColor: '#7C3AED',
                    selectedDotColor: '#fff',
                    arrowColor: '#7C3AED',
                    monthTextColor: '#000',
                    textMonthFontSize: 16,
                    textMonthFontWeight: 'bold',
                  }}
                  hideArrows={false}
                  // Show only month in header
                  renderHeader={(date) => {
                    const month = date.toString('MMMM');
                    return (
                      <View style={styles.customHeader}>
                        <TouchableOpacity>
                          
                        </TouchableOpacity>
                        <Text style={styles.monthText}>{month}</Text>
                        <TouchableOpacity>
                         
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  style={styles.calendarStyle}
                />
              </View>
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={styles.bottomButtons}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
                <Text style={styles.resetText}>Reset All</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.showBtn} onPress={handleFilter}>
                <Text style={styles.showText}>Show {filteredData.length} Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

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
    <View style={{ width: 188, height: 138, alignItems: 'center' }}>
      <Svg width={radius * 2} height={radius + strokeWidth}>
        <Path
          d={`M${strokeWidth / 2},${radius} 
            A${radius - strokeWidth / 2},${radius - strokeWidth / 2} 
            0 0 1 ${radius * 2 - strokeWidth / 2},${radius}`}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedPath
          d={`M${strokeWidth / 2},${radius} 
            A${radius - strokeWidth / 2},${radius - strokeWidth / 2} 
            0 0 1 ${radius * 2 - strokeWidth / 2},${radius}`}
          stroke="#7C3AED"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { fontSize: 16, color: '#7C3AED', fontWeight: '600' },

  earningsBar: { marginHorizontal: 20, paddingVertical: 10, alignItems: 'center' },
  unlockBtn: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  unlockBtnText: { color: '#FFF', fontWeight: '600', fontSize: 16 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  line: { flex: 1, height: 1, backgroundColor: '#D0D0D0', marginHorizontal: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#999' },

  staticCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#7C3AED',
  },

  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bookingChip: { backgroundColor: '#EEE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  bookingText: { fontSize: 12 },
  amountText: { fontSize: 16, color: '#7C3AED', fontWeight: '700' },

  carName: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dateText: { fontSize: 13, color: '#666' },
  arrow: { width: 12, height: 12, marginHorizontal: 6 },

  /* Modal Styles */
  modalContainer: {
    flex: 1,
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },

  popupContainer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.75,
    backgroundColor: '#FFF',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },

  scrollContent: {
    flex: 1,
  },

  popupHandle: {
    width: 60,
    height: 6,
    backgroundColor: '#CCC',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginBottom: 20 
  },

  sectionLabel: { 
    fontSize: 15, 
    fontWeight: '600', 
    marginTop: 15,
    marginBottom: 10,
  },

  carFilterContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 10 
  },

  carChip: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  carChipSelected: { backgroundColor: '#7C3AED' },
  carChipText: { fontSize: 14, color: '#444' },
  carChipTextSelected: { color: '#FFF' },

  calendarPopup: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
    marginBottom: 20,
  },

  calendarStyle: {
    backgroundColor: '#FFF',
    borderRadius: 20,
  },

  // Custom header styles for month-only display
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },

  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

 

 

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  
  resetText: { 
    color: '#7C3AED', 
    fontSize: 16, 
    fontWeight: '600',
  },
  
  showBtn: { 
    backgroundColor: '#7C3AED', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
  },
  
  showText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '700' 
  },

  amountCenter: { position: 'absolute', top: '35%', alignItems: 'center' },
  amountInside: { fontSize: 26, fontWeight: '600' },
});

const localStyles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 19,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },

  iconSm: { width: 25, height: 18, marginRight: 8 },
  iconMd: { width: 22, height: 30 },

  filterText: { color: '#585858', fontSize: 14 },

  notificationWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -5,
    right: -7,
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
});