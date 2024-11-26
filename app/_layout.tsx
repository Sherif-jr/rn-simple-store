import ResourceLoader from "@/providers/ResourceLoader";
import store from "@/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <ResourceLoader onLoaded={SplashScreen.hideAsync}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerTitle: "Products List",
              }}
            />
            <Stack.Screen name="[productId]" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ResourceLoader>
        <StatusBar style="dark" />
      </ThemeProvider>
    </Provider>
  );
}
