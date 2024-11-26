import { AsyncStorageKeys } from "@/constants/enums";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserPrefState {
  /**An array of ids of favorite products */
  favoriteProducts: string[];

  //loading (for local fetching from async storage)
  loading: boolean;
}

export const fetchUserPref = createAsyncThunk(
  "userPref/fetchUserPref",
  async () => {
    try {
      const favoriteProductsStringified = await AsyncStorage.getItem(
        AsyncStorageKeys.FAVORITE_PRODUCTS
      );
      const favoriteProducts = JSON.parse(favoriteProductsStringified || "[]");
      return favoriteProducts;
    } catch (error) {
      console.warn("Error fetching user pref", error);
      return [];
    }
  }
);
const INITIAL_STATE: UserPrefState = {
  favoriteProducts: [],
  loading: true,
};
const userPrefSlice = createSlice({
  name: "userPref",
  initialState: INITIAL_STATE,
  reducers: {
    setFavoriteProducts: (state, action: PayloadAction<string[]>) => {
      state.favoriteProducts = action.payload;
    },
    addToFavoriteProducts: (state, action: PayloadAction<string>) => {
      state.favoriteProducts.push(action.payload);
    },
    removeFromFavoriteProducts: (state, action: PayloadAction<string>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserPref.fulfilled, (state, action) => {
      state.favoriteProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserPref.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserPref.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  addToFavoriteProducts,
  removeFromFavoriteProducts,
  setFavoriteProducts,
} = userPrefSlice.actions;

const userPrefReducer = userPrefSlice.reducer;
export default userPrefReducer;
