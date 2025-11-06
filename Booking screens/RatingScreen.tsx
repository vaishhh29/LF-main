import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const RatingScreen = ({ navigation }) => {
  const ratingsSummary = [
    { label: 'Excellent', count: 27 },
    { label: 'Good', count: 6 },
    { label: 'Okay', count: 1 },
    { label: 'Disappointing', count: 0 },
    { label: 'Very disappointing', count: 1 },
  ];

  const reviews = [
    {
      id: '1',
      name: 'Raman',
      rating: 'Good',
      comment: 'Good drive carefully he is very brave boy',
      date: 'Jul 2025',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
    {
      id: '2',
      name: 'Raman',
      rating: 'Good',
      comment: 'Good drive carefully he is very brave boy',
      date: 'Jul 2025',
      avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
      id: '3',
      name: 'Raman',
      rating: 'Good',
      comment: 'Good drive carefully he is very brave boy',
      date: 'Jul 2025',
      avatar: 'https://i.pravatar.cc/100?img=6',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Image
              source={require('./assets/chevron-left.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Main Box */}
        <View style={styles.mainBox}>
          <Text style={styles.title}>Ratings</Text>

          {/* Rating Summary */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingHeaderRow}>
              
              <Text style={styles.ratingScore}>4.7/5 {''}</Text>
              <Image
                source={require('./assets/star.png')}
                style={styles.starIcon}
              />
            </View>
            <Text style={styles.ratingCount}>35 ratings</Text>
           <View style={styles.divider} />
            {ratingsSummary.map((item, index) => (
              <View key={index} style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>{item.label}</Text>
                <Text style={styles.ratingNumber}>{item.count}</Text>
              </View>
            ))}
          </View>

          {/* Reviews */}
          {reviews.map((item) => (
            <View key={item.id} style={styles.reviewContainer}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Image
                  source={require('./assets/next-button.png')}
                  style={styles.chevronIcon}
                />
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewRating}>{item.rating}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
    marginTop:40
  },
  header: {
    marginBottom: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    marginBottom:30
  },
  mainBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
    marginBottom: 26,
  },
  ratingSection: {
    backgroundColor: '#FFF9F9',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  ratingHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
    color:'#2F2F2F'
  },
  ratingScore: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  ratingCount: {
    fontSize: 13,
    color: '#6F6F6F',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    height:30
  },
  ratingLabel: {
    fontSize: 14,
    color: '#000',
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  reviewContainer: {
    marginBottom: 14,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: '#999',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginLeft: 44,
  },
  reviewRating: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewComment: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginLeft: 44,
    marginTop: 2,
  },
});
