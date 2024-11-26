import { Product } from "@/interfaces/product.interface";
import axiosInstance from "@/utils/http";
import { AxiosError } from "axios";

class ProductsService {
  static async getAllProducts() {
    try {
      const response = await axiosInstance.get<Product[]>("products");
      return {
        success: true as const,
        data: response.data,
      };
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return {
            success: false as const,
            error: "Not Found",
          };
        } else if (!error?.response) {
          return {
            success: false as const,
            error: "Network Error",
          };
        } else {
          return {
            success: false as const,
            error: "Something went wrong",
          };
        }
      } else {
        return {
          success: false as const,
          error: "Something went wrong",
        };
      }
    }
  }
}

export default ProductsService;
