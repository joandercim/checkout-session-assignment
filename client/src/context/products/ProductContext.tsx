import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../../models/IProduct';

interface IProductProviderProps {
  children: ReactNode;
}

interface IProductContext {
  products: IProduct[] | undefined;
}

export const ProductContext = createContext<IProductContext>({
  products: undefined,
});

export const ProductProvider = ({ children }: IProductProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>();

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
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
