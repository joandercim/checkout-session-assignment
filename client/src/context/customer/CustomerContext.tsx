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
  removeProduct: (id: string) => void;
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
  removeProduct: () => {},
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
        console.error(error);
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

      setCustomer(res.data.customer);

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
      import.meta.env.VITE_API_URL + '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    console.log(res);
    setCustomer('');
  };

  const createCustomer = async (customer: Customer) => {
    try {
      const dbres = await axios.post(
        import.meta.env.VITE_API_URL + '/customers/create',
        customer
      );

      const stripeRes = await axios.post(
        import.meta.env.VITE_API_URL + '/stripe/customer/create',
        customer
      );

      if (dbres.status !== 201 && stripeRes.status !== 200) {
        console.log('Fel vid skapande av kund eller Stripe-kund');
        return;
      }

      console.log('Customer created in stripe and db!')

    } catch (error) {
      console.error('Fel vid skapande av kund eller Stripe-kund:', error);
    }
  };

  const addToCart = (product: IProduct, price: number) => {
    const { default_price, images, name } = product;

    const newItem = new CartItem(default_price.id, 1, images, name, price);

    const itemExists = itemsInCart.find(
      (i) => i.productId === product.default_price.id
    );

    if (itemExists) {
      const updatedCart = itemsInCart.map((itemInCart) => {
        if (itemInCart.productId === product.default_price.id) {
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

  const removeProduct = (id: string) => {
    const itemToEdit = itemsInCart.find((item) => item.productId === id);

    if (itemToEdit) {
      let updatedCart;

      if (itemToEdit.quantity > 1) {
        updatedCart = itemsInCart.map((itemInCart) => {
          if (itemInCart.productId === id) {
            return { ...itemInCart, quantity: itemInCart.quantity - 1 };
          }
          return itemInCart;
        });
      } else {
        updatedCart = itemsInCart.filter(
          (itemInCart) => itemInCart.productId !== id
        );
      }

      setItemsInCart(updatedCart);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoggedIn,
        itemsInCart,
        customer,
        addToCart,
        removeProduct,
        login,
        logout,
        createCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
