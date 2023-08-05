import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Home = () => {

  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()

  const [product, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);


  // get all product
  const getAllProduct = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(res.data.product)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProduct()
    }

  }, [])

  useEffect(() => {
    if (checked.length || radio.length)
      filterProduct()
  }, [checked, radio])


  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }


  // get filter product
  const filterProduct = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(res?.data?.product); // Use setProducts as a function to update the state
    } catch (error) {
      console.log(error);
    }
  };


  //get total product count
  const getTotal = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(res?.data?.total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTotal()
  })

  // load more
  const loadMore = useCallback(async () => {
    try {
      const nextPage = page + 1; // Define nextPage here
      if (page === nextPage) {
        // If the current page is already the same as the nextPage, do nothing
        return;
      }

      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${nextPage}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...res?.data?.product]);
      setPage(nextPage);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]);




  return (
    <Layout title={"All Products- Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-2">
          {/* category filter */}
          <h4 className="text-center">Filter by category</h4>
          <div className="d-flex flex-column">
            {category.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-5">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p =>
              (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          {/* reset filter */}
          <div className="mt-3">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              RESET FILTER
            </button>
          </div>


        </div>
        <div className="col-md-9">

          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {product?.map((p) => (

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
                  <button className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-success ms-1' onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
                    toast.success("Product added to cart");
                  }}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {product && product.length < total &&
              (
                <button className='btn btn-warning' onClick={loadMore}>
                  {loading ? "Loading...." : "Loadmore"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
