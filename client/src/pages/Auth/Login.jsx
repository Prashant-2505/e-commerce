import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import '../../styles/authStyles.css'
import { useAuth } from '../../context/auth';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // conext api
    const [auth, setAuth] = useAuth()

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res.data.success) {
                alert(res.data.message)
                // we are using it tp store data of user but whenevr we refresh all data of usestate will gone cause itns not permanenet storing that why we have to use local storage
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                // localstorage doesnt support  json format thats why we convert it into string
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Login - Ecommerce app"}>
            <div className="form-container">
                <h1>Log in here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input required placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input required placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>

                    <div className="mt-3">
                        <button onClick={() => navigate("/forgot-Password")} type="submit" className="btn btn-primary">Forgot password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login
