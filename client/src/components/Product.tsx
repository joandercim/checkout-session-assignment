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
      <hr className='w-4/5 mx-auto my-2' />
      <button
        onClick={() => {
          itemPrice && handleAddToCart(product, itemPrice);
        }}
        className="mb-2 text-sm px-4 py-1 w-5/6 hover:bg-gray-100 rounded-md"
      >
        Lägg i kundvagn
      </button>
    </div>
  );
};

export default Product;
