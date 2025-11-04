import React, { useState, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  Animated,
} from 'react-native';

type PermissionKey = 'notifications' | 'location' | 'email' | 'whatsapp';

interface PermissionItemProps {
  label: string;
  value: boolean;
  icon: any;
  onToggle: () => void;
}

// Memoized permission item with pill toggle
const PermissionItem = memo(({ label, value, icon, onToggle }: PermissionItemProps) => {
  const translateX = new Animated.Value(value ? 22 : 0);

  // Animate toggle when value changes
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <View style={styles.permissionItem}>
      <View style={styles.labelContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Pill Toggle */}
      <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
        <View style={[styles.toggleContainer, value && styles.toggleActive]}>
          <Animated.View
            style={[styles.toggleCircle, { transform: [{ translateX }] }]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default function AppPermissionScreen() {
  const [permissions, setPermissions] = useState({
    notifications: true,
    location: true,
    email: true,
    whatsapp: true,
  });

  const togglePermission = (key: PermissionKey) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PermissionItem
          label="Notification Settings"
          icon={require('./assets/notification.png')}
          value={permissions.notifications}
          onToggle={() => togglePermission('notifications')}
        />
        <PermissionItem
          label="Location Settings"
          icon={require('./assets/notification.png')}
          value={permissions.location}
          onToggle={() => togglePermission('location')}
        />
        <PermissionItem
          label="Email Settings"
          icon={require('./assets/notification.png')}
          value={permissions.email}
          onToggle={() => togglePermission('email')}
        />
        <PermissionItem
          label="WhatsApp Settings"
          icon={require('./assets/notification.png')}
          value={permissions.whatsapp}
          onToggle={() => togglePermission('whatsapp')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  content: {
    padding: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#d1d5db',
    padding: 3,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#8b5cf6',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
});
