import React, { useState, useEffect, Fragment } from "react";
import CartItem from "./CartItem";
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { authorizedGetRequest } from "../Request";

const CartList = (props) => {
    const [data, setData] = useState([])
    const [child, setChild] = useState(false)

    useEffect(() => {
        const handleAction = async () => {
            const url = 'http://localhost:8080/api/cart/cartList'
            const callback = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url, callback);
        }
        handleAction()
    }, [child]);

    const passData = () => {
        setChild(!child)
        props.callback()
        toast.success("Przedmiot został odłożony!", { position: toast.POSITION.BOTTOM_RIGHT });
    };

    return (
        <div className="cart-list">
            {data.length !== 0 ?
                <Fragment>
                    {data.map((cart) => <CartItem passData={passData} key={nanoid()} name={cart["name"]} photo={cart["photo"]} price={cart["price"]} description={cart["description"]} id={cart["id"]} />)}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="mx-auto w-50">
                                <button onClick={() => { window.location = '/orderNow' }} className="btn btn-success btn-lg w-100">Zamów teraz</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
                : null
            }
            {data.length === 0 ?
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="mx-auto w-50 text-center">
                            <h1>Twój koszyk jest pusty</h1>
                            <button onClick={() => { window.location = '/' }} className="btn btn-success btn-lg w-100 mt-5">Zobacz ofertę</button>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
};

export default CartList