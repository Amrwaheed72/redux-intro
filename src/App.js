import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const name = useSelector((state) => state.customer.fullName)
  return (
    <div>
      <h1>🏦 Small bank account and customer operations (with Redux) ⚛️</h1>
      {name === '' ?
        (<CreateCustomer />)
        :
        (<>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>)
      }
    </div>
  );
}

export default App;
