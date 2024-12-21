import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// Mock discussions data
const MOCK_DISCUSSIONS = [
  {
    id: 1,
    userName: "Arun Patel",
    userRole: "RWA President",
    message:
      "This is a serious concern for our locality. I've noticed similar issues in B and C blocks. I'll coordinate with the Municipal Corporation to expedite this.",
    time: "2h ago",
    upvotes: 24,
    replies: 3,
    isVerified: true,
  },
  {
    id: 2,
    userName: "Priya Menon",
    userRole: "Local Resident",
    message:
      "I've been documenting this issue for the past week. The situation gets worse during peak hours. Here's what I've observed...",
    time: "3h ago",
    upvotes: 15,
    replies: 2,
  },
  {
    id: 3,
    userName: "Rajesh Kumar",
    userRole: "Municipal Officer",
    message:
      "Thank you for raising this concern. Our inspection team will visit the site tomorrow morning. We will update the status once assessed.",
    time: "5h ago",
    upvotes: 32,
    replies: 5,
    isOfficial: true,
  },
  {
    id: 4,
    userName: "Suresh Iyer",
    userRole: "Society Secretary",
    message:
      "This is affecting multiple streets in our society. We've compiled a detailed report with photographs. Will share it with concerned authorities.",
    time: "1d ago",
    upvotes: 18,
    replies: 4,
  },
  {
    id: 5,
    userName: "Meera Reddy",
    userRole: "Ward Committee Member",
    message:
      "We discussed this in our last ward meeting. Budget has been allocated for repairs. Work should begin next week.",
    time: "1d ago",
    upvotes: 27,
    replies: 6,
    isVerified: true,
  },
];

interface DiscussionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function DiscussionModal({ isVisible, onClose }: DiscussionModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerBar} />
            <Text style={styles.modalTitle}>Discussion</Text>
            <Text style={styles.discussionCount}>
              {MOCK_DISCUSSIONS.length} responses
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <FontAwesome5 name="times" size={20} color="#666" />
            </Pressable>
          </View>

          {/* Discussions List */}
          <ScrollView style={styles.discussionList}>
            {MOCK_DISCUSSIONS.map((discussion) => (
              <View key={discussion.id} style={styles.discussionItem}>
                <View
                  style={[
                    styles.userAvatar,
                    discussion.isOfficial && styles.officialAvatar,
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {discussion.userName.charAt(0)}
                  </Text>
                  {discussion.isVerified && (
                    <View style={styles.verifiedBadge}>
                      <FontAwesome5 name="check" size={8} color="#fff" />
                    </View>
                  )}
                </View>
                <View style={styles.discussionContent}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{discussion.userName}</Text>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleText}>{discussion.userRole}</Text>
                    </View>
                  </View>
                  <Text style={styles.messageText}>{discussion.message}</Text>
                  <View style={styles.discussionFooter}>
                    <Text style={styles.timeText}>{discussion.time}</Text>
                    <View style={styles.actionButtons}>
                      <Pressable style={styles.actionButton}>
                        <FontAwesome5 name="arrow-up" size={14} color="#666" />
                        <Text style={styles.actionText}>
                          {discussion.upvotes}
                        </Text>
                      </Pressable>
                      <Pressable style={styles.actionButton}>
                        <FontAwesome5 name="reply" size={14} color="#666" />
                        <Text style={styles.actionText}>
                          {discussion.replies}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add to the discussion..."
              placeholderTextColor="#999"
              multiline
            />
            <Pressable style={styles.sendButton}>
              <FontAwesome5 name="paper-plane" size={16} color="#4CAF50" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerBar: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  discussionCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 8,
  },
  discussionList: {
    padding: 16,
  },
  discussionItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  officialAvatar: {
    backgroundColor: "#2196F3",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  verifiedBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  discussionContent: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
    marginRight: 8,
  },
  roleBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  discussionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    padding: 8,
  },
});
