import { useContext } from "react"
import { CustomerContext } from "../context/customer/CustomerContext"

const Home = () => {
  const { customer } = useContext(CustomerContext)
  return (
    <div className="w-2/4 mx-auto p-2">
      {customer ? <h2 className="text-center text-2xl">Välkommen tillbaka, {customer.name}</h2> : <>No user</>}
    </div>
  )
}
export default Home