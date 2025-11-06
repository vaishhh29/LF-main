import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

/* ---------------------------
   Animated Pill Toggle
   - same API: <PillToggle value onToggle />
---------------------------- */
const PillToggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E6E7E9', '#7C3AED'], // gray -> purple
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24],
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onToggle}>
      <Animated.View
        style={[
          localStyles.toggleTrack,
          { backgroundColor: value ? '#7C3AED' : '#C9C9C9' }, // purple when ON, gray when OFF
        ]}
      >
        <Animated.View style={[localStyles.toggleThumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

/* ---------------------------
   Single Car Card
---------------------------- */
const CarCard = ({ car, onToggleLock }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => navigation.navigate('CarDetailsScreen', { carId: car.id })}
      style={localStyles.card}
    >
      {/* IMAGE */}
      <View style={localStyles.imageWrap}>
        <Image source={{ uri: car.image }} style={localStyles.carImage} />
      </View>

      {/* LOCKED/UNLOCK HEADER */}
      <View style={localStyles.cardHeader}>
        <View style={localStyles.lockBadge}>
          <Image
            source={require('./assets/car1.png')}
            style={[
              localStyles.lockIcon,
              { tintColor: car.isLocked ? '#DC2626' : '#7C3AED' },
            ]}
          />
          <Text
            style={[
              localStyles.lockText,
              { color: car.isLocked ? '#DC2626' : '#7C3AED' },
            ]}
          >
            {car.isLocked ? 'Locked' : 'Unlocked'}
          </Text>
        </View>
        <PillToggle value={!car.isLocked} onToggle={onToggleLock} />
      </View>

      {/* BODY */}
      <View style={localStyles.cardBody}>
        {/* Title row */}
        <View style={localStyles.titleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={localStyles.carTitle} numberOfLines={1}>
              {car.name}
            </Text>
            <Text style={localStyles.carType}> {car.type}</Text>
          </View>
          <TouchableOpacity style={localStyles.moreBtn}>
            <Image
              source={require('./assets/more.png')}
              style={localStyles.moreIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Car ID */}
        <Text style={localStyles.carId}>Car ID : {car.id}</Text>
        <View style={localStyles.dottedLine} />

        {/* Price and Status */}
       <View style={localStyles.priceRow}>
      <Image
        source={require('./assets/money.png')}
        style={localStyles.moneyIcon}
      />
      <Text style={localStyles.price}>
        ₹ {car.price}
        <Text style={localStyles.perHour}> / hour </Text>
      </Text>
      <Text style={localStyles.dot}>•</Text>
      <Text style={localStyles.statusText}>On Rent</Text>
    </View>
        <View style={localStyles.dottedLine} />

        {/* Bookings and Earnings */}
        <View style={localStyles.statsRow}>
          <Text style={localStyles.statsText}>
            Bookings : <Text style={localStyles.statsValue}>{car.bookings}</Text>
          </Text>
          <Text style={localStyles.statsText1}>
            Earnings :{' '}
            <Text style={localStyles.statsValue2}>₹ {car.earnings}</Text>
          </Text>
        </View>
      </View>
      
    </TouchableOpacity>
    
  );
};


/* ---------------------------
   Main Screen
---------------------------- */
export default function CarListingScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Earning');

  const [cars, setCars] = useState([
    {
      id: 'LF123456789',
      name: 'Toyota Corolla 2023',
      type: 'Sedan',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      isLocked: true,
      price: 200,
      status: 'On Rent',
      bookings: 2,
      earnings: 2000,
    },
    {
      id: 'LF987654321',
      name: 'Mahindra XUV 700',
      type: 'SUV',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80',
      isLocked: false,
      price: 300,
      status: 'Available',
      bookings: 5,
      earnings: 5500,
    },
  ]);

  const toggleLock = (index: number) => {
    const cp = [...cars];
    cp[index].isLocked = !cp[index].isLocked;
    setCars(cp);
  };

  return (
    <SafeAreaView style={localStyles.screen}>
      {/* header */}
      <View style={localStyles.header}>
        <TouchableOpacity style={localStyles.filterBtn} onPress={() => navigation.navigate('FilterScreen' as never)}>
          <Image source={require('./assets/filter.png')} style={localStyles.iconSm} />
          <Text style={localStyles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.notificationWrapper} onPress={() => navigation.navigate('NotificationScreen' as never)}>
          <Image source={require('./assets/bell.png')} style={localStyles.iconMd} />
          <View style={localStyles.badge}><Text style={localStyles.badgeText}>3</Text></View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={localStyles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Add Car */}
        <TouchableOpacity style={localStyles.addCarBtn} onPress={() => navigation.navigate('CarListDetails' as never)}>
          <View style={localStyles.plusWrap}>
            <Image source={require('./assets/plus.png')} style={localStyles.plusIcon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={localStyles.addTitle}>ADD CAR</Text>
            <Text style={localStyles.addSub}>List your next car</Text>
          </View>
        </TouchableOpacity>

        {/* Section */}
        <View style={localStyles.sectionHeader}>
          <View style={localStyles.hr} />
          <Text style={localStyles.sectionTitle}>MY CARS</Text>
          <View style={localStyles.hr} />
        </View>

        {/* list */}
        {cars.map((car, idx) => (
          <CarCard key={car.id} car={car} onToggleLock={() => toggleLock(idx)} />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={localStyles.bottomTab}>
        <TouchableOpacity 
          style={localStyles.tabItem}
          onPress={() => setActiveTab('Home')}
        >
          <View style={localStyles.tabIconWrap}>
            { /*<Image 
              source={require('./assets/earning.png')} 
              style={[
                localStyles.tabIcon,
                { tintColor: activeTab === 'Earning' ? '#7C3AED' : '#9CA3AF' }
              ]} 
            /> */}
          </View>
          <Text style={[
            localStyles.tabLabel,
            { color: activeTab === 'Home' ? '#7C3AED' : '#9CA3AF' }
          ]}>Home</Text>
          {activeTab === 'Home' && <View style={localStyles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={localStyles.tabItem}
          onPress={() => setActiveTab('Bookings')}
        >
          <View style={localStyles.tabIconWrap}>
            { /*<Image 
              source={require('./assets/earning.png')} 
              style={[
                localStyles.tabIcon,
                { tintColor: activeTab === 'Earning' ? '#7C3AED' : '#9CA3AF' }
              ]} 
            /> */}
          </View>
          <Text style={[
            localStyles.tabLabel,
            { color: activeTab === 'Bookings' ? '#7C3AED' : '#9CA3AF' }
          ]}>Bookings</Text>
          {activeTab === 'Bookings' && <View style={localStyles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={localStyles.tabItem}
          onPress={() => setActiveTab('Earning')}
        >
          <View style={localStyles.tabIconWrap}>
           { /*<Image 
              source={require('./assets/earning.png')} 
              style={[
                localStyles.tabIcon,
                { tintColor: activeTab === 'Earning' ? '#7C3AED' : '#9CA3AF' }
              ]} 
            /> */}
          </View>
          <Text style={[
            localStyles.tabLabel,
            { color: activeTab === 'Earning' ? '#7C3AED' : '#9CA3AF', fontWeight: activeTab === 'Earning' ? '600' : '400' }
          ]}>Earning</Text>
          {activeTab === 'Earning' && <View style={localStyles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={localStyles.tabItem}
          onPress={() => setActiveTab('Account')}
        >
          <View style={localStyles.tabIconWrap}>
            { /*<Image 
              source={require('./assets/earning.png')} 
              style={[
                localStyles.tabIcon,
                { tintColor: activeTab === 'Earning' ? '#7C3AED' : '#9CA3AF' }
              ]} 
            /> */}
          </View>
          <Text style={[
            localStyles.tabLabel,
            { color: activeTab === 'Account' ? '#7C3AED' : '#9CA3AF' }
          ]}>Account</Text>
          {activeTab === 'Account' && <View style={localStyles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------------------------
   Styles tuned to match Figma
---------------------------- */
const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white', 
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    borderRadius:10,
    backgroundColor:'#F5F5F5'
  },
  iconSm: { width: 18, height: 18, tintColor: '#6B7280', marginRight: 8 },
  iconMd: { width: 22, height: 30, tintColor: 'black' },
  filterText: { color: '#585858', fontSize: 14, fontWeight: '500' },

  notificationWrapper: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#664896',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 28,
  },

  /* ADD CAR CTA */
  addCarBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 18,
  },
  plusWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plusIcon: { width: 20, height: 20, tintColor: '#fff' },
  addTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  addSub: { color: '#F1EAFE', fontSize: 12, marginTop: 2 },

  /* section header */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 3,
  },
  hr: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  sectionTitle: { marginHorizontal: 12, color: 'black', fontWeight: '700', fontSize: 14 },

  /* card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEF0F3',
    // elevated shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

    imageWrap: {
    width: '95%',
    height: 200,
    backgroundColor: '#ccc',
    margin: 10,
    borderRadius: 14,      
    overflow: 'hidden',    
  },
  carImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardHeader: {
    paddingHorizontal: 16,
    marginTop: -59, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#FFFFFFCC',
    width:'90%',
    height:40,
    borderRadius:12,
    marginLeft:20
  },

  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 20,
    
  },
  lockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  lockText: { fontSize: 16, fontWeight: '700' },

  toggleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  toggleTrack: {
    width: 52,
    height: 30,
    borderRadius: 18,
    padding: 3,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
 carTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginRight: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
carType: { fontSize: 12, color: '#6B7280', marginRight: 'auto', alignSelf: 'center' },
  moreIcon: { width: 16, height: 16, tintColor: '#9CA3AF' },
  moreBtn: { padding: 6 },
  carId: { fontSize: 12, color: '#333333', marginTop: 6 },
 dottedLine: {
  borderBottomWidth: 1,
  borderStyle: 'dashed',
  borderColor: '#DADADA',
  marginVertical: 8,
},
lockIcon: {
  width: 25,
  height: 20,
  marginRight: 8,
},

priceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},
dot: {
  fontSize: 25,
  color: 'black',
  marginHorizontal: 6,
  marginBottom: 2,
},
statusText: {
  fontSize: 13,
  fontWeight: '700',
  color: '#0B970E',
},
  priceLeft: { flexDirection: 'row', alignItems: 'flex-end' },
  moneyIcon: {
  width: 16,
  height: 16,
  tintColor: '#F59E0B',
  marginRight: 6,
},
 price: {
  fontSize: 16,
  fontWeight: '800',
  color: '#111827',
},
perHour: {
  fontSize: 13,
  color: '#6B7280',
},

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3FDF7', 
  },

  statsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: { fontSize: 14, color: '#4D4D4D' },
  statsValue: { color: '#4D4D4D' },
  statsText1: { fontSize: 16, color: '#4D4D4D',fontWeight:'800' },
  statsValue2: { fontWeight: '800', color: '#4D4D4D' },

  /* Bottom Tab Navigation */
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabIconWrap: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 3,
    backgroundColor: '#7C3AED',
    borderRadius: 2,
  },
});