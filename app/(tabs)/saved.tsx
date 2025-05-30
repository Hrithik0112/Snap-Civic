import { StyleSheet, FlatList } from "react-native";
import { View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { savedData } from "@/utils/MockData";
import { useState } from "react";

export default function SavedScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    // For example, fetch new saved data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card
      key={item.id}
      userName={item.userName}
      avatarUrl={item.avatarUrl}
      postedDate={item.postedDate}
      imageUrl={item.imageUrl}
      location={item.location}
      title={item.title}
      description={item.description}
      upvotes={item.upvotes}
      isBookmarked={true}
      comments={item.comments}
      distance={item.distance}
      status={item.status}
      category={item.category}
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
        data={savedData}
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
    backgroundColor: "#f5f5f5",
  },
  insideContainer: {
    padding: 16,
    gap: 16,
  },
});
