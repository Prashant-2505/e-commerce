import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
const Search = () => {
    const [value] = useSearch()

    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search results</h1>
                    <h6>{value?.results.length < 1 ? "No Product Found" : `Found ${value?.results.length} products`}</h6>

                    <div className="d-flex flex-wrap">
                        {value?.results.map((p) => (

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
                                    <button className='btn btn-primary ms-1'>More Details</button>
                                    <button className='btn btn-success ms-1'>Add to cart</button>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
