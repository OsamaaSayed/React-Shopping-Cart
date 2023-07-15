import { createContext, useContext, ReactNode, useState } from "react";

import ShoppingCart from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  toggleCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  isOpen: boolean;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen((prevState) => !prevState);

  const cartQuantity = cartItems.reduce(
    (acc, currentValue) => acc + currentValue.quantity,
    0
  );

  function getItemQuantity(id: number) {
    // const item = cartItems.find((item) => item.id === id);
    // return item ? item.quantity : 0;

    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      const item = currItems.find((item) => item.id === id);

      if (item == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity, //~ StoreItem
        increaseCartQuantity, //~ StoreItem
        decreaseCartQuantity, //~ StoreItem
        removeFromCart, //~ StoreItem , CartItem
        toggleCart, //~ Navbar , ShoppingCart
        cartItems, //~ ShoppingCart
        cartQuantity, //~ Navbar
        isOpen, //~ ShoppingCart
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
};
