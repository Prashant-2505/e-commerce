import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = () => {
  const [product, setProduct] = useState([])

  // get all product
  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      if (res?.data?.success) {
        setProduct(res.data.product)
      } else {
        throw new Error("Failed to fetch products.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong while getting products")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <Layout>
      <div className="row m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product
