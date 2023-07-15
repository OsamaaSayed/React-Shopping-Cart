import { createContext, useContext, ReactNode, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  //   openCart: () => void;
  //   closeCart: () => void;
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

  //   const openCart = ()=> setIsOpen(true);
  //   const closeCart = ()=> setIsOpen(false);
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
          return { ...item, quantity: item.quantity + 1 };
        });
      }
    });
  }

  function decreaseCartQuantity(_: number) {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        return { ...item, quantity: item.quantity - 1 };
      });
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        // openCart,
        // closeCart,
        toggleCart,
        cartItems,
        cartQuantity,
        isOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
