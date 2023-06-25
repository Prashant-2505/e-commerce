import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Register - Ecommerce app"}>
            <div className="register">
                <h1>Register here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input required placeholder='User name' type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input required placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input required placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <input required placeholder='Phone no' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input required placeholder='Address' type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
