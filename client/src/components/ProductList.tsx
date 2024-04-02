import { useContext } from 'react';
import Product from './Product';
import { ProductContext } from '../context/products/ProductContext';

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="flex gap-10 max-w-4xl mx-auto justify-center p-5">
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
