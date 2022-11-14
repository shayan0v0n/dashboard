import { Route, Routes } from "react-router-dom"
import Templates from "./HOC/Templates"
import PasswordSaver from "./Containers/PasswordSaver"
import { Todos } from "./Containers/Todos"
import UrlControl from "./Containers/UrlControl"
import Wallet from "./Containers/Wallet"
import WalletStatus from "./Containers/WalletStatus"
import useDarkMode from './store/useDarkMode';
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material"
import { amber, deepOrange, grey } from "@mui/material/colors"
import Notes from "./Containers/Notes"


const App = () => {
  const darkMode = useDarkMode()
  const getPaletteMode = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'dark' && {
        background: {
          default: "#121212",
          paper: "rgba(255, 255, 255, 0.16)",
        }
      })
    }
  })

  const darkModeTheme = createTheme(getPaletteMode(darkMode.darkModeStatus ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={darkModeTheme}>
    <Templates>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/walletControl" element={<Wallet />} />
        <Route path="/walletControl/walletStatus" element={<WalletStatus />} />
        <Route path="/urlSaver" element={<UrlControl />} />
        <Route path="/passwordSaver" element={<PasswordSaver />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Templates>
    </ThemeProvider>
  )
}

export default App