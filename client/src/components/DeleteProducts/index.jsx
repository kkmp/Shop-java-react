import React, { useState, useEffect, Fragment } from "react";
import Product from "../Home/Product";
import { authorizedGetRequest } from "../Request";

const DeleteProducts = (props) => {
    const [data, setData] = useState([])
    const [child, setChild] = useState(false)

    useEffect(() => {
        const handleChange = async () => {
            const url = "http://localhost:8080/api/product/index";
            const callback = async (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url, callback);
        }
        handleChange()
    }, []);

    const passData = () => {
        setChild(!child)
        props.callback()
    };

    return (
        <Fragment>
            <div style={{ height: "120px" }}></div>
            <div className="product-container">
                {data.map((product) => <Product passData={passData} key={product["id"]} name={product["name"]} photo={product["photo"]} price={product["price"]} id={product["id"]} requestDelete={true} />)}
            </div>
        </Fragment>
    );
};

export default DeleteProducts