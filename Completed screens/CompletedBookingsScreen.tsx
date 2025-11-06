import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import { responsive, sizes } from '../utils/responsive';

/**
 * ========================================
 * TYPES & INTERFACES
 * ========================================
 */

/**
 * Booking data interface
 * Defines the structure of a completed booking
 */
interface Booking {
  id: string;
  carModel: string;
  carYear: number;
  userName: string;
  userAvatar?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'Ride Completed' | 'Ride Cancelled' | 'Ride In Progress';
  completedDaysAgo: number;
  totalAmount: number;
  rating?: number;
  notes?: string;
}

/**
 * Filter option interface
 * Defines available filter options for bookings
 */
interface FilterOption {
  id: string;
  label: string;
  value: string;
}

/**
 * Tab option interface
 * Defines available tab options
 */
interface TabOption {
  id: string;
  label: string;
  screen: string;
}

/**
 * Component props interface
 */
interface CompletedBookingsScreenProps {
  navigation: any; // TODO: Replace with proper navigation type
}

/**
 * ========================================
 * CONSTANTS
 * ========================================
 */

/**
 * Available filter options for booking list
 */
const FILTER_OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All', value: 'all' },
  { id: 'toyota', label: 'Toyota', value: 'toyota' },
  { id: 'honda', label: 'Honda', value: 'honda' },
  { id: 'hyundai', label: 'Hyundai', value: 'hyundai' },
];

/**
 * Available tab options for navigation
 */
const TAB_OPTIONS: TabOption[] = [
  { id: 'upcoming', label: 'Upcoming', screen: 'UpcomingBookingDetailScreen' },
  { id: 'ongoing', label: 'Ongoing', screen: 'BookingsScreen' },
  { id: 'completed', label: 'Completed', screen: 'CompletedBookingsScreen' },
];

/**
 * Sample booking data
 * In a real app, this would come from an API or state management
 */
const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'LFI234567189',
    carModel: 'Toyota Corolla',
    carYear: 2023,
    userName: 'Raju',
    userAvatar: require('./assets/avatar.png'),
    startDate: 'Thu, 12 Feb',
    startTime: '10:00 AM',
    endDate: 'Thu, 14 Feb',
    endTime: '10:00 PM',
    status: 'Ride Completed',
    completedDaysAgo: 2,
    // totalAmount: 2500,
    // rating: 4.8,
    notes: 'Excellent driver, very punctual',
  },
  {
    id: 'LFI234567190',
    carModel: 'Honda City',
    carYear: 2023,
    userName: 'Sita',
    userAvatar: require('./assets/avatar.png'),
    startDate: 'Fri, 10 Feb',
    startTime: '09:00 AM',
    endDate: 'Fri, 12 Feb',
    endTime: '09:00 PM',
    status: 'Ride Completed',
    completedDaysAgo: 4,
    totalAmount: 2200,
    // rating: 4.5,
    notes: 'Clean car, smooth ride',
  },
  {
    id: 'LFI234567191',
    carModel: 'Hyundai i20',
    carYear: 2022,
    userName: 'Amit',
    userAvatar: require('./assets/avatar.png'),
    startDate: 'Mon, 8 Feb',
    startTime: '08:00 AM',
    endDate: 'Mon, 10 Feb',
    endTime: '08:00 PM',
    status: 'Ride Completed',
    completedDaysAgo: 6,
    totalAmount: 1800,
    // rating: 4.2,
    notes: 'Good service overall',
  },
];

/**
 * ========================================
 * UTILITY FUNCTIONS
 * ========================================
 */

/**
 * Formats the days ago text
 * @param days - Number of days ago
 * @returns Formatted string
 */
const formatDaysAgo = (days: number): string => {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
};

/**
 * Gets the appropriate status color
 * @param status - Booking status
 * @returns Color string
 */
// const getStatusColor = (status: Booking['status']): string => {
//   switch (status) {
//     case 'Ride Completed':
//       return '#10B981'; // Green
//     case 'Ride Cancelled':
//       return '#EF4444'; // Red
//     case 'Ride In Progress':
//       return '#F59E0B'; // Yellow
//     default:
//       return '#6B7280'; // Gray
//   }
// };

/**
 * ========================================
 * MAIN COMPONENT
 * ========================================
 */

/**
 * CompletedBookingsScreen Component
 * 
 * This screen displays a list of completed bookings with filtering and navigation options.
 * Features:
 * - Tab navigation between different booking states
 * - Filter options for car models
 * - Booking cards with detailed information
 * - Pull-to-refresh functionality
 * - Responsive design with proper spacing
 * 
 * @param navigation - React Navigation object
 */
const CompletedBookingsScreen: React.FC<CompletedBookingsScreenProps> = ({ navigation }) => {
  /**
   * ========================================
   * STATE MANAGEMENT
   * ========================================
   */
  
  // Current active tab state
  const [activeTab, setActiveTab] = useState<string>('completed');
  
  // Current active filter state
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Loading state for pull-to-refresh
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  /**
   * ========================================
   * EVENT HANDLERS
   * ========================================
   */

  /**
   * Handles back button press
   */
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  /**
   * Handles tab selection
   * @param tabId - Selected tab ID
   */
  const handleTabPress = useCallback((tabId: string) => {
    const tab = TAB_OPTIONS.find(t => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      if (tabId !== 'completed') {
        navigation.navigate(tab.screen);
      }
    }
  }, [navigation]);

  /**
   * Handles filter selection
   * @param filterId - Selected filter ID
   */
  const handleFilterPress = useCallback((filterId: string) => {
    setActiveFilter(filterId);
  }, []);

  /**
   * Handles booking card press
   * @param booking - Selected booking data
   */
  const handleBookingPress = useCallback((booking: Booking) => {
    navigation.navigate('BookingDetailsScreen', { booking });
  }, [navigation]);

  /**
   * Handles pull-to-refresh
   */
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // TODO: Implement actual data refresh logic
    // await fetchBookings();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  /**
   * ========================================
   * COMPUTED VALUES
   * ========================================
   */

  /**
   * Filtered bookings based on active filter
   */
  const filteredBookings = useMemo(() => {
    if (activeFilter === 'all') {
      return SAMPLE_BOOKINGS;
    }
    return SAMPLE_BOOKINGS.filter(booking => 
      booking.carModel.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  /**
   * ========================================
   * RENDER METHODS
   * ========================================
   */

  /**
   * Renders the header section
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={handleGoBack}>
        <Image
          source={require('./assets/chevron-left.png')}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Bookings</Text>

      <TouchableOpacity style={styles.headerButton}>
        <Image 
          source={require('./assets/bell.png')} 
          style={styles.headerIcon}
          resizeMode="contain"
        />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders the tab navigation
   */
  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {TAB_OPTIONS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.tabActive
          ]}
          onPress={() => handleTabPress(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.tabTextActive
            ]}
          >
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  /**
   * Renders the filter pills
   */
  const renderFilters = () => (
    <View style={styles.filterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterPill,
              activeFilter === filter.id && styles.filterPillActive
            ]}
            onPress={() => handleFilterPress(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  /**
   * Renders a single booking card
   * @param booking - Booking data to render
   */
  const renderBookingCard = (booking: Booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => handleBookingPress(booking)}
      activeOpacity={0.7}
    >
      {/* Car Model and Year */}
      <View style={styles.bookingHeader}>
        <Text style={styles.carModel}>
          {booking.carModel} {booking.carYear}
        </Text>
        {booking.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {booking.rating}</Text>
          </View>
        )}
      </View>

      {/* User Info and Booking ID */}
      <View style={styles.bookingRow}>
        <View style={styles.userInfo}>
          <Image
            source={booking.userAvatar || require('./assets/avatar.png')}
            style={styles.userAvatar}
            resizeMode="cover"
          />
          <Text style={styles.userName}>{booking.userName}</Text>
        </View>

        <View style={styles.bookingIdBadge}>
          <Text style={styles.bookingIdText}>
           Booking ID: {booking.id}
          </Text>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <Image
            source={require('./assets/up-arrow.png')} 
            style={styles.left}
            resizeMode="contain"
          />
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineDate}>{booking.startDate}</Text>
            <Text style={styles.timelineTime}>{booking.startTime}</Text>
          </View>
        </View>

        <View style={styles.timelineConnector} />

        <View style={styles.timelineItem}>
          <Image
            source={require('./assets/car.png')}
            style={styles.car}
            resizeMode="contain"
          />
        </View>

        <View style={styles.timelineConnector} />

        <View style={styles.timelineItem}>
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineDate}>{booking.endDate}</Text>
            <Text style={styles.timelineTime}>{booking.endTime}</Text>
          </View>
          <Image
            source={require('./assets/down-arrow.png')}
            style={styles.right}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Status and Amount */}
      {/* Dashed Divider Line */}
<View style={styles.dashedDivider} />

{/* Status and Amount */}
<View style={styles.bookingFooter}>
  <View style={styles.statusContainer}>
    {/* <View 
      style={[
        styles.statusIndicator, 
        { backgroundColor: getStatusColor(booking.status) }
      ]} 
    /> */}
    <Text style={styles.statusText}>{booking.status}</Text>
  </View>
  
  <View style={styles.amountContainer}>
    {/* <Text style={styles.amountText}>₹{booking.totalAmount}</Text> */}
    <Text style={styles.daysAgoText}>
      {formatDaysAgo(booking.completedDaysAgo)}
    </Text>
  </View>
</View>
    </TouchableOpacity>
  );

  /**
   * Renders the booking list
   */
  const renderBookingList = () => (
    <ScrollView
      style={styles.bookingsList}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={['#7C3AED']}
          tintColor="#7C3AED"
        />
      }
    >
      {filteredBookings.length > 0 ? (
        filteredBookings.map(renderBookingCard)
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No completed bookings</Text>
          <Text style={styles.emptyStateSubtitle}>
            Your completed bookings will appear here
          </Text>
        </View>
      )}
    </ScrollView>
  );

  /**
   * ========================================
   * MAIN RENDER
   * ========================================
   */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {renderHeader()}
      {renderTabs()}
      {renderFilters()}
      {renderBookingList()}
    </SafeAreaView>
  );
};

/**
 * ========================================
 * STYLES
 * ========================================
 */

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing(16),
    paddingVertical: responsive.spacing(12),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerButton: {
    padding: responsive.spacing(8),
    position: 'relative',
  },
  // Dashed divider
dashedDivider: {
  width: '100%',
  height: 0,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderStyle: 'dashed',
  marginTop: responsive.spacing(16),
  marginBottom: responsive.spacing(12),
},

// Footer styles
bookingFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: responsive.spacing(8),
},
  headerIcon: {
    width: sizes.icon.lg,
    height: sizes.icon.lg,
  },
  headerTitle: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#080808ff',
    marginLeft:-142,
  },
  notificationBadge: {
    position: 'absolute',
    top: responsive.spacing(6),
    right: responsive.spacing(6),
    width: responsive.spacing(8),
    height: responsive.spacing(8),
    borderRadius: responsive.radius(4),
    backgroundColor: '#7C3AED',
  },

  // Tab styles
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: responsive.spacing(16),
    paddingTop: responsive.spacing(8),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginLeft:30,
  },
  tab: {
    paddingVertical: responsive.spacing(12),
    paddingHorizontal: responsive.spacing(16),
    marginRight: responsive.spacing(8),
    position: 'relative',
  },
  tabActive: {
    // Active tab styling handled by text color
  },
  tabText: {
    fontSize: sizes.text.sm,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: responsive.spacing(16),
    right: responsive.spacing(16),
    height: 2,
    backgroundColor: '#7C3AED',
    borderRadius: 1,
  },

  // Filter styles
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: responsive.spacing(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterScrollContent: {
    paddingHorizontal: responsive.spacing(16),
  },
  filterPill: {
    paddingHorizontal: responsive.spacing(16),
    paddingVertical: responsive.spacing(8),
    borderRadius: responsive.radius(20),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginRight: responsive.spacing(8),
  },
  filterPillActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterText: {
    fontSize: sizes.text.sm,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  // Booking list styles
  bookingsList: {
    flex: 1,
    padding: responsive.spacing(16),
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsive.radius(12),
    padding: responsive.spacing(16),
    marginBottom: responsive.spacing(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing(12),
  },
  carModel: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  ratingContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: responsive.spacing(8),
    paddingVertical: responsive.spacing(4),
    borderRadius: responsive.radius(12),
  },
  ratingText: {
    fontSize: sizes.text.sm,
    color: '#D97706',
    fontWeight: '600',
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing(16),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: responsive.spacing(32),
    height: responsive.spacing(32),
    borderRadius: responsive.radius(16),
    marginRight: responsive.spacing(8),
  },
  userName: {
    fontSize: sizes.text.base,
    color: '#111827',
    fontWeight: '500',
  },
  bookingIdBadge: {
    backgroundColor: '#F1EDFC',
    borderRadius: responsive.radius(6),
    paddingHorizontal: responsive.spacing(8),
    paddingVertical: responsive.spacing(4),
  },
  bookingIdText: {
    color: '#111827',
    fontSize: sizes.text.sm,
    fontWeight: '500',
  },

  // Timeline styles
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive.spacing(12),
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineIcon: {
    width: sizes.icon.base,
    height: sizes.icon.base,
  },
  timelineTextContainer: {
    alignItems: 'center',
    marginHorizontal: responsive.spacing(8),
    minWidth: responsive.spacing(60),
  },
  timelineDate: {
    fontSize: sizes.text.sm,
    color: '#6B7280',
    fontWeight: '500',
  },
  timelineTime: {
    fontSize: sizes.text.xs,
    color: '#9CA3AF',
    marginTop: responsive.spacing(2),
  },
  timelineConnector: {
  flex: 1,
  height: 1,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderStyle: 'dashed',
  backgroundColor: 'transparent',
  marginHorizontal: responsive.spacing(4),
},
left:{
height:30,
width:30,
},
car:{
  height:30,
width:30,
},
right:{
  height:30,
width:30,
},
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: responsive.spacing(8),
    height: responsive.spacing(8),
    borderRadius: responsive.radius(4),
    marginRight: responsive.spacing(6),
  },
  statusText: {
    fontSize: sizes.text.sm,
    color: '#111827',
    fontWeight: '500',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: sizes.text.base,
    color: '#111827',
    fontWeight: '600',
  },
  daysAgoText: {
    fontSize: sizes.text.sm,
    color: '#6B7280',
    marginTop: responsive.spacing(2),
  },

  // Empty state styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsive.spacing(64),
  },
  emptyStateTitle: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
    marginBottom: responsive.spacing(8),
  },
  emptyStateSubtitle: {
    fontSize: sizes.text.base,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default CompletedBookingsScreen;