import { ReactNode, createContext, useState } from 'react';
import { CartItem } from '../../models/CartItem';
import { IProduct } from '../../models/IProduct';
import axios from 'axios';

interface ICustomerContext {
  isLoggedIn: boolean;
  itemsInCart: CartItem[];
  addToCart: (product: IProduct, price: number) => void;
  login: (email: string, password: string) => Promise<Number | undefined>;
  createCustomer: () => void;
}

interface ICustomerProviderProps {
  children: ReactNode;
}

export const CustomerContext = createContext<ICustomerContext>({
  isLoggedIn: false,
  itemsInCart: [],
  addToCart: () => {},
  login: () => {
    return Promise.reject('login function not implemented');
  },
  createCustomer: () => {},
});

export const CustomerProvider = ({ children }: ICustomerProviderProps) => {
  const isLoggedIn = false;
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  const login = async (
    email: string,
    password: string
  ): Promise<Number | undefined> => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      return res.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Login failed:', error.response.status);
          return error.response.status;
        }
      } else {
        console.error('Unexpected error:', error);
        return 500;
      }
    }
  };

  const createCustomer = () => {
    console.log('Create customer');
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
  };

  return (
    <CustomerContext.Provider
      value={{ isLoggedIn, itemsInCart, addToCart, login, createCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
