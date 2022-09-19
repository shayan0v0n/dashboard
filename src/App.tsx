import { Route, Routes } from "react-router-dom"
import Templates from "./HOC/Templates"
import PasswordSaver from "./Containers/PasswordSaver"
import { Todos } from "./Containers/Todos"
import UrlControl from "./Containers/UrlControl"
import Wallet from "./Containers/Wallet"

const App = () => {
  return (
    <Templates>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/walletControl" element={<Wallet />} />
        <Route path="/urlSaver" element={<UrlControl />} />
        <Route path="/passwordSaver" element={<PasswordSaver />} />
      </Routes>
    </Templates>
  )
}

export default App