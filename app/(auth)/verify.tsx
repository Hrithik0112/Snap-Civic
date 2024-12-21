import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export default function VerifyScreen() {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerification = () => {
    router.replace("/(auth)/login");
  };

  const isFormValid = verificationCode.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <FontAwesome
            name="envelope"
            size={50}
            color="#4CAF50"
            style={styles.icon}
          />
          <Text style={styles.welcomeText}>Verify Email</Text>
          <Text style={styles.subtitle}>
            Please enter the verification code sent to your email
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome
              name="key"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              placeholderTextColor="#999"
              maxLength={6}
            />
          </View>

          <Pressable
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleVerification}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </Pressable>

          <View style={styles.linksContainer}>
            <Pressable onPress={() => alert("Code resent!")}>
              <Text style={styles.link}>Didn't receive code? Resend</Text>
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
  icon: {
    marginBottom: 20,
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
    textAlign: "center",
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
});
