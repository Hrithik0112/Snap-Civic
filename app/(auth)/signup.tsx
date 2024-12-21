import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

type LocationData = {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

type ValidationError = {
  email: string;
  password: string;
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
  const [errors, setErrors] = useState<ValidationError>({
    email: "",
    password: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setErrors((prev) => ({
      ...prev,
      email: isValid ? "" : "Please enter a valid email address",
    }));
    return isValid;
  };

  const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid =
      hasMinLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;

    let errorMessage = "";
    if (!isValid) {
      errorMessage = "Password must contain:\n";
      if (!hasMinLength) errorMessage += "- At least 8 characters\n";
      if (!hasUpperCase) errorMessage += "- One uppercase letter\n";
      if (!hasLowerCase) errorMessage += "- One lowercase letter\n";
      if (!hasNumber) errorMessage += "- One number\n";
      if (!hasSpecialChar) errorMessage += "- One special character\n";
    }

    setErrors((prev) => ({
      ...prev,
      password: errorMessage,
    }));

    return isValid;
  };

  const handleSignup = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      router.push("/(auth)/verify");
    }
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
        const formattedAddress = [
          address[0].streetNumber,
          address[0].street,
          address[0].district,
          address[0].city,
          address[0].subregion,
          address[0].region,
          address[0].country,
          address[0].postalCode,
        ]
          .filter(Boolean)
          .join(", ")
          .replace(/,\s*,/g, ",")
          .replace(/,\s*$/, "");

        setLocation({
          address: formattedAddress,
          coordinates: {
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          },
        });
      }
    } catch (error) {
      alert("Error getting location");
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    location.address.trim() !== "" &&
    !errors.email &&
    !errors.password;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subtitle}>Join our community today</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="user"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />
          </View>

          <View>
            <View
              style={[
                styles.inputWrapper,
                errors.email ? styles.inputError : null,
              ]}
            >
              <FontAwesome
                name="envelope-o"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) validateEmail(text);
                }}
                onBlur={() => validateEmail(email)}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View>
            <View
              style={[
                styles.inputWrapper,
                errors.password ? styles.inputError : null,
              ]}
            >
              <FontAwesome
                name="lock"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) validatePassword(text);
                }}
                onBlur={() => validatePassword(password)}
                secureTextEntry={!showPassword}
                placeholderTextColor="#999"
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome
              name="map-marker"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Location"
              value={location.address}
              onChangeText={(text) =>
                setLocation({ ...location, address: text })
              }
              autoCapitalize="words"
              placeholderTextColor="#999"
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

          <View style={styles.linksContainer}>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text style={styles.link}>Already have an account? Login</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    gap: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 8,
  },
  locationIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    shadowColor: "#999",
  },
  linksContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  link: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
