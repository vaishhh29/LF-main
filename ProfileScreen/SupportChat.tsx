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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function SupportChat() {
  const navigation = useNavigation();
  const [messages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello, How can I help you?',
      subtext: 'Please select an option',
      options: [
        'I have a question about a booking',
        'I want to know about the lea-flexi services',
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
      text: 'Hello, How can I help you?',
      subtext: 'Please select an option',
      options: [
        'I have a question about a booking',
        'I want to know about the lea-flexi services',
      ],
    },
  ]);

  const handleOptionClick = (option) => {
    console.log('Selected option:', option);
  };

  return (
    <SafeAreaView style={styles.container}>
      

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

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('FQA')}>
          <View style={styles.iconCircle}>
            <Image
              source={require('./assets/faq.png')}
              style={styles.actionIcon}
            />
          </View>
          <Text style={styles.actionText}>FAQs</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Section */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.todayContainer}>
          <View style={styles.line} />
          <Text style={styles.todayText}>Today</Text>
          <View style={styles.line} />
        </View>

        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            {message.type === 'bot' ? (
              <View style={styles.botMessageContainer}>
                <Image source={require('./assets/bot.png')} style={styles.avatar} />
                <View style={styles.botContent}>
                  <View style={styles.botBubble}>
                    <Text style={styles.botText}>{message.text}</Text>
                  </View>
                  {message.subtext && (
                    <View style={styles.botBubble}>
                      <Text style={styles.botSubtext}>{message.subtext}</Text>
                    </View>
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

// --------------------- STYLES ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginTop:10
  },
  actionButton: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#F1EDFC',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  actionText: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000',
  },

  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginTop:20
  },

  todayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,

  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todayText: {
    marginHorizontal: 10,
    color: '#000000',
    fontSize: 14,
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

  botBubble: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    maxWidth: '75%',
  },
  botText: {
    fontSize: 14,
    color: '#1f2937',
  },
  botSubtext: {
    fontSize: 13,
    color: '#1f2937',
  },

  optionsContainer: {
    flexDirection: 'column',
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: '#D3C7F6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  optionText: {
    color: '#2E1065',
    fontSize: 13,
    fontWeight: '500',
  },

  userBubble: {
    backgroundColor: '#F1EDFC',
    borderRadius: 12,
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
