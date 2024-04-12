import { useContext } from "react"
import { CustomerContext } from "../context/customer/CustomerContext"

const Home = () => {
  const { customer } = useContext(CustomerContext)
  return (
    <div className="w-2/4 mx-auto p-2">
      <h2 className="text-center text-2xl">{customer ? `Välkommen tillbaka, ${customer.name}.` : 'Välkommen till Färgaffärn!'}</h2>
    </div>
  )
}
export default Home