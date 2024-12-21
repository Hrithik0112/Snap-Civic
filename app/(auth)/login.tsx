import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { Text, View } from "@/components/Themed";
import { resetAndNavigateTo } from "@/utils/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { validateLogin } from "@/utils/MockProfile";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address");
    return isValid;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      if (validateLogin(email, password)) {
        resetAndNavigateTo("/(tabs)");
      } else {
        Alert.alert("Login Failed", "Please use demo@citizen.com / demo1234");
      }
    }
  };

  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && !emailError;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Log in to continue your journey</Text>
        </View>

        <View style={styles.formContainer}>
          <View>
            <View
              style={[
                styles.inputWrapper,
                emailError ? styles.inputError : null,
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
                  if (emailError) validateEmail(text);
                }}
                onBlur={() => validateEmail(email)}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
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
              onChangeText={setPassword}
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

          <Pressable
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <View style={styles.linksContainer}>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text style={styles.link}>New user? Create account</Text>
              </Pressable>
            </Link>

            <Pressable onPress={() => alert("Feature coming soon!")}>
              <Text style={styles.link}>Forgot Password?</Text>
            </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  link: {
    color: "#4CAF50",
    fontSize: 13,
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
    marginBottom: 8,
  },
});
