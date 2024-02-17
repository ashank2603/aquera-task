import { Route, Routes } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:profileId" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App