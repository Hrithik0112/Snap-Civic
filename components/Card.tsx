import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { DiscussionModal } from "@/components/CommentsModal";
import { useState } from "react";
import { getStatusColor, getCategoryIcon } from "@/utils/MockData";

type CardProps = {
  userName: string;
  avatarUrl: string;
  postedDate: string;
  imageUrl: string;
  location: string;
  title: string;
  description: string;
  upvotes: number;
  comments: number;
  distance: string;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED";
  category: "ROAD" | "WASTE" | "LIGHTING" | "WATER" | "PARK" | "SAFETY";
  isBookmarked?: boolean;
  isUpvoted?: boolean;
  onBookmark?: () => void;
  onMenu?: () => void;
  onReadMore?: () => void;
  onUpvote?: () => void;
  onComment?: () => void;
  onShare?: () => void;
};

export const Card = ({
  userName,
  avatarUrl,
  postedDate,
  imageUrl,
  location,
  title,
  description,
  upvotes,
  comments,
  distance,
  status,
  category,
  isBookmarked,
  isUpvoted,
  onBookmark,
  onMenu,
  onReadMore,
  onUpvote,
  onComment,
  onShare,
}: CardProps) => {
  const [showComments, setShowComments] = useState(false);

  const getStatusText = (status: string) => {
    switch (status) {
      case "REPORTED":
        return "Issue Reported";
      case "IN_PROGRESS":
        return "In Progress";
      case "RESOLVED":
        return "Resolved";
      default:
        return status;
    }
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.postedDate}>{postedDate}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onBookmark}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarked ? "#4CAF50" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Status and Category */}
      <View style={styles.metaContainer}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(status)}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <FontAwesome5
            name={getCategoryIcon(category)}
            size={12}
            color="#666"
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Main Image */}
      <Image source={{ uri: imageUrl }} style={styles.mainImage} />

      {/* Location and Distance */}
      <View style={styles.locationContainer}>
        <View style={styles.location}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.distance}>
          <Ionicons name="navigate-outline" size={14} color="gray" />
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.cardTitle}>{title}</Text>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
        <TouchableOpacity onPress={onReadMore}>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.footerButton} onPress={onUpvote}>
            <Ionicons
              name={isUpvoted ? "arrow-up" : "arrow-up-outline"}
              size={24}
              color={isUpvoted ? "#4CAF50" : "black"}
            />
            <Text style={styles.footerText}>{upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setShowComments(true)}
          >
            <Ionicons name="chatbubble-outline" size={24} color="black" />
            <Text style={styles.footerText}>{comments}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-social-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <DiscussionModal
        isVisible={showComments}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 12,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postedDate: {
    color: "gray",
    fontSize: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginLeft: 16,
  },
  mainImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "gray",
    marginLeft: 4,
    fontSize: 13,
  },
  distance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    color: "gray",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    color: "#666",
    lineHeight: 20,
  },
  readMore: {
    color: "#007AFF",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  footerText: {
    marginLeft: 4,
    color: "gray",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
