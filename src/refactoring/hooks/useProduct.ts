import { useState } from "react";
import { Product } from "../../types.ts";
import { initialProducts } from "../../constants/index.ts";

export const useProducts = (initialProducts: Product[]) => {
  
  return {
    products: initialProducts,
    updateProduct: () => undefined,
    addProduct: () => undefined,
  };
};
