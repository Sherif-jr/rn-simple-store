import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { mockData } from "@/constants/mockData";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addToFavoriteProducts,
  removeFromFavoriteProducts,
} from "@/store/slices/userPrefSlice";
import { formatPrice } from "@/utils/helpers";

const ProductPage = () => {
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const navigation = useNavigation();

  // const product = mockData.find((p) => p.id.toString() === productId);
  const product = useAppSelector((state) =>
    state.cache.products.find((p) => p.id.toString() === productId)
  );
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: product?.title,
    });
  }, [navigation, product]);
  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.image}
          contentFit="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={34}
              color={Colors.light.tint}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <View style={[styles.divider, { marginVertical: 10 }]} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {}}
          style={styles.button}
          activeOpacity={0.6}
        >
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductPage;
const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    backgroundColor: "#CCCCCC55",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: 20,
    gap: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#CCCCCC77",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "capitalize",
    maxWidth: "90%",
  },
  descriptionContainer: {
    minHeight: 200,
  },
  description: {
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  price: {
    color: Colors.light.tint,
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.light.tint,
    width: "100%",
    borderRadius: 30,
    padding: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
