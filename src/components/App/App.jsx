import './App.css'
import { MainPage } from '../pages/MainPage/MainPage'
import { PizzaPage } from '../pages/PizzaPage/PizzaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Admin } from '../pages/AdminPage/Admin'
import { AdminItemPage } from '../pages/AdminItemPage/AdminItemPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pizza" element={<PizzaPage />} />
        <Route path="/admin/pizza" element={<Admin />} />
        <Route path="/admin/pizza/create" element={<AdminItemPage />} />
        <Route path="/admin/pizza/:pizzaId" element={<AdminItemPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
