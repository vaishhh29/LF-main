import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react-native';

const PrivacyPolicyScreen = ({ navigation }) => {
  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    eligibility: true,
    cancellation: false,
    breakdown: false,
    mileage: false,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Policy sections data
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

      {/* Status Bar */}
      <View style={styles.statusBar}>
        
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy policy</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {policySections.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            {/* Section Header */}
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionTitleContainer}>
                <View style={styles.purpleDot} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {expandedSections[section.id] ? (
                <ChevronUp size={20} color="#9CA3AF" />
              ) : (
                <ChevronDown size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>

            {/* Section Content (Expandable) */}
            {expandedSections[section.id] && (
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.contentItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.contentText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalBars: {
    flexDirection: 'row',
    gap: 2,
  },
  bar: {
    width: 2,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  icon: {
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  purpleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  sectionContent: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 20,
  },
  contentItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#374151',
    marginRight: 8,
    marginTop: 2,
  },
  contentText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default PrivacyPolicyScreen