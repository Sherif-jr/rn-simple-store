import { Product } from "@/interfaces/product.interface";
import CacheManager from "@/services/CacheManager";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CacheState {
  products: Product[];

  loading: boolean;
}

export const fetchCache = createAsyncThunk("cache/fetchCache", async () => {
  try {
    const { loading, ...cache } = INITIAL_STATE;
    const promises: Promise<any>[] = [];
    Object.keys(cache).forEach((key) => {
      promises.push(CacheManager.get(key));
    });
    const results = await Promise.all(promises);
    results.forEach((result, index) => {
      if (!result) return;
      cache[Object.keys(cache)[index] as keyof Omit<CacheState, "loading">] =
        result;
    });
    return cache;
  } catch (error) {
    console.warn("Error fetching cache", error);
    return INITIAL_STATE;
  }
});

const INITIAL_STATE: CacheState = {
  products: [],

  //loading (for local fetching from async storage/file system)
  loading: true,
};

const cacheSlice = createSlice({
  name: "cache",
  initialState: INITIAL_STATE,
  reducers: {
    cacheData(
      state,
      action: PayloadAction<{
        key: keyof Omit<CacheState, "loading">;
        value: any;
      }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    clearCache(
      state,
      action: PayloadAction<keyof Omit<CacheState, "loading">>
    ) {
      state[action.payload] = INITIAL_STATE[action.payload];
    },
    clearAllCache(state) {
      state = INITIAL_STATE;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCache.fulfilled, (state, action) => {
      state.products = action.payload?.products || [];
      state.loading = false;
    });
    builder.addCase(fetchCache.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCache.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { cacheData, clearCache, clearAllCache } = cacheSlice.actions;
const cacheReducer = cacheSlice.reducer;
export default cacheReducer;
