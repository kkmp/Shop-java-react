import React, { useState, useEffect, Fragment } from "react";
import OrderItem from "./OrderItem";
import Error from "../Error";
import { toast } from 'react-toastify';
import { authorizedGetRequest, authorizedPostRequest } from "../Request";

const OrderNow = () => {
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('przelew online')
    const [address, setAddress] = useState('')
    const initialValue = [];
    const [error, setError] = useState(initialValue);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const handleAction = async () => {
            const url1 = 'http://localhost:8080/api/orders/orderNow'
            const callback1 = (response) => {
                setTotalPrice(response.data)
            }
            await authorizedGetRequest(url1, callback1);

            const url2 = 'http://localhost:8080/api/cart/cartList'
            const callback2 = (response) => {
                var newDataArr = Object.keys(response.data).map((key) => response.data[key]);
                setData(newDataArr)
            }
            await authorizedGetRequest(url2, callback2);
        }
        handleAction()
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const url = 'http://localhost:8080/api/orders/orderPlace'
        const data = {
            "paymentMethod": paymentMethod,
            "address": address
        }
        const callback = () => {
            toast.success("Zamówienie przyjęte do realizacji!", { position: toast.POSITION.BOTTOM_RIGHT });
            setShow(false);
        }
        const errorCallback = (response) => {
            var newErrorArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
            setError(newErrorArr)
        }
        await authorizedPostRequest(url, data, callback, errorCallback);
    }

    const handleChange = (event) => {
        setPaymentMethod(event.target.value)
    }

    return (
        <Fragment>
            <div style={{ height: "80px" }}></div>
            <div className="container mt-5">
                {show ?
                    <Fragment>
                        <div>
                            <table className="table">
                                <tbody>
                                    {data.map((product, index) => <OrderItem key={index} name={product.name} price={product.price} />)}
                                    <tr>
                                        <td><b>Łączna cena produktów</b></td>
                                        <td>{totalPrice} zł</td>
                                    </tr>
                                    <tr>
                                        <td><b>Przesyłka</b></td>
                                        <td>10 zł</td>
                                    </tr>
                                    <tr>
                                        <td><b>Suma</b></td>
                                        <td><b>{totalPrice + 10} zł</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    {error.map((err, idx) => <Error message={err} key={idx} />)}
                                </div>
                                <div className="mx-auto w-50 order-form-container p-3">
                                    <form onSubmit={handleSubmit} className="mt-5">
                                        <div className="mb-3">
                                            <h3>Adres</h3>
                                            <textarea className="form-control" name="address" placeholder="Wpisz tutaj adres dostawy" rows="3" value={address} onChange={({ target }) => setAddress(target.value)} required></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <h3>Metoda płatności</h3>
                                            <div className="form-check">
                                                <input className="form-check-input" value="przelew online" type="radio" name="paymentMethod" id="methodTransferOnline" checked={paymentMethod === 'przelew online'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="methodTransferOnline">
                                                    Przelew online
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" value="BLIK" type="radio" name="paymentMethod" id="methodBLIK" checked={paymentMethod === 'BLIK'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="methodBLIK" >
                                                    BLIK
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" value="przelew tradycyjny" type="radio" name="paymentMethod" id="methodTransfer" checked={paymentMethod === 'przelew tradycyjny'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="methodTransfer" >
                                                    Przelew tradycyjny
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" value="platność przy odbiorze" type="radio" name="paymentMethod" id="methodDelivery" checked={paymentMethod === 'platność przy odbiorze'} onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="methodDelivery" >
                                                    Płatność przy odbiorze
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mx-auto w-50">
                                            <button type="submit" className="btn btn-primary btn-lg w-100">Potwierdź zakup</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <div className="col-12">
                            <div className="mx-auto w-50 text-center">
                                <h1>Twój koszyk jest pusty</h1>
                                <button onClick={() => { window.location = '/' }} className="btn btn-success btn-lg w-100 mt-5">Zobacz ofertę</button>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    );
};

export default OrderNow