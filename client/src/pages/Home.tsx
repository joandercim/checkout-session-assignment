import { useContext } from "react"
import { CustomerContext } from "../context/customer/CustomerContext"

const Home = () => {
  const { customer } = useContext(CustomerContext)
  
  return (
    <div>
      {customer ? <h2>Välkommen tillbaka, {customer.name}</h2> : <>No user</>}
    </div>
  )
}
export default Home