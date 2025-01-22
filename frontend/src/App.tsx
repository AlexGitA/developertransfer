import './App.css'
import LoginPage from './pages/auth/LoginPage'
import Layout from "@/layout/Layout.tsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DerPlayground from "@/playground/DerPlayground.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
            <Route path="playground" element={<DerPlayground />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App