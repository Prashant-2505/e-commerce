import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Policy from "./pages/Policy"
import PageNotFound from "./pages/PageNotFound"
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import Product from './pages/admin/Product';
import Users from './pages/admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/order' element={<Order />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create-Product" element={<Product />} />
          <Route path="/dashboard/admin/users" element={<Users />} />

        </Route>



        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />


        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
