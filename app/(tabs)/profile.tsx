import { useState } from "react";
import { Text, View } from "@/components/Themed";
import { resetAndNavigateTo } from "@/utils/Navigation";
import { StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Card } from "@/components/Card";
import { savedData, trendingData } from "@/utils/MockData";

// Add this dummy data
const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  location: "New York, USA",
};

// Add TabSection component
const TabSection = () => {
  const [activeTab, setActiveTab] = useState("important");

  return (
    <View style={styles.tabSection}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "important" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("important")}
        >
          <FontAwesome
            name="star"
            size={20}
            color={activeTab === "important" ? "#4CAF50" : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "important" && styles.activeTabText,
            ]}
          >
            Important
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === "activity" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("activity")}
        >
          <FontAwesome
            name="bell"
            size={20}
            color={activeTab === "activity" ? "#4CAF50" : "#666"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "activity" && styles.activeTabText,
            ]}
          >
            Activity
          </Text>
        </Pressable>
      </View>

      <View style={styles.feedContainer}>
        {activeTab === "important" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.feedContent}
          >
            {savedData.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <Card
                  userName={item.userName}
                  avatarUrl={item.avatarUrl}
                  postedDate={item.postedDate}
                  imageUrl={item.imageUrl}
                  location={item.location}
                  title={item.title}
                  description={item.description}
                  upvotes={item.upvotes}
                  comments={item.comments}
                  isBookmarked={true}
                  onBookmark={() => {}}
                  onMenu={() => {}}
                  onReadMore={() => {}}
                  onUpvote={() => {}}
                  onComment={() => {}}
                  onShare={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.feedContent}
          >
            {trendingData.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <Card
                  userName={item.userName}
                  avatarUrl={item.avatarUrl}
                  postedDate={item.postedDate}
                  imageUrl={item.imageUrl}
                  location={item.location}
                  title={item.title}
                  description={item.description}
                  upvotes={item.upvotes}
                  isUpvoted={true}
                  comments={item.comments}
                  onBookmark={() => {}}
                  onMenu={() => {}}
                  onReadMore={() => {}}
                  onUpvote={() => {}}
                  onComment={() => {}}
                  onShare={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const firstLetter = USER_DATA.name.charAt(0);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.insideContainer}>
        {/* Profile Row */}
        <View style={styles.profileRow}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
            <Text style={styles.title}>{USER_DATA.name}</Text>
          </View>

          <View style={styles.profileRight}>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{USER_DATA.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{USER_DATA.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{USER_DATA.location}</Text>
              </View>
            </View>
            
          </View>
        </View>
        <Pressable
              onPress={() => {
                resetAndNavigateTo("/(auth)/login");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>

        {/* Tab Section */}
        <TabSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  insideContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  profileRow: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileLeft: {
    alignItems: "center",
    paddingRight: 20,
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
  profileRight: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 6,
    flexWrap: "wrap",
    alignItems: "center",
  },
  label: {
    width: 70,
    fontWeight: "600",
    color: "#666",
    fontSize: 14,
    marginRight: 8,
  },
  value: {
    color: "#333",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#ffc700",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 20,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "white",
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
  tabSection: {
    flex: 1,
    width: "100%",
  },
  feedContainer: {
    flex: 1,
    marginTop: 10,
  },
  feedContent: {

    gap: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});
