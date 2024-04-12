import { FaTrash } from "react-icons/fa"
import { CartItem } from "../models/CartItem";
import { useContext } from "react";
import { CustomerContext } from "../context/customer/CustomerContext";
interface ICartProductProps {
    item: CartItem,
}
const CartProduct = ({ item }: ICartProductProps) => {
    const { updateCartQuantity, removeProduct } = useContext(CustomerContext)

  return (
    <li
    className="px-2 py-2 my-2 w-full h-28 border-b-2 flex justify-between items-center"
  >
    <div className="flex">
      <div className="min-w-20 min-h-20 mr-3">
        <img
          src={item.images[0]}
          className="w-20 h-20"
          alt={item.name}
        />
      </div>
      <div>
        <h2 className="w-[40%] mb-2">{item.name}</h2>
        <select
          name="quantity"
          className="border px-1 py-1 w-14 rounded-md border-gray-400"
          id="quantity"
          value={item.quantity}
          onChange={(e) =>
            updateCartQuantity(e.target.value, item.productId)
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>

    <div className="flex items-end justify-between flex-col h-full">
      <button onClick={() => removeProduct(item.productId)}>
        <FaTrash className="inline mt-7" />
      </button>
      <span className="block font-semibold ">
        {item.price * item.quantity} kr
      </span>
    </div>
  </li>
  )
}
export default CartProduct