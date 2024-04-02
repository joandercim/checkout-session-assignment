import { ReactNode, createContext, useState } from 'react';
import { CartItem } from '../../models/CartItem';
import { IProduct } from '../../models/IProduct';

interface ICustomerContext {
  isLoggedIn: boolean;
  itemsInCart: CartItem[];
  addToCart: (product: IProduct, price: number) => void;
}

interface ICustomerProviderProps {
  children: ReactNode;
}

export const CustomerContext = createContext<ICustomerContext>({
  isLoggedIn: false,
  itemsInCart: [],
  addToCart: () => {},
});

export const CustomerProvider = ({ children }: ICustomerProviderProps) => {
  const isLoggedIn = false;
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  const login = () => {
    console.log('Logging in');
  };

  const addToCart = (product: IProduct, price: number) => {
    const { default_price, images, name } = product;

    const newItem = new CartItem(default_price, 1, images, name, price);

    const itemExists = itemsInCart.find(
      (i) => i.default_price === product.default_price
    );

    if (itemExists) {
      const updatedCart = itemsInCart.map((itemInCart) => {
        if (itemInCart.default_price === product.default_price) {
          return { ...itemInCart, quantity: itemInCart.quantity + 1 };
        } else {
          return itemInCart;
        }
      });

      setItemsInCart(updatedCart);
    } else {
      setItemsInCart([...itemsInCart, newItem]);
    }

    console.log(itemsInCart);
  };

  return (
    <CustomerContext.Provider value={{ isLoggedIn, itemsInCart, addToCart }}>
      {children}
    </CustomerContext.Provider>
  );
};
