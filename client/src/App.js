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
import Users from './pages/admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Product from './pages/admin/Product';
import UpdateProduct from './pages/admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />


        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/order' element={<Order />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
          <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
          <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct />} />
          <Route path="/dashboard/admin/product" element={<Product />} />
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
