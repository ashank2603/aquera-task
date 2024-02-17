import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:profileId" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App