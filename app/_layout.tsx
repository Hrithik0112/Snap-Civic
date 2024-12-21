import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { SplashScreen } from "@/components/SplashScreen";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <SplashScreen onComplete={() => setIsReady(true)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
