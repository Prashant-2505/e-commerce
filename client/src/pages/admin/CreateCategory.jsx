import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import CategoryForm from '../../components/form/CategoryForm'

const CreateCategory = () => {

    const [categories, setCategories] = useState([])
    const [name,setName] = useState("")

    // handle form
    const handleSubmit = async(e)=>
    {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
            if(response?.data?.success)
            {
                toast.success(`${response.data.name} is created`)
            }
            else
            {
                toast.error(response.data.message)
            }
        } catch (error) {
           console.log(error) 
           toast.error("Somethong went wrong in input form")
        }
    }

    const getAllCategory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

            if (response.data.success) {
                setCategories(response.data.category)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9"><h1>Manage Category</h1>
                    <div className="p-3">
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                    </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {categories?.map((c) => (
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td ><button className='btn btn-primary'>Edit</button></td>
                                            </tr>
                                        ))}
                                    </>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
