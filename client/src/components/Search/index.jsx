import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Product from "../Home/Product";
import { authorizedGetRequest } from "../Request";

const Search = () => {
    const { query } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        const handleChange = async () => {
            const url = 'http://localhost:8080/api/product/search/' + query;
            const callback = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url, callback);
        }
        handleChange()
    }, []);

    return (<div>
        <div style={{ height: "80px" }}></div>
        <div className="container mt-5">
            <h1 className="text-center fw-bold mb-5 pb-3">Wyniki wyszukiwania</h1>
            <div className="product-container">
                {data.map((product) => <Product key={product["id"]} name={product["name"]} photo={product["photo"]} price={product["price"]} id={product["id"]} requestDelete={false} />)}
            </div>
        </div>
    </div>
    );
}

export default Search