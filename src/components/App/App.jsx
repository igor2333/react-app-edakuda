import './App.css'
import { MainPage } from '../pages/MainPage/MainPage'
import { PizzaPage } from '../pages/PizzaPage/PizzaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminItemPage } from '../pages/AdminItemPage/AdminItemPage'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'
import { Admin } from '../pages/AdminPage/Admin'
import { LoginContainer } from '../../features/auth/login/LoginContainer'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/pizza" element={<PizzaPage />} />
        <Route
          path="/admin/pizza"
          element={<PrivateRoute children={<Admin />} />}
        />
        <Route
          path="/admin/pizza/create"
          element={<PrivateRoute children={<AdminItemPage />} />}
        />
        <Route
          path="/admin/pizza/:pizzaId"
          element={<PrivateRoute children={<AdminItemPage />} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
