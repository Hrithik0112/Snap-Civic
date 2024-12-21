import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

interface HeaderProps {
  userName?: string;
}

// Dummy notification data
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Trending Post! 🔥",
    message: "Your report about 'Street Light Repair' is trending in your area",
    time: "2 minutes ago",
    isRead: false,
    type: "trending",
  },
  {
    id: 2,
    title: "New Comment",
    message:
      "Sarah commented: 'Thanks for reporting this issue! It affects many of us.'",
    time: "1 hour ago",
    isRead: false,
    type: "comment",
  },
  {
    id: 3,
    title: "Post Milestone 🎉",
    message: "Your post about 'Park Cleanup' received 50 upvotes!",
    time: "3 hours ago",
    isRead: false,
    type: "milestone",
  },
  {
    id: 4,
    title: "Authority Response",
    message: "City Council has responded to your report about road maintenance",
    time: "5 hours ago",
    isRead: true,
    type: "response",
  },
  {
    id: 5,
    title: "New Upvotes",
    message: "10 people supported your report about 'Public Transport Issue'",
    time: "1 day ago",
    isRead: true,
    type: "upvote",
  },
  {
    id: 6,
    title: "Impact Achievement 🏆",
    message: "Your reports have helped 100+ community members this month!",
    time: "2 days ago",
    isRead: true,
    type: "achievement",
  },
  {
    id: 7,
    title: "Community Support",
    message: "5 neighbors added additional photos to your report",
    time: "3 days ago",
    isRead: true,
    type: "support",
  },
  {
    id: 8,
    title: "Issue Resolved ✅",
    message: "The garbage collection issue you reported has been fixed",
    time: "4 days ago",
    isRead: true,
    type: "resolved",
  },
  {
    id: 9,
    title: "Trending in Community",
    message: "Your post is one of the most viewed reports this week",
    time: "5 days ago",
    isRead: true,
    type: "trending",
  },
  {
    id: 10,
    title: "Similar Reports",
    message: "3 people reported similar issues in your neighborhood",
    time: "1 week ago",
    isRead: true,
    type: "similar",
  },
];

export default function Header({ userName = "J" }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          {/* Left side with logo and name */}
          <View style={styles.leftContainer}>
            <View style={styles.logoContainer}>
              <FontAwesome5 name="leaf" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.logo}>Snap-Civic</Text>
          </View>

          {/* Right side with profile and notification */}
          <View style={styles.rightContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.notificationButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setShowNotifications(true)}
            >
              <FontAwesome5 name="bell" size={20} color="#4CAF50" />
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <View style={styles.badgeBackground}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                </View>
              )}
            </Pressable>

            <Link href="/profile" asChild>
              <Pressable style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      {/* Notifications Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotifications}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.modalTitle}>Notifications</Text>
                <View style={styles.notificationCount}>
                  <Text style={styles.countText}>{NOTIFICATIONS.length}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => setShowNotifications(false)}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <FontAwesome5 name="times" size={20} color="#666" />
              </Pressable>
            </View>

            <ScrollView style={styles.notificationsList}>
              {NOTIFICATIONS.map((notification) => (
                <Pressable
                  key={notification.id}
                  style={({ pressed }) => [
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification,
                    pressed && styles.notificationPressed,
                  ]}
                >
                  <View
                    style={[
                      styles.notificationIcon,
                      !notification.isRead && styles.unreadIcon,
                    ]}
                  >
                    <FontAwesome5
                      name={getNotificationIcon(notification.type)}
                      size={16}
                      color={getNotificationColor(notification.type)}
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {notification.time}
                      </Text>
                    </View>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#f0f7f0",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f0f7f0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: "#e5f1e5",
    transform: [{ scale: 0.98 }],
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeBackground: {
    backgroundColor: "#FF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  notificationCount: {
    backgroundColor: "#f0f7f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 4,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationPressed: {
    backgroundColor: "#f9f9f9",
    transform: [{ scale: 0.995 }],
  },
  unreadNotification: {
    backgroundColor: "#f0f7f0",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  unreadIcon: {
    backgroundColor: "#fff2f2",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
});

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "trending":
      return "fire";
    case "comment":
      return "comment";
    case "milestone":
    case "achievement":
      return "trophy";
    case "response":
      return "reply";
    case "upvote":
      return "thumbs-up";
    case "support":
      return "users";
    case "resolved":
      return "check-circle";
    case "similar":
      return "copy";
    default:
      return "bell";
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "trending":
      return "#FF6B6B";
    case "comment":
      return "#4CAF50";
    case "milestone":
    case "achievement":
      return "#FFD700";
    case "response":
      return "#2196F3";
    case "upvote":
      return "#FF4081";
    case "support":
      return "#9C27B0";
    case "resolved":
      return "#4CAF50";
    case "similar":
      return "#FF9800";
    default:
      return "#4CAF50";
  }
};
