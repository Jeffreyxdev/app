import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "../app/global.css";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Monsterrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Monsterrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Monsterrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Monsterrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Monsterrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Monsterrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Monsterrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      console.log("Fonts loaded, hiding first splash in 1s");
      setTimeout(() => {
        SplashScreen.hideAsync();
        console.log("First splash hidden");
      }, 300); // Increase to 1 second
    }
  }, [loaded]);

  if (!loaded) {
    console.log("Fonts not loaded yet");
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}