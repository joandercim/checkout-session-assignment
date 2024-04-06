import { useContext } from "react"
import { CustomerContext } from "../context/customer/CustomerContext"

const Profile = () => {
    const { customer } = useContext(CustomerContext)
  return (
      <div>
          <h2>Dashboard for {customer?.name}</h2>
    </div>
  )
}
export default Profile