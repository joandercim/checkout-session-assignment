import { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import { IProduct } from '../models/IProduct';

const ProductList = () => {

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
    <div className="flex gap-10 max-w-4xl mx-auto justify-center p-5">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
