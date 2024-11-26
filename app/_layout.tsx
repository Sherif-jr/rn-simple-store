import FavoriteHeaderButton from "@/components/ui/FavoriteHeaderButton";
import ResourceLoader from "@/providers/ResourceLoader";
import store from "@/store";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { memo, useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
                headerRight(props) {
                  return <FavoriteHeaderButton {...props} />;
                },
              }}
            />
            <Stack.Screen name="[productId]" />
            <Stack.Screen
              name="favorites"
              options={{ headerTitle: "Favorites" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ResourceLoader>
        <StatusBar style="dark" />
      </ThemeProvider>
    </Provider>
  );
}
