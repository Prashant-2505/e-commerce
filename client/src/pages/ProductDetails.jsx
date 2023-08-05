import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearch } from '../context/search'

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const navigate = useNavigate()

    // get product
    const getProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-singleProduct/${params.slug}`)
            setProduct(res?.data?.product)
            getSimilarProduct(res?.data?.product._id, res?.data.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])


    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(res?.data?.product);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Layout>

            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width="350px"
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name: {product?.name}</h6>
                    <h6>Category: {product?.category?.name}</h6>
                    <h6>Price: {product?.price}</h6>
                    <h6>Description: {product?.description}</h6>
                    <button className='btn btn-success ms-1'>Add to cart</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h1> Similar product</h1>
                {relatedProduct.length === 0 && <p className='text-center'>No Similar Product found</p>}
                <div className="d-flex flex-wrap">
                    {relatedProduct?.map((p) => (

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`}
                                className="card-img-top p-imgs"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}</p>
                                <p className="card-text">$ {p.price}</p>
                                <button className='btn btn-success ms-1'>Add to cart</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
