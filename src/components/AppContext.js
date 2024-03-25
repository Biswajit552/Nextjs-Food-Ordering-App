"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
export const cartContext = createContext({});
import toast from "react-hot-toast";

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }
  function addToCart(product, size = null, extra = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extra };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <cartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </cartContext.Provider>
    </SessionProvider>
  );
}
