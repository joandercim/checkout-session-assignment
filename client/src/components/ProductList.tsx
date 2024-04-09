import { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import { IProduct } from '../models/IProduct';
import ClipLoader from 'react-spinners/ClipLoader';

const ProductList = () => {

  const [products, setProducts] = useState<IProduct[]>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (products) return;

    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + '/stripe/products'
        );
        setProducts(res.data.products.data);
        setLoading(false)
      } catch (err) {
        console.error(err);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="flex gap-10 max-w-4xl mx-auto justify-center p-5">
      {!loading && products ? (
        products?.map((product) => (
          <Product key={product.id} product={product} />
        ))) :                 <div className='mx-auto'>
        <h4 className='text-center text-xl mb-5'>Laddar produkter...</h4>
        <ClipLoader
          color={'blue'}
          loading={loading}
          cssOverride={{ display: 'block', margin: 'auto' }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>}
    </div>
  );
};

export default ProductList;
