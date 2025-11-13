import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

const DriverScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require("./assets/chevron-left.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <Image
              source={require("./assets/avatar1.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>Ranga raya reddy</Text>
              <Text style={styles.phoneNumber}>+91 9827473853</Text>
            </View>
          </View>

          <Text style={styles.memberSince}>Member since July 2017</Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>27</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Confirmed email</Text>
            <Image
              source={require("./assets/check-circle.png")}
              style={styles.icon}
            />
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Confirmed phone number</Text>
            <Image
              source={require("./assets/check-circle.png")}
              style={styles.icon}
            />
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trips taken so far</Text>
            <Text style={styles.detailValue}>15</Text>
          </View>
        </View>
       <TouchableOpacity
        style={styles.reportContainer}
      onPress={() => navigation.navigate("ReportItemsScreen")}
      >
        <Image
          source={require("./assets/alert-sign.png")}
          style={styles.reportIcon}
        />
        <Text style={styles.reportText}>Report This Member</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    marginLeft: 20,
    marginTop: 20,
  },
  backIcon: {
    width: 26,
    height: 26,
    tintColor: "#000",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 40,
    elevation: 2,
    borderColor:'#E0E0E0'
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#000000",
    marginTop: 2,
  },
  memberSince: {
    fontSize: 15,
    color: "#000000",
    marginTop: 6,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
    marginBottom:-3
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    alignItems: "center",
    
  },
  detailLabel: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  icon: {
    width: 15,
    height: 15,
  
  },
  reportContainer: {
    backgroundColor: "#FFF9F9",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  reportIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  reportText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",

  },
});

export default DriverScreen;
