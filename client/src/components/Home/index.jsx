import React, { useState, useEffect } from "react";
import Product from "./Product";
import { getRequest } from "../Request"

export default function Home() {
    const [data, setData] = useState([]);
    const initialValue = [];
    const [error, setError] = useState(initialValue);

    useEffect(() => {
        const handleChange = async () => {
            const url = "http://localhost:8080/api/product/index";
            const callback = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            const errorCallback = (response) => {
                var newErrorArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
                setError(newErrorArr)
            }
            await getRequest(url, callback, errorCallback);
        }
        handleChange()
    }, []);

    return (<div>
        <div style={{ height: "50px" }}></div>
        <div className="product-container">
            {data.map((product) => <Product key={product["id"]} name={product["name"]} photo={product["photo"]} price={product["price"]} id={product["id"]} requestDelete={false} />)}
        </div>
    </div>
    );
};
