import { StyleSheet, ScrollView } from "react-native";
import { View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";
import { trendingData } from "@/utils/MockData";

export default function TrendingScreen() {
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.insideContainer}>
          {trendingData.map((item) => (
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
    backgroundColor: "white",


  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 0,
  },
  insideContainer: {
    padding: 16,
    gap: 16,
  },
});
