import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import ProductsService from "@/services/productsService";
import { cacheData } from "@/store/slices/cacheSlice";

const useProducts = (config?: { fetchImmediately?: boolean }) => {
  const productsCache = useAppSelector((state) => state.cache.products);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const firstFetch = Boolean(!productsCache || productsCache.length === 0);
  const fetchProducts = useCallback(async () => {
    try {
      if (firstFetch) setIsLoading(true);
      setIsFetching(true);
      const { success, data, error } = await ProductsService.getAllProducts();
      if (success) {
        dispatch(
          cacheData({
            key: "products",
            value: data,
          })
        );
        return data;
      } else {
        setError(error);
        return [];
      }
    } catch (error) {
      setError("Something went wrong");
      return [];
    } finally {
      setIsFetching(false);
      if (firstFetch) setIsLoading(false);
    }
  }, [firstFetch, ProductsService.getAllProducts]);

  useEffect(() => {
    if (config?.fetchImmediately) fetchProducts();
  }, [fetchProducts, config?.fetchImmediately]);

  return {
    products: productsCache,
    isLoading,
    isFetching,
    error,
    fetchProducts,
  };
};

export default useProducts;
