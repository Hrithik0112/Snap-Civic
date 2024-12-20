import { StyleSheet, ScrollView } from "react-native";
import { View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { savedData } from "@/utils/MockData";

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.insideContainer}>
          {savedData.map((item) => (
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
              onBookmark={() => console.log("Bookmark:", item.id)}
              onMenu={() => console.log("Menu:", item.id)}
              onReadMore={() => console.log("Read more:", item.id)}
              onUpvote={() => console.log("Upvote:", item.id)}
              onComment={() => console.log("Comment:", item.id)}
              onShare={() => console.log("Share:", item.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  insideContainer: {
    padding: 16,
    gap: 16,
  },
});
