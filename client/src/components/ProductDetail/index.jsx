import React, { Fragment, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import jwt from "jwt-decode";
import { toast } from 'react-toastify';
import { authorizedGetRequest, authorizedPostRequest } from "../Request";
import Error from "../Error";

const ProductDetail = (props) => {
    const { id } = useParams()
    const [data, setData] = useState('')
    const [role, setRole] = useState('')
    const initialValue = [];
    const [error, setError] = useState(initialValue);

    useEffect(() => {
        const handleChange = async () => {
            const tokenRead = localStorage.getItem("token");
            const decoded = jwt(tokenRead);
            setRole(decoded["role"]);

            const url = 'http://localhost:8080/api/product/detail/' + id
            const callback = (response) => {
                setData(response.data)
            }
            const errorCallback = (response) => {
                var newErrorArr = Object.keys(response.data.errors).map(key => response.data.errors[key]);
                setError(newErrorArr)
            }
            await authorizedGetRequest(url, callback, errorCallback);
        }
        handleChange()
    }, []);

    const handleEdit = (productId) => {
        window.location = '/editProduct/' + productId
    }

    const handleAddToCart = async (productId) => {
        const url = 'http://localhost:8080/api/cart/addToCart'
        const data = `"${productId}"`;
        const callback = () => {
            toast.success("Przedmiot został dodany do koszyka!", { position: toast.POSITION.BOTTOM_RIGHT });
            props.callback();
        }
        await authorizedPostRequest(url, data, callback);
    }

    return (
        data ?
            <Fragment>
                <div style={{ height: "150px" }}></div>
                <div className="mx-auto w-50 order-form-container p-5">
                    <div className="row" />
                    <div className="text-center">
                        <img className="detail-photo" src={data.photo} alt={data.description} />
                    </div>
                    <div className="col-6" />
                    <h2 className="fw-bold">{data.name}</h2>
                    <h3><b>Cena:</b> {data.price} zł</h3>
                    <h4><b>Kategoria:</b> {data.category}</h4>
                    <h5><b>Opis:</b> {data.description}</h5>
                    <br /><br />
                    <input type="hidden" name="product_id" value="{}" />
                    <div className="w-50 mx-auto">
                        <button className="btn btn-success btn-lg w-100" onClick={() => handleAddToCart(data.id)}>Dodaj do koszyka</button>
                    </div>
                    {role === "Admin" ?
                        <div className="w-50 mx-auto mt-2">
                            <button className="btn btn-danger btn-lg w-100" onClick={() => handleEdit(data.id)} >Edytuj produkt</button>
                        </div> : null
                    }
                </div>
            </Fragment >
            :
            <Fragment>
                <div className="container pt-5 mt-5">
                    <div className="row">
                        {error.map((err, idx) => <Error message={err} key={idx} />)}
                    </div></div>
            </Fragment>

    );
}

export default ProductDetail