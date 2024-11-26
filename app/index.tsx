import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Product } from "@/interfaces/product.interface";
import ProductCard from "@/components/ProductCard";
import { router } from "expo-router";
import useProducts from "@/hooks/useProducts";
import { Colors } from "@/constants/Colors";
import { capitalize } from "@/utils/helpers";

const productsList = () => {
  const { products, isLoading, isFetching, fetchProducts, error } = useProducts(
    {
      fetchImmediately: true,
    }
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        onPress={() => {
          router.push(`/${item.id}`);
        }}
      />
    ),
    []
  );
  useEffect(() => {
    if (error) {
      return Alert.alert("Error", capitalize(error));
    }
  }, [error]);
  return (
    <View
      style={{
        flexGrow: 1,
      }}
    >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={fetchProducts} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        data={products}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.light.tint} size="large" />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.light.tint,
                  fontSize: 20,
                }}
              >
                No products found
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default productsList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexGrow: 1,
  },
});
