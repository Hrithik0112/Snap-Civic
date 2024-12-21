import { useState, useRef } from "react";
import { StyleSheet, FlatList, Animated } from "react-native";
import { View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { feedData } from "@/utils/MockData";
import { CardProps } from "@/utils/type";

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [upvotedPosts, setUpvotedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [feedItems, setFeedItems] = useState(feedData);
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({});

  // Initialize animated values for each post
  feedItems.forEach((item) => {
    if (!animatedValues.current[item.id]) {
      animatedValues.current[item.id] = new Animated.Value(0);
    }
  });

  const handleUpvote = (postId: string) => {
    const isCurrentlyUpvoted = upvotedPosts.includes(postId);

    // Animate the number
    Animated.sequence([
      Animated.timing(animatedValues.current[postId], {
        toValue: isCurrentlyUpvoted ? 1 : -1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.current[postId], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Update upvoted posts state
    setUpvotedPosts((prev) => {
      if (isCurrentlyUpvoted) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });

    // Update feed items with new upvote count
    setFeedItems((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          return {
            ...item,
            upvotes: isCurrentlyUpvoted ? item.upvotes - 1 : item.upvotes + 1,
          };
        }
        return item;
      })
    );
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const renderItem = ({ item }: { item: CardProps }) => {
    const translateY = animatedValues.current[item.id].interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [20, 0, -20], // Slide up/down by 20 units
    });

    const opacity = animatedValues.current[item.id].interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 1, 0],
    });

    return (
      <Card
        key={item.id}
        {...item}
        isUpvoted={upvotedPosts.includes(item.id)}
        isBookmarked={bookmarkedPosts.includes(item.id)}
        onUpvote={() => handleUpvote(item.id)}
        onBookmark={() => handleBookmark(item.id)}
        onMenu={() => console.log("Menu:", item.id)}
        onReadMore={() => console.log("Read more:", item.id)}
        onComment={() => console.log("Comment:", item.id)}
        onShare={() => console.log("Share:", item.id)}
        upvoteAnimation={{ translateY, opacity }}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <FlatList
        data={feedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.insideContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
  },
  insideContainer: {
    padding: 16,
    gap: 16,
  },
});
