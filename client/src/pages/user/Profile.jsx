import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {

  // context 
  const [auth, setAuth] = useAuth()
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  }, [auth?.user])

  // from function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address });
      if (res?.data.error) {
        toast.error(res?.data?.error)
      }
      else {
        setAuth({ ...auth, user: res?.data?.updateUser })
      let ls = localStorage.getItem("auth")
      ls=JSON.parse(ls)
      ls.user = res.data.updateUser

      localStorage.setItem('auth',JSON.stringify(ls))
      toast.success("Profile update successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3"><UserMenu /></div>
          <div className="col-md-9">
            <div className="form-container">
              <h1>User profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input  placeholder='User name' type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <input  placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" disabled />
                </div>
                <div className="mb-3">
                  <input  placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                  <input  placeholder='Phone no' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <input  placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
