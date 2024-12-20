import { Text, View } from "@/components/Themed";
import { resetAndNavigateTo } from "@/utils/Navigation";
import { Link } from "expo-router";
import { Route } from "expo-router/build/Route";
import { Button, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Add this dummy data
const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  location: "New York, USA",
};

export default function ProfileScreen() {
  const firstLetter = USER_DATA.name.charAt(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        <Text style={styles.title}>{USER_DATA.name}</Text>

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

        <Pressable
          onPress={() => {
            resetAndNavigateTo("/(auth)/login");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    width: "100%",
    marginVertical: 30,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    flex: 1,
    fontWeight: "600",
    color: "#666",
  },
  value: {
    flex: 2,
    color: "#333",
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ffc700",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});
