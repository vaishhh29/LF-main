import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SupportChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello, How can I help you?',
      subtext: 'Please select an option',
      options: [
        'I have a question about a booking',
        'I want to know about the tea-fleet services',
      ],
    },
    {
      id: 2,
      type: 'user',
      text: 'How much did I spend today?',
    },
    {
      id: 3,
      type: 'bot',
      text: 'You spent ₹540 today.',
      subtext: 'Would you like to see a detailed report?',
      options: ['Yes, show me', 'No, thanks'],
    },
  ]);

  const handleOptionClick = (option) => {
    console.log('Selected option:', option);
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Removed extra top "Support Chat" section */}

      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require('./assets/chevron-left.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View> */}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconCircle}>
            <Image
              source={require('./assets/email.png')}
              style={styles.actionIcon}
            />
          </View>
          <Text style={styles.actionText}>Send us an Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}  onPress={() => navigation.navigate('FAQ')}>
          <View style={styles.iconCircle}>
            <Image
              source={require('./assets/faq.png')}
              style={styles.actionIcon}
            />
          </View>
          <Text style={styles.actionText}>FAQs</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateLabel}>Today</Text>

        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            {message.type === 'bot' ? (
              <View style={styles.botMessageContainer}>
                <Image source={require('./assets/bot.png')} style={styles.avatar} />
                <View style={styles.botContent}>
                  <Text style={styles.botText}>{message.text}</Text>
                  {message.subtext && (
                    <Text style={styles.botSubtext}>{message.subtext}</Text>
                  )}
                  {message.options && (
                    <View style={styles.optionsContainer}>
                      {message.options.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.optionButton}
                          onPress={() => handleOptionClick(option)}
                        >
                          <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.userMessageContainer}>
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{message.text}</Text>
                </View>
                <Image source={require('./assets/user.png')} style={styles.avatar} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator}>
        <View style={styles.indicator}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    padding: 12,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#111',
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9fafb',
    paddingVertical: 16,
  },
  actionButton: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#F1EDFC',
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 42,
    height: 42,
  
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionIcon: {
    width: 22,
    height: 22,
    tintColor: '#666',
    resizeMode: 'contain',
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  dateLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginVertical: 12,
  },
  messageWrapper: {
    marginBottom: 20,
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  botContent: {
    flex: 1,
    marginLeft: 8,
  },
  botText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
  botSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 4,
  },
  optionText: {
    color: '#5b21b6',
    fontSize: 14,
  },
  userBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: '75%',
  },
  userText: {
    fontSize: 14,
    color: '#1f2937',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 6,
  },
  bottomIndicator: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  indicator: {
    width: 120,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 10,
  },
});
