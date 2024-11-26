import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/hooks/useProducts";

import { router } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useAppSelector } from "@/hooks/reduxHooks";
import Animated, { LinearTransition } from "react-native-reanimated";

const favorites = () => {
  const { products } = useProducts();
  const favoriteIds = useAppSelector(
    (state) => state.userPref.favoriteProducts
  );
  const favoriteProducts = useMemo(
    () =>
      products.filter((product) => favoriteIds.includes(product.id.toString())),
    [products, favoriteIds]
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <Animated.View style={styles.listContainer}>
        {favoriteProducts && favoriteProducts.length > 0 ? (
          favoriteProducts.map((favorite) => (
            <Animated.View
              layout={LinearTransition}
              style={styles.item}
              key={favorite.id}
            >
              <ProductCard
                product={favorite}
                style={{ maxWidth: "100%", flexGrow: 0 }}
                onPress={() => router.push(`/${favorite.id}`)}
              />
            </Animated.View>
          ))
        ) : (
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.light.tint,
                fontSize: 20,
              }}
            >
              No favorites yet
            </Text>
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
};

export default favorites;

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  item: { flexGrow: 1, maxWidth: "50%" },
});
