import React, { useState, useEffect, Fragment } from "react";
import MyOrderItem from './MyOrdersItem'
import { authorizedGetRequest } from "../Request";

const Orders = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const handleAction = async () => {
            const url = 'http://localhost:8080/api/orders/myOrders'
            const callback = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url, callback);
        }
        handleAction()
    }, []);

    return (
        <Fragment>
            <div style={{ height: "50px" }}></div>
            <div className="container mt-5">
                <h1 className="text-center fw-bold">Moje zamówienia</h1>
                <div className="row d-flex align-items-center">
                    {data.map((order, index) => <MyOrderItem key={index} product={order.product} status={order.status} paymentStatus={order.paymentStatus} paymentMethod={order.paymentMethod} address={order.address} />)}
                </div>
            </div>
        </Fragment>
    );
};

export default Orders