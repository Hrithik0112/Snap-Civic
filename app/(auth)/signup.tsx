import { useState } from "react";
import { StyleSheet, TextInput, Pressable, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

type LocationData = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<LocationData>({
    address: "",
    coordinates: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // Add your signup logic here
    router.push("/verify");
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });

      if (address[0]) {
        const {
          street,
          streetNumber,
          district,
          city,
          subregion,
          region,
          country,
          postalCode,
        } = address[0];

        const formattedAddress = [
          streetNumber,
          street,
          district,
          city,
          subregion,
          region,
          country,
          postalCode,
        ]
          .filter(Boolean) // Remove null/undefined values
          .join(", ")
          .replace(/,\s*,/g, ",") // Clean up multiple commas
          .replace(/,\s*$/, ""); // Remove trailing comma

        const locationData = {
          address: formattedAddress,
          coordinates: {
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          },
        };

        setLocation(locationData);
        console.log("Location Data:", locationData);
      }
    } catch (error) {
      alert("Error getting location");
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    location.address.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#666"
            />
          </Pressable>
        </View>

        <View style={styles.locationContainer}>
          <TextInput
            style={styles.locationInput}
            placeholder="Location"
            value={location.address}
            onChangeText={(text) => setLocation({ ...location, address: text })}
            autoCapitalize="words"
          />
          <Pressable onPress={getCurrentLocation} style={styles.locationIcon}>
            <FontAwesome name="location-arrow" size={20} color="#666" />
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text style={styles.link}>Already have an account? Login</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#4CAF50",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  locationContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  locationIcon: {
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
});
