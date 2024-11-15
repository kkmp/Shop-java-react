import React, { useState, Fragment } from "react";
import { authorizedDeleteRequest } from "../Request";

const CartItem = (product) => {
    const [show, setShow] = useState(true)

    const handleRemoveFromCart = async (productid) => {
        const url = 'http://localhost:8080/api/cart/removeFromCart/' + productid;
        const callback = () => {
            setShow(false);
            product.passData(true);
        }
        await authorizedDeleteRequest(url, callback);
    }

    return (
        show ?
            <Fragment>
                <div className="cart-item">
                    <div className="cart-photo d-flex align-items-center justify-content-center">
                        <img className="" src={product.photo} alt="product_item" />
                    </div>
                    <div className="cart-description">
                        <ul>
                            <li><h3>{product.name}</h3></li>
                            <li>{product.description}</li>
                        </ul>
                    </div>
                    <div className="cart-details">
                        <div className="cart-price">
                            {product.price} zł
                        </div>
                        <div>
                            <button onClick={() => handleRemoveFromCart(product.id)} className="btn btn-warning">Odłóż przedmiot</button>
                        </div>
                    </div>
                </div>
            </Fragment> : null
    );
}
export default CartItem