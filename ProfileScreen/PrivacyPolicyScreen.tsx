import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const PrivacyPolicyScreen = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    eligibility: true,
    cancellation: false,
    breakdown: false,
    mileage: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const policySections = [
    {
      id: 'eligibility',
      title: 'Eligibility Criteria',
      content: [
        'The renter must be at least 21 years old (age may vary for premium cars).',
        'A valid driving license (original) must be presented before pickup.',
        'International travelers must provide a passport and International Driving Permit (IDP) if applicable.',
        'The renter must have a clean driving record (excessive traffic violations may lead to rejection).',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Refund Policy',
      content: [
        'Free cancellation up to 24 hours before pickup time.',
        '50% refund for cancellations made within 24 hours of pickup.',
        'No refund for cancellations made less than 2 hours before pickup.',
        'Host cancellations will result in full refund plus compensation.',
      ],
    },
    {
      id: 'breakdown',
      title: 'Breakdown & Emergency Assistance',
      content: [
        '24/7 roadside assistance available for all rentals.',
        'Free towing service within 50km radius.',
        'Emergency contact numbers provided at pickup.',
        'Replacement vehicle provided for breakdowns exceeding 4 hours.',
      ],
    },
    {
      id: 'mileage',
      title: 'Mileage Limit & Extra Charges',
      content: [
        'Standard rental includes 200km per day.',
        'Additional mileage charged at ₹8 per km.',
        'Unlimited mileage packages available for long-term rentals.',
        'Mileage is calculated based on odometer readings at pickup and return.',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require('./assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {policySections.map((section) => (
          <View key={section.id} style={styles.card}>
            {/* Section Header */}
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              {/* Left Side: Gradient Dot + Title */}
              <View style={styles.sectionTitleContainer}>
                <LinearGradient
                  colors={['#2133D6', '#7D21CF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.purpleDot}
                />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {/* Right Side: Arrow */}
              {expandedSections[section.id] ? (
                <ChevronUp size={18} color="#9CA3AF" />
              ) : (
                <ChevronDown size={18} color="#9CA3AF" />
              )}
            </TouchableOpacity>

            {/* Section Content */}
            {expandedSections[section.id] && (
              <>
                <View style={styles.hrLine} />
                <View style={styles.sectionContent}>
                  {section.content.map((item, index) => (
                    <View key={index} style={styles.contentItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.contentText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  backButton: {
    marginRight: 8,
  },
  backIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  purpleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4D4D4D',
    marginTop:5,
    marginBottom:5
  },
  hrLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  sectionContent: {
    paddingBottom: 14,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 6,
  },
  bullet: {
    fontSize: 20,
    color: '#4D4D4D',
    marginRight: 8,
  },
  contentText: {
    flex: 1,
    fontSize: 14,
    color: '#4D4D4D',
    lineHeight: 26,
  },
});
