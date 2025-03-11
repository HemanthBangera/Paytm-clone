import { BrowserRouter,
         Route,
         Routes
} from "react-router-dom"

import {Signin} from "../pages/signin"
import {Signup} from "../pages/signup"
import { Dashboard } from "../pages/dashboard"
import { SendMoney } from "../pages/sendmoney"

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/sendmoney" element={<SendMoney/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App