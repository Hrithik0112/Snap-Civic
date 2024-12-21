import { useEffect } from "react";
import { StyleSheet, Animated, View, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const sloganOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      // Logo animation
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Text animation
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Slogan animation
      Animated.timing(sloganOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Delay before completing
      setTimeout(onComplete, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <FontAwesome5 name="leaf" size={60} color="#4CAF50" />
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
          },
        ]}
      >
        <Animated.Text style={styles.snapText}>Snap</Animated.Text>
        <Animated.Text style={styles.civicText}>Civic</Animated.Text>
      </Animated.View>
      <Animated.Text
        style={[
          styles.sloganText,
          {
            opacity: sloganOpacity,
          },
        ]}
      >
        For the people, by the people
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "#f0f7f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  snapText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  civicText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4CAF50",
  },
  sloganText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});
