import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { responsive, sizes } from '../utils/responsive';

/**
 * BookingApproval Component
 * 
 * This component displays a booking approval screen where users can review
 * trip details, vehicle information, driver details, and approve or decline bookings.
 * 
 * Features:
 * - Trip timeline with start/end times and duration
 * - Vehicle and driver information display
 * - Contact driver functionality
 * - Driver verification status and ratings
 * - Report customer option
 * - Approve/Decline booking actions
 * - Bottom navigation bar
 * 
 * @param {Object} navigation - React Navigation object for screen navigation
 */
const UpcomingApproval = ({ navigation }: any) => {
  // Navigation handlers for different actions
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Contact driver functionality - could open phone dialer or messaging app
  const handleContact = () => {
    // TODO: Implement contact driver functionality
    // Could use Linking API to open phone dialer or messaging app
  };

  // Report customer functionality - opens report form or modal
  const handleReport = () => {
    // TODO: Implement report customer functionality
    // Could navigate to report screen or show modal
  };

  // Decline booking action - updates booking status to declined
  const handleDecline = () => {
    // TODO: Implement decline booking functionality
    // Update booking status in backend and show confirmation
  };

  // Approve booking action - updates booking status to approved
  const handleApprove = () => {
    // TODO: Implement approve booking functionality
    // Update booking status in backend and show confirmation
    navigation.navigate('UpcomingSubmission')
  };

  // Contact support functionality - opens support chat or email
  const handleContactUs = () => {
    // TODO: Implement contact us functionality
    // Could navigate to support screen or open email client
  };

  // Bottom navigation handlers
  const handleHome = () => {
    navigation.navigate('Home');
  };

  const handleBookings = () => {
    navigation.navigate('Bookings');
  };

  const handleCarpool = () => {
    navigation.navigate('Carpool');
  };

  const handleAccount = () => {
    navigation.navigate('Account');
  };
  const handleRating = () => {
    navigation.navigate('Rating');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section - Contains back button and booking ID */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Image 
            source={require('./assets/chevron-left.png')} 
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking ID - LP1234569B</Text>
        {/* Spacer to center the title */}
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content - Scrollable area containing all booking details */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Trip Timeline Card - Shows start/end times and duration */}
        <View style={styles.card}>
          {/* Date and Time Row - Displays pickup and drop-off times */}
          <View style={styles.timelineRow}>
            {/* Start time section */}
            <View style={styles.timelineItem}>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('./assets/bookings.png')} 
                  style={styles.timelineIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.timelineText}>
                <Text style={styles.timelineDate}>Thu, 14 Feb</Text>
                <Text style={styles.timelineTime}>10:00 AM</Text>
              </View>
            </View>

            {/* Center location icon */}
            <View style={styles.iconContainer}>
              <Image 
                source={require('./assets/map-pin.png')} 
                style={styles.timelineIcon}
                resizeMode="contain"
              />
            </View>

            {/* End time section */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineTextRight}>
                <Text style={styles.timelineDate}>Thu, 14 Feb</Text>
                <Text style={styles.timelineTime}>12:00 PM</Text>
              </View>
              <View style={styles.iconContainer}>
                <Image 
                  source={require('./assets/map-pin.png')} 
                  style={styles.timelineIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* Progress Bar - Visual representation of trip duration */}
          <View style={styles.progressContainer}>
            {/* Start point (green dot) */}
            <View style={styles.progressDotGreen} />
            <View style={styles.progressLine} />
            {/* Duration badge showing total trip time */}
            <View style={styles.durationBadge}>
              <Text style={styles.durationText}>13h 48m</Text>
            </View>
            <View style={styles.progressLine} />
            {/* End point (red dot) */}
            <View style={styles.progressDotRed} />
          </View>
        </View>

        {/* Vehicle and Driver Information Card */}
        <View style={styles.card}>
          {/* Vehicle Information Section */}
          <View style={styles.vehicleSection}>
            <View style={styles.vehicleInfo}>
              <Image 
                source={require('./assets/car.png')} 
                style={styles.vehicleImage}
                resizeMode="cover"
              />
              <View style={styles.vehicleDetails}>
                <Text style={styles.vehicleName}>Hundyai</Text>
              </View>
            </View>
            {/* Trip price display */}
            <Text style={styles.price}>₹ 2000</Text>
          </View>

          {/* Driver Information Section */}
          <View style={styles.driverSection}>
            <View style={styles.driverInfo}>
              <Image 
                source={require('./assets/avatar.png')} 
                style={styles.driverImage}
                resizeMode="cover"
              />
              <Text style={styles.driverName}>Raman</Text>
            </View>
            {/* Contact driver button */}
            <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
              <Text style={styles.contactButtonText}>Contact</Text>
              <Image 
                source={require('./assets/phone.png')} 
                style={styles.contactIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Driver Details Section - Shows verification status and ratings */}
          <View style={styles.driverDetails}>
            {/* ID verification status */}
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Raman's Id Status - ✓ Verified</Text>
            </View>
            {/* Trip history count */}
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Raman's Trip History - 5 trips</Text>
            </View>
            {/* Driver rating with star icon */}
            <TouchableOpacity style={styles.ratingRow} onPress={handleRating}>
              <View style={styles.ratingInfo}>
                <Text style={styles.detailText}>Raman's Ratings - 4.7</Text>
                <Image 
                  source={require('./assets/up-arrow.png')} 
                  style={styles.starIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Report Customer Button */}
          <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
            <Image 
              source={require('./assets/down-arrow.png')} 
              style={styles.reportIcon}
              resizeMode="contain"
            />
            <Text style={styles.reportText}>Report customer</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section - Support contact information */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>
            Need help?{' '}
            <TouchableOpacity onPress={handleContactUs}>
              <Text style={styles.contactUsText}>Contact Us</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* Action Buttons - Approve/Decline booking actions */}
        <View style={styles.actionButtons}>
          {/* Decline booking button */}
          <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
            <Text style={styles.declineButtonText}>Declined</Text>
          </TouchableOpacity>
          {/* Approve booking button */}
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.approveButtonText}>Approved</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar - Main app navigation */}
      <View style={styles.bottomNavigation}>
        {/* Home navigation item */}
        <TouchableOpacity style={styles.navItem} onPress={handleHome}>
          <Image 
            source={require('./assets/home.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        {/* Bookings navigation item (currently active) */}
        <TouchableOpacity style={styles.navItemActive} onPress={handleBookings}>
          <View style={styles.activeNavIcon}>
            <Image 
              source={require('./assets/bookings.png')} 
              style={styles.activeNavIconImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.activeNavText}>Bookings</Text>
        </TouchableOpacity>
        {/* Carpool navigation item */}
        <TouchableOpacity style={styles.navItem} onPress={handleCarpool}>
          <Image 
            source={require('./assets/image.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navText}>Carpool</Text>
        </TouchableOpacity>
        {/* Account navigation item */}
        <TouchableOpacity style={styles.navItem} onPress={handleAccount}>
          <Image 
            source={require('./assets/bell.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/**
 * StyleSheet for BookingApproval component
 * 
 * This stylesheet contains all the styling for the booking approval screen,
 * organized by component sections for better maintainability.
 */
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // Light gray background
  },
  
  // Header section styles
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: responsive.spacing(16),
    paddingTop: responsive.spacing(48), // Account for status bar
    paddingBottom: responsive.spacing(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: responsive.spacing(8),
    borderRadius: responsive.radius(8),
  },
  backIcon: {
    width: sizes.icon.lg,
    height: sizes.icon.lg,
  },
  headerTitle: {
    fontSize: sizes.text.lg,
    fontWeight: '500',
    color: '#111827', // Dark gray text
  },
  headerSpacer: {
    width: responsive.spacing(32), // Spacer to center the title
  },
  
  // Scroll view styles
  scrollView: {
    flex: 1,
    paddingBottom: responsive.spacing(16),
  },
  
  // Card container styles - Used for timeline and vehicle/driver info cards
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: responsive.spacing(16),
    marginTop: responsive.spacing(16),
    borderRadius: responsive.radius(16),
    padding: responsive.spacing(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  
  // Timeline section styles - Trip start/end times and progress bar
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing(16),
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: responsive.spacing(40),
    height: responsive.spacing(40),
    borderRadius: responsive.radius(20), // Circular container
    backgroundColor: '#f3f4f6', // Light gray background
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive.spacing(12),
  },
  timelineIcon: {
    width: sizes.icon.base,
    height: sizes.icon.base,
    tintColor: '#6b7280', // Gray icon color
  },
  timelineText: {
    flex: 1,
  },
  timelineTextRight: {
    alignItems: 'flex-end', // Right-aligned text
    flex: 1,
  },
  timelineDate: {
    fontSize: sizes.text.base,
    fontWeight: '600',
    color: '#111827', // Dark text
  },
  timelineTime: {
    fontSize: sizes.text.sm,
    color: '#6b7280', // Gray text
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing(4),
  },
  progressDotGreen: {
    width: responsive.spacing(12),
    height: responsive.spacing(12),
    borderRadius: responsive.radius(6),
    backgroundColor: '#10b981',
  },
  progressDotRed: {
    width: responsive.spacing(12),
    height: responsive.spacing(12),
    borderRadius: responsive.radius(6),
    backgroundColor: '#ef4444',
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
    marginHorizontal: responsive.spacing(8),
  },
  durationBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: responsive.spacing(12),
    paddingVertical: responsive.spacing(4),
    borderRadius: responsive.radius(12),
  },
  durationText: {
    fontSize: sizes.text.sm,
    color: '#6b7280',
  },
  vehicleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing(16),
    paddingBottom: responsive.spacing(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleImage: {
    width: responsive.spacing(56),
    height: responsive.spacing(56),
    borderRadius: responsive.radius(12),
    marginRight: responsive.spacing(12),
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing(12),
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverImage: {
    width: responsive.spacing(48),
    height: responsive.spacing(48),
    borderRadius: responsive.radius(24),
    marginRight: responsive.spacing(12),
  },
  driverName: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
  },
  contactButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: responsive.radius(8),
    paddingHorizontal: responsive.spacing(16),
    paddingVertical: responsive.spacing(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: sizes.text.base,
    fontWeight: '500',
    color: '#111827',
    marginRight: responsive.spacing(8),
  },
  contactIcon: {
    width: sizes.icon.sm,
    height: sizes.icon.sm,
    tintColor: '#10b981',
  },
  driverDetails: {
    marginBottom: responsive.spacing(16),
  },
  detailRow: {
    paddingVertical: responsive.spacing(8),
  },
  detailText: {
    fontSize: sizes.text.base,
    color: '#6b7280',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.spacing(8),
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: sizes.icon.xs,
    height: sizes.icon.xs,
    tintColor: '#fbbf24',
    marginLeft: responsive.spacing(4),
  },
  chevron: {
    color: '#9ca3af',
    fontSize: sizes.text.lg,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsive.spacing(16),
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  reportIcon: {
    width: responsive.spacing(18),
    height: responsive.spacing(18),
    tintColor: '#6b7280',
  },
  reportText: {
    fontSize: sizes.text.base,
    color: '#374151',
    marginLeft: responsive.spacing(8),
  },
  helpSection: {
    alignItems: 'center',
    marginTop: responsive.spacing(24),
    marginBottom: responsive.spacing(16),
  },
  helpText: {
    fontSize: sizes.text.base,
    color: '#6b7280',
  },
  contactUsText: {
    color: '#7c3aed',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: responsive.spacing(16),
    marginBottom: responsive.spacing(24),
    gap: responsive.spacing(12),
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: responsive.radius(12),
    paddingVertical: responsive.spacing(16),
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#111827',
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#7c3aed',
    borderRadius: responsive.radius(12),
    paddingVertical: responsive.spacing(16),
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  approveButtonText: {
    fontSize: sizes.text.lg,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomNavigation: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: responsive.spacing(12),
    paddingHorizontal: responsive.spacing(16),
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: responsive.spacing(8),
    paddingHorizontal: responsive.spacing(16),
  },
  navItemActive: {
    alignItems: 'center',
    paddingVertical: responsive.spacing(8),
    paddingHorizontal: responsive.spacing(16),
  },
  navIcon: {
    width: sizes.icon.lg,
    height: sizes.icon.lg,
    tintColor: '#9ca3af',
  },
  activeNavIcon: {
    backgroundColor: '#7c3aed',
    borderRadius: responsive.radius(12),
    padding: responsive.spacing(8),
  },
  activeNavIconImage: {
    width: sizes.icon.lg,
    height: sizes.icon.lg,
    tintColor: '#ffffff',
  },
  navText: {
    fontSize: sizes.text.sm,
    color: '#6b7280',
    marginTop: responsive.spacing(4),
  },
  activeNavText: {
    fontSize: sizes.text.sm,
    color: '#7c3aed',
    marginTop: responsive.spacing(4),
    fontWeight: '500',
  },
});

/**
 * Export the BookingApproval component
 * 
 * This component is ready to be used in React Native navigation stack.
 * Make sure to pass the navigation prop when using this component.
 */
export default UpcomingApproval;