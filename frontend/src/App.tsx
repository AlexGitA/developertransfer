import './App.css'
import LoginPage from './pages/auth/LoginPage'
import Layout from "@/layout/Layout.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App