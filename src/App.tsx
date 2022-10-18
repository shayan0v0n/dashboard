import { Route, Routes } from "react-router-dom"
import Templates from "./HOC/Templates"
import PasswordSaver from "./Containers/PasswordSaver"
import { Todos } from "./Containers/Todos"
import UrlControl from "./Containers/UrlControl"
import Wallet from "./Containers/Wallet"
import WalletStatus from "./Containers/WalletStatus"

const App = () => {
  return (
    <Templates>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/walletControl" element={<Wallet />} />
        <Route path="/walletControl/walletStatus" element={<WalletStatus />} />
        <Route path="/urlSaver" element={<UrlControl />} />
        <Route path="/passwordSaver" element={<PasswordSaver />} />
      </Routes>
    </Templates>
  )
}

export default App