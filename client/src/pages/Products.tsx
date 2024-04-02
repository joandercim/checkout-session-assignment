import ProductList from '../components/ProductList';
import { ProductProvider } from '../context/products/ProductContext';

const Products = () => {
  return (
    <div>
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </div>
  );
};
export default Products;
