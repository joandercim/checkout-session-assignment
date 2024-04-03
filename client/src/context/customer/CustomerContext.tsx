import { ReactNode, createContext, useEffect, useState } from 'react';
import { CartItem } from '../../models/CartItem';
import { IProduct } from '../../models/IProduct';
import axios from 'axios';
import { Customer } from '../../models/Customer';

interface ICustomerContext {
  isLoggedIn: boolean;
  customer: string;
  itemsInCart: CartItem[];
  addToCart: (product: IProduct, price: number) => void;
  login: (email: string, password: string) => Promise<Number | undefined>;
  logout: () => void;
  createCustomer: (customer: Customer) => void;
}

interface ICustomerProviderProps {
  children: ReactNode;
}

export const CustomerContext = createContext<ICustomerContext>({
  isLoggedIn: false,
  customer: '',
  itemsInCart: [],
  addToCart: () => {},
  login: () => {
    return Promise.reject('login function not implemented');
  },
  logout: () => {},
  createCustomer: () => {},
});

export const CustomerProvider = ({ children }: ICustomerProviderProps) => {
  const isLoggedIn = false;
  const [customer, setCustomer] = useState('');
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const checkCustomerLoggedIn = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + '/auth/authorize',
          {
            withCredentials: true,
          }
        );

        if (res.data.customer) {
          setCustomer(res.data.customer);
        }
      } catch (error) {
        console.error(error)
      }
    };

    checkCustomerLoggedIn();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<Number | undefined> => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setCustomer(res.data.customer)

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

  const logout = async () => {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + '/auth/logout', {},
      {
        withCredentials: true,
      }
    );

    setCustomer('');
  };

  const createCustomer = async (customer: Customer) => {
    console.log(customer);
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
      value={{
        isLoggedIn,
        itemsInCart,
        customer,
        addToCart,
        login,
        logout,
        createCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
