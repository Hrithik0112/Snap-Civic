import { useState } from "react";
import { Text, View } from "@/components/Themed";
import { resetAndNavigateTo } from "@/utils/Navigation";
import { StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Card } from "@/components/Card";
import { savedData, trendingData } from "@/utils/MockData";
import { mockUserProfile } from "@/utils/MockProfile";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("important");
  const firstLetter = mockUserProfile.name.charAt(0);

  const handleLogout = () => {
    resetAndNavigateTo("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.insideContainer} stickyHeaderIndices={[4]}>
        {/* Header with Logout */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <FontAwesome name="sign-out" size={18} color="#FF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{mockUserProfile.name}</Text>
            <Text style={styles.userJoinDate}>
              Member since {mockUserProfile.joinedDate}
            </Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mockUserProfile.issuesReported}
              </Text>
              <Text style={styles.statLabel}>Reports</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mockUserProfile.issuesResolved}
              </Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mockUserProfile.reputation}
              </Text>
              <Text style={styles.statLabel}>Reputation</Text>
            </View>
          </View>
        </View>

        {/* Contact Info Card */}
        <View style={styles.contactCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {[
            { icon: "envelope", value: mockUserProfile.email },
            { icon: "user", value: mockUserProfile.role },
            { icon: "map-marker", value: mockUserProfile.location },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <FontAwesome name={item.icon as any} size={16} color="#4CAF50" />
              <Text style={styles.infoText}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Badges Section */}
        <View style={styles.badgesCard}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesContainer}>
            {mockUserProfile.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sticky Tabs Section */}
        <View style={styles.stickyHeader}>
          <View style={styles.tabContainer}>
            {[
              { id: "important", icon: "star", label: "Important" },
              { id: "activity", icon: "history", label: "Activity" },
            ].map((tab) => (
              <Pressable
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <FontAwesome
                  name={tab.icon as "star" | "history"}
                  size={20}
                  color={activeTab === tab.id ? "#4CAF50" : "#666"}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Scrollable Content */}
        <View style={styles.feedContainer}>
          {(activeTab === "important" ? savedData : trendingData).map(
            (item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <Card {...item} />
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  insideContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    borderRadius: 8,
    backgroundColor: "#FFF2F2",
  },
  logoutText: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  userInfo: {
    marginTop: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  userJoinDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 16,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  buttonPressed: {
    backgroundColor: "#e5e5e5",
    transform: [{ scale: 0.98 }],
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  stickyHeader: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  feedContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  badgesCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#f0f9f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  badgeText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "500",
  },
});
