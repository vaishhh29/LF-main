import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

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
    avatar: 'https://i.pravatar.cc/100?img=3', // placeholder image
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

const RatingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Rating Summary */}
        <View style={styles.card}>
          <Text style={styles.title}>Ratings</Text>

          <View style={styles.ratingBox}>
            <Text style={styles.ratingValue}>4.7/5 <Feather name="star" size={18} color="#FFD700" /></Text>
            <Text style={styles.ratingCount}>35 ratings</Text>
          </View>

          {ratingsSummary.map((item, index) => (
            <View key={index} style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>{item.label}</Text>
              <Text style={styles.ratingNumber}>{item.count}</Text>
            </View>
          ))}
        </View>

        {/* Reviews */}
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Text style={styles.reviewRating}>{item.rating}</Text>
                </View>
                <Text style={styles.reviewDate}>{item.date}</Text>
                <Feather name="chevron-right" size={18} color="#999" />
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  ratingBox: {
    backgroundColor: '#FFF6F6',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  ratingCount: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  ratingLabel: {
    fontSize: 15,
    color: '#000',
  },
  ratingNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  reviewRating: {
    fontSize: 13,
    color: '#666',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginRight: 6,
  },
  reviewComment: {
    fontSize: 13,
    color: '#444',
    marginLeft: 50,
  },
});
