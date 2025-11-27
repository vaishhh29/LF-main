import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  read: boolean;
  section: 'today' | 'previous';
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Car Booking Successful',
      message: 'Your car is ready! Check your email for the booking and pickup instructions. Safe travels!',
      time: '10:00 am',
      icon: '🚗',
      read: false,
      section: 'today',
    },
    {
      id: '2',
      title: 'Payment Notification',
      message: 'Your payment was processed successfully! Enjoy your ride.',
      time: '10:00 am',
      icon: '💳',
      read: false,
      section: 'today',
    },
    {
      id: '3',
      title: 'Car Pickup/Drop-off time',
      message: 'Pickup time confirmed! See you at [Time] for your car rental. Drop-off Time Confirmed! Please',
      time: '10:00 am',
      icon: '📅',
      read: false,
      section: 'today',
    },
    {
      id: '4',
      title: 'Late Return Warning',
      message: 'Late Return Alert! Please return the car as soon as possible to avoid extra charges.',
      time: 'Yesterday',
      icon: '⚠️',
      read: true,
      section: 'previous',
    },
    {
      id: '5',
      title: 'Cancellation Notice',
      message: 'Your Reservation Has Been Canceled or Booking Cancelled Successfully.',
      time: 'Yesterday',
      icon: '❌',
      read: true,
      section: 'previous',
    },
    {
      id: '6',
      title: 'Discount Notification',
      message: "Congratulations! You've unlocked a 10% discount on your next rental.",
      time: 'Yesterday',
      icon: '🏷️',
      read: true,
      section: 'previous',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={styles.notificationCard}
      onPress={() => markAsRead(notification.id)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.iconEmoji}>{notification.icon}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{notification.title}</Text>
          {!notification.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>

      <TouchableOpacity
        onPress={() => deleteNotification(notification.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const todayNotifications = notifications.filter(n => n.section === 'today');
  const previousNotifications = notifications.filter(n => n.section === 'previous');

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View> */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {todayNotifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Today</Text>
            {todayNotifications.map(renderNotification)}
          </>
        )}

        {previousNotifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Previous</Text>
            {previousNotifications.map(renderNotification)}
          </>
        )}

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔕</Text>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginLeft: 8,
  },
  message: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 20,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

export default NotificationScreen;