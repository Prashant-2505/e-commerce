

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import Layout from "../../components/layout/Layout";

import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/layout/AdminMenu";
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("")
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    const params = useParams()
    //get single product
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-singleProduct/${params.slug}`)
            setName(res.data.product.name)
            setDescription(res.data.product.description)
            setPrice(res.data.product.price)
            setQuantity(res.data.product.quantity)
            setShipping(res.data.product.shipping)
            setCategory(res.data.product.category)
            setId(res.data.product._id)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSingleProduct()
    }, [])

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);



    //create product function
    const UpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", id);
            const { data } = axios.put(
                `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // delete product
    const DeleteProduct = async () => {
        try {
            let answer = window.prompt("Are you sure you want to delete this product")
            if (!answer) {
            return
            }
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            toast.success("Product delete succefully")
            navigate("/dashboard/admin/product")
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while deleting")
        }
    }

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3 ">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) :
                                    (
                                        <div className="text-center">
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${id}`}
                                                alt="product_photo"
                                                height={"200px"}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "Yes" : "NO"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3 ">
                                <button className="btn btn-primary" onClick={UpdateProduct}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3 ">
                                <button className="btn btn-danger" onClick={DeleteProduct}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct
