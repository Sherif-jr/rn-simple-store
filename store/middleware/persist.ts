import { Middleware } from "@reduxjs/toolkit";
import { StoreAction, StoreState } from "..";
import CacheManager from "@/services/CacheManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "@/constants/enums";

const persistState: Middleware<{}, StoreState> =
  ({ getState }) =>
  (next) =>
  //@ts-ignore
  async (action: StoreAction) => {
    const result = next(action);
    const state = getState();
    const { loading: cacheLoading, ...cache } = state.cache;
    const { favoriteProducts, loading: userPrefLoading } = state.userPref;

    try {
      const promises: Promise<void>[] = [];
      if (!cacheLoading && action.type.startsWith("cache")) {
        Object.entries(cache).forEach(([key, value]) => {
          promises.push(CacheManager.cache(key, value));
        });
      }

      if (!userPrefLoading && action.type.startsWith("userPref")) {
        const favoriteProductsStringified = JSON.stringify(favoriteProducts);
        promises.push(
          AsyncStorage.setItem(
            AsyncStorageKeys.FAVORITE_PRODUCTS,
            favoriteProductsStringified
          )
        );
      }
      await Promise.all(promises);
    } catch (error) {
      console.warn("Failed to save state to cache/async storage", error);
    }

    return result;
  };

export default persistState;
