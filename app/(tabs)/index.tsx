import { StyleSheet, FlatList } from "react-native";
import { View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { feedData } from "@/utils/MockData";
import { useState } from "react";
import { CardProps } from "@/utils/type";

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    // For example, fetch new data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }: { item: CardProps }) => (
    <Card
      key={item.id}
      userName={item.userName}
      avatarUrl={item.avatarUrl}
      postedDate={item.postedDate}
      imageUrl={item.imageUrl}
      location={item.location}
      distance={item.distance}
      title={item.title}
      status={item.status}
      category={item.category}
      description={item.description}
      upvotes={item.upvotes}
      comments={item.comments}
      onBookmark={() => console.log("Bookmark:", item.id)}
      onMenu={() => console.log("Menu:", item.id)}
      onReadMore={() => console.log("Read more:", item.id)}
      onUpvote={() => console.log("Upvote:", item.id)}
      onComment={() => console.log("Comment:", item.id)}
      onShare={() => console.log("Share:", item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <FlatList
        data={feedData}
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
    backgroundColor: "#f5f5f5", // Light gray background
  },
  scrollView: {
    flex: 1,
  },
  insideContainer: {
    padding: 16,
    gap: 16, // Adds space between cards
  },
});
