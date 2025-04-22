import { useState } from "react";
import { Product } from "../../types.ts";
import { initialProducts } from "../../constants/index.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  
  const addProduct = (newProduct: Product) => {
    const list = [...initialProducts, newProduct];
    setProducts(list);
  }

  const updateProduct = (updatedProduct: Product) => {

    console.log("업데이트된 상품", updatedProduct);

    const updatedList = initialProducts.map(product => {
      if (product.id === updatedProduct.id) {
        return { ...product, ...updatedProduct };
      }
      return product;
    })
    setProducts(updatedList);
  }

  return {
    products: products,
    updateProduct,
    addProduct
  };
};
