import React, { useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
import Layout from '../../components/layout/Layout'

const AdminDashboard = () => {

    const [auth] = useAuth()

    return (
        <Layout>
            <div className="container-fluid  p-3">
                <div className="row">
                    <div className="col-md-3">  <AdminMenu /></div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>User name: {auth?.user?.name}</h3>
                            <h3>User Email: {auth?.user?.email}</h3>
                            <h3>User Contact: {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard
