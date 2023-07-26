import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'

const Header = () => {

  const [auth, setAuth] = useAuth()

  const handleLogOut = () => {

    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success('Log out succesfullyy')

  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" >E-comm</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link " >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link " >Category</NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link ">Log in</NavLink>
                  </li></>
              ) :
                (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </a>
                    <ul className="dropdown-menu">
                    <li className="nav-item">
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ?'admin' :'user'}`} className="nav-link ">DASHBOARD</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink onClick={handleLogOut} to="/login" className="nav-link ">Log OUT</NavLink>
                      </li>
                    </ul>
                  </li>




                )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link ">Cart(0)</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
