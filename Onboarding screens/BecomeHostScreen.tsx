import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BecomeHostScreen = () => {
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(null);

  const handleGetStarted = () => {
    navigation.navigate('PersonalDetails');
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const steps = [
    {
      number: 1,
      title: 'Build your profile',
      description: 'Add car and personal details',
    },
    {
      number: 2,
      title: 'Fill your car details',
      description: 'Check car eligibility',
    },
    {
      number: 3,
      title: 'Set your controls',
      description: 'Control your pricing, delivery etc.',
    },
    {
      number: 4,
      title: 'Share your car & earn',
      description: 'Get bookings & build your business',
    },
  ];

  const faqs = [
    { 
      id: 'earnings', 
      title: 'Earnings & Payments', 
      icon: require('./assets/earnings-icon.png')
    },
    { 
      id: 'safety', 
      title: 'Car Safety', 
      icon: require('./assets/safety-icon.png')
    },
    { 
      id: 'convenience', 
      title: 'Car Sharing Convenience', 
      icon: require('./assets/convenience-icon.png')
    },
    { 
      id: 'policies', 
      title: 'Policies', 
      icon: require('./assets/policies-icon.png')
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('./assets/Background.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Become a Host</Text>
          <Text style={styles.heroSubtitle}>
            Got questions about renting or leasing a{'\n'}car? We're here to assist you!
          </Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedText}>Get Started</Text>
              <Text style={styles.arrow}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* How to Get Started Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>HOW TO GET STARTED</Text>
          <View style={styles.sectionLine} />
        </View>
        
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={step.number} style={styles.stepWrapper}>
              <View style={styles.stepRow}>
                <View style={styles.stepLeftColumn}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{step.number}</Text>
                  </View>
                  {index < steps.length - 1 && (
                    <View style={styles.connector} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Learn from the Best Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>LEARN FROM THE BEST</Text>
          <View style={styles.sectionLine} />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
          contentContainerStyle={styles.cardsContentContainer}
        >
          <View style={styles.card}>
            <Image
              source={require('./assets/car-image.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardCategory}>Design</Text>
                <Text style={styles.readTime}>2 min read</Text>
              </View>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Hosting the Car</Text>
                <Text style={styles.cardArrow}>↗</Text>
              </View>
              <Text style={styles.cardDescription}>
                Writing a great bio and setup expectations with guests
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={require('./assets/car-image.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardCategory}>Development</Text>
                <Text style={styles.readTime}>3 min read</Text>
              </View>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Building Revenue</Text>
                <Text style={styles.cardArrow}>↗</Text>
              </View>
              <Text style={styles.cardDescription}>
                Strategies for maximizing performance
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* FAQ Section */}
      <View style={[styles.section, styles.faqSection]}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>HAVE OTHER QUERIES?</Text>
          <View style={styles.sectionLine} />
        </View>
        
        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleSection(faq.id)}
            >
              <View style={styles.faqLeft}>
                <Image source={faq.icon} style={styles.faqIcon} />
                <Text style={styles.faqTitle}>{faq.title}</Text>
              </View>
              <Text style={styles.faqChevron}>
                {expandedSection === faq.id ? '⌄' : '⌄'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.questionsButton}>
          <Text style={styles.questionsButtonText}>STILL HAVE QUESTIONS</Text>
          <Text style={styles.questionsArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BecomeHostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  heroSection: {
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
    height: 260,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 24,
  },
  getStartedButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  button: {
    paddingTop: 50,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 6,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 1.5,
    paddingHorizontal: 16,
  },
  stepsContainer: {
    paddingHorizontal: 8,
  },
  stepWrapper: {
    marginBottom:10,
  },
  stepRow: {
    flexDirection: 'row',
  },
  stepLeftColumn: {
    alignItems: 'center',
    marginRight: 20,
  },
  stepNumberContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  connector: {
    width: 3,
    flex: 1,
    backgroundColor: '#1F2937',
    marginTop: 8,
    minHeight: 60,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  cardsContainer: {
    marginTop: 12,
    paddingBottom: 20,
  },
  cardsContentContainer: {
    paddingRight: 24,
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7C3AED',
  },
  readTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  cardArrow: {
    fontSize: 26,
    color: '#1F2937',
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  faqSection: {
    paddingBottom: 40,
  },
  faqContainer: {
    marginTop: 12,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqIcon: {
    width: 28,
    height: 28,
    marginRight: 14,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  faqChevron: {
    fontSize: 22,
    color: '#4B5563',
    fontWeight: '600',
  },
  questionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    marginTop: 16,
  },
  questionsButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.8,
    marginRight: 8,
  },
  questionsArrow: {
    fontSize: 20,
    color: '#1F2937',
    fontWeight: '700',
  },
});
