import { Stack } from "expo-router";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="match" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
