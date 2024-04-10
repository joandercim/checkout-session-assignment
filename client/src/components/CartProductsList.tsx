import { useContext } from "react"
import CartProduct from "./CartProduct"
import { CustomerContext } from "../context/customer/CustomerContext"

const CartProductsList = () => {

    const { itemsInCart } = useContext(CustomerContext)
  return (
    itemsInCart.map((item, index) => (
        <CartProduct item={item} key={`${item.productId}_${index}`}/>
      ))
  )
}
export default CartProductsList