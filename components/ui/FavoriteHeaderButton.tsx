import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const FavoriteHeaderButton = memo((props: any) => {
  const navigateToFavorites = useCallback(() => {
    router.push("/favorites");
  }, []);
  return (
    <TouchableOpacity
      {...props}
      style={styles.headerIconContainer}
      onPress={navigateToFavorites}
    >
      <MaterialIcons name="favorite" size={24} color="black" />
      <Text>favorites</Text>
    </TouchableOpacity>
  );
});

export default FavoriteHeaderButton;

const styles = StyleSheet.create({
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
