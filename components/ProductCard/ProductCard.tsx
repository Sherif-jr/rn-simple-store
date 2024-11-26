import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, memo } from "react";
import { Product } from "@/interfaces/product.interface";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  addToFavoriteProducts,
  removeFromFavoriteProducts,
} from "@/store/slices/userPrefSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}
const ProductCard: FC<ProductCardProps> = memo(({ product, onPress }) => {
  const isFavorite = useAppSelector((state) =>
    state.userPref.favoriteProducts.includes(product!.id.toString())
  );
  const dispatch = useAppDispatch();
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavoriteProducts(product!.id.toString()));
    } else {
      dispatch(addToFavoriteProducts(product!.id.toString()));
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.6}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={product.image} contentFit="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {product.title}
        </Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {product.description}
        </Text>
        <View style={styles.divider} />
        <View style={styles.footerContainer}>
          <Text style={styles.price}>{product.price}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={Colors.light.tint}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "48%",
    borderRadius: 10,
    overflow: "hidden",
    // height: 200,
    margin: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC77",
  },
  imageContainer: {
    width: "100%",
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    gap: 5,
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC77",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: Colors.light.tint,
  },
});
