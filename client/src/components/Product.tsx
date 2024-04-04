import { useContext } from 'react';
import { IProduct } from '../models/IProduct';
import { CustomerContext } from '../context/customer/CustomerContext';

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  const { addToCart } = useContext(CustomerContext);

  let itemPrice: null | number = null;
  itemPrice = product.default_price.unit_amount / 100;

  const handleAddToCart = (item: IProduct, itemPrice: number) => {
    addToCart(item, itemPrice);
  };

  return (
    <div className="border rounded-md shadow-lg text-center">
      <div className="product-img-container mb-2 h-36 w-40 mx-auto">
        <img
          src={product.images[0]}
          className="h-full w-full object-cover"
          alt={product.name}
        />
      </div>
      <h2>{product.name}</h2>
      <p className="text-sm">{product.description}</p>
      <p className="text-xs mt-4">{itemPrice} kr</p>
      <button
        onClick={() => {
          itemPrice && handleAddToCart(product, itemPrice);
        }}
        className="my-2 border text-sm border-slate-700 px-4 py-1 w-5/6"
      >
        Lägg i kundvagn
      </button>
    </div>
  );
};

export default Product;
