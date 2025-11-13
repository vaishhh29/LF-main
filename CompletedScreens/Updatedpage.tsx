import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

const CompletedBookingScreen2 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { booking } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("./assets/chevron-left.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Booking Details</Text>
            <Text style={styles.headerSubtitle}>
              Booking ID: {booking?.id || "LF123456789"}
            </Text>
          </View>
        </View>

        {/* ---------- TRIP TIMELINE ---------- */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineRow}>
            {/* Start Side */}
            <View style={styles.timelineSide}>
              <Image
                source={require("./assets/up-arrow.png")}
                style={styles.arrowIcon}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.dateText}>
                  {booking?.startDate || "Thu, 12 Feb"}
                </Text>
                <Text style={styles.timeText}>
                  {booking?.startTime || "10:00 AM"}
                </Text>
              </View>
            </View>

            {/* Car in center */}
            <Image source={require("./assets/car.png")} style={styles.carIcon} />

            {/* End Side */}
            <View style={styles.timelineSideRight}>
              <View style={{ marginRight: 8 }}>
                <Text style={styles.dateText}>
                  {booking?.endDate || "Thu, 14 Feb"}
                </Text>
                <Text style={styles.timeText}>
                  {booking?.endTime || "12:00 PM"}
                </Text>
              </View>
              <Image
                source={require("./assets/down-arrow.png")}
                style={styles.arrowIcon}
              />
            </View>
          </View>

          {/* Center progress line */}
          <View style={styles.timeLineProgress}>
            <View style={[styles.dot, { backgroundColor: "#22C55E" }]} />
            <View style={styles.line} />

            <View style={styles.centerContent}>
              <Image
                source={require("./assets/clock.png")}
                style={styles.clockIcon}
              />
              <Text style={styles.durationText}>13h 45m</Text>
            </View>

            <View style={styles.line} />
            <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
          </View>
        </View>

        {/* ---------- USER DETAILS ---------- */}
        <Text style={styles.sectionTitle}>User Details</Text>
      <TouchableOpacity
  style={styles.userCard}
  onPress={() => navigation.navigate("DriverScreen")} 
>
  <Image
    source={booking?.userAvatar || require("./assets/avatar.png")}
    style={styles.userAvatar}
  />
  <Text style={styles.userName}>
    {booking?.userName || "Ranga Raya Reddy"}
  </Text>
  <Image
    source={require("./assets/chevron-left.png")}
    style={styles.arrowRight}
  />
</TouchableOpacity>


        {/* ---------- CAR DETAILS (Tappable Section) ---------- */}
        <TouchableOpacity
          style={[styles.sectionCard, { backgroundColor: "#FFF6F3" }]}
          onPress={() => navigation.navigate("CarDetailsScreen", { booking })}
          activeOpacity={0.8}
        >
          <Text style={styles.sectionTitle}>Car Details</Text>

          <View style={styles.carRow}>
            <Image
              source={require("./assets/carre.png")}
              style={styles.carImage}
            />

            {/* Car Name + Arrow */}
            <View style={styles.carNameRow}>
              <Text style={styles.carName}>
                {booking?.carModel || "Toyota Corolla 2023"}
              </Text>
              <Image
                source={require("./assets/chevron-left.png")}
                style={styles.arrowright}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* ---------- TRIP DETAILS ---------- */}
        <View style={[styles.sectionCard, { backgroundColor: "#FFF6F3" }]}>
          <Text style={styles.sectionTitle}>Trip Details</Text>

          <View style={styles.tripRow}>
            <View style={styles.tripIndicator}>
              <View style={styles.tripCircleActive}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <View style={styles.tripLine} />
              <View style={styles.tripCircleActive}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            </View>

            <View style={styles.tripTextBox}>
              <View style={styles.tripItem}>
                <Text style={styles.tripLabel}>Booking Confirmed</Text>
                <Text style={styles.tripDate}>
                  {booking?.startDate || "Thu, 12 Feb"}
                </Text>
              </View>

              <View style={styles.tripItem}>
                <Text style={styles.tripLabel}>Return & Handover</Text>
                <Text style={styles.tripDate}>
                  {booking?.endDate || "Thu, 14 Feb"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.durationCard}>
            <Text style={styles.durationTitle}>DURATION OF USE</Text>
            <Text style={styles.durationDays}>2 days</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedBookingScreen2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  /** HEADER **/
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  backIcon: { width: 28, height: 28, marginRight: 10 },
  headerTitle: { fontSize: 12, fontWeight: "700", color: "#000" },
  headerSubtitle: { fontSize: 10, color: "#6B7280" },

  /** TIMELINE **/
  timelineCard: {
    backgroundColor: "#F3EDFF",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timelineSide: { flexDirection: "row", alignItems: "center", flex: 1 },
  timelineSideRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  arrowIcon: { width: 22, height: 22, tintColor: "#111827" },
  carIcon: { width: 32, height: 32, tintColor: "#111827", marginHorizontal: 12 },
  dateText: { fontSize: 13, fontWeight: "600", color: "#111827" },
  timeText: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  timeLineProgress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  line: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C4B5FD",
    marginHorizontal: 4,
  },
  centerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  clockIcon: {
    width: 16,
    height: 16,
    tintColor: "#6D38E8",
    marginRight: 6,
  },
  durationText: { fontSize: 12, fontWeight: "500", color: "#111827" },

  /** USER CARD **/
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  userAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { flex: 1, fontSize: 14, fontWeight: "600", color: "#111827" },
  arrowRight: { width: 20, height: 20, transform: [{ rotate: "180deg" }] },
  arrowright:{ width: 20, height: 20, transform: [{ rotate: "180deg" }],marginLeft:70 },

  /** SECTION CARD **/
  sectionCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  carRow: { flexDirection: "row", alignItems: "center" },
  carImage: { width: 80, height: 50, borderRadius: 6, marginRight: 12 },

  /** Car Name + Arrow **/
  carNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  carName: { fontSize: 16, fontWeight: "600", color: "#000" },
  carArrowIcon: {
    width: 18,
    height: 18,
    tintColor: "#6D38E8",
    marginLeft: 8,
    marginTop: 2,
  },

  /** TRIP DETAILS **/
  tripRow: { flexDirection: "row", marginTop: 8 },
  tripIndicator: { alignItems: "center" },
  tripCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6D38E8",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: { color: "#FFF", fontWeight: "700" },
  tripLine: { width: 2, height: 40, backgroundColor: "#6D38E8" },
  tripTextBox: { marginLeft: 12, justifyContent: "space-between" },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 8,
  },
  tripLabel: { fontSize: 14, color: "#000", fontWeight: "500" },
  tripDate: { fontSize: 13, color: "#8E8E93" },
  durationCard: {
    backgroundColor: "#E9E8FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 12,
  },
  durationTitle: { color: "#6D38E8", fontWeight: "500", fontSize: 13 },
  durationDays: { fontSize: 18, fontWeight: "700", color: "#6D38E8" },
});
