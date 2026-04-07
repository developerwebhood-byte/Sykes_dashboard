import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Manuals from './pages/Manuals'
import UploadManuals from './pages/UploadManuals'
import Coupons from './pages/Coupons'
import Payments from './pages/Payments'
import OrderDetail from './pages/OrderDetail'
import Customers from './pages/Customers'
import Settings from './pages/Settings'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manuals" element={<Manuals />} />
          <Route path="/upload" element={<UploadManuals />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/order-detail/:id" element={<OrderDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
