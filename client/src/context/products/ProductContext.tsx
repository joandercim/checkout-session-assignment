import { ReactNode, createContext, useEffect, useState } from 'react';
import { IPrices } from '../../models/IPrices';
import axios from 'axios';
import { IProduct } from '../../models/IProduct';

interface IProductProviderProps {
  children: ReactNode;
}

interface IProductContext {
  prices: IPrices[] | undefined;
  products: IProduct[] | undefined;
}

export const ProductContext = createContext<IProductContext>({
  prices: undefined,
  products: undefined,
});

export const ProductProvider = ({ children }: IProductProviderProps) => {
  const [prices, setPrices] = useState<IPrices[]>();
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    if (prices) return;

    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + '/stripe/products/prices'
        );
        setPrices(res.data.prices.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (products) return;

    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + '/stripe/products'
        );
        setProducts(res.data.products.data);
      } catch (err) {
        console.error(err);
      }
    };

    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ prices, products }}>
      {children}
    </ProductContext.Provider>
  );
};
