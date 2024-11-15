import { useState, Fragment } from "react";
import { toast } from 'react-toastify';
import { authorizedDeleteRequest } from "../Request";

const Product = (product) => {
    const [show, setShow] = useState(true);

    const handleAction = async (productId) => {
        if (!product.requestDelete) {
            window.location = '/productDetail/' + productId
        } else {
            const url = 'http://localhost:8080/api/product/removeProduct/' + productId;
            const callback = () => {
                setShow(false);
                toast.success("Item removed!", { position: toast.POSITION.BOTTOM_RIGHT });
                product.passData(true);
            }
            await authorizedDeleteRequest(url, callback);
        }
    }

    return (
        show ?
            <Fragment>
                <div className="product-item">
                    <div className="product-image">
                        <img src={product.photo} alt="product" />
                    </div>
                    <div className="product-description">
                        <h5>{product.name}</h5>
                        <h6>{product.price} zł</h6>
                        <button className="product-view" onClick={() => handleAction(product.id)}>{product.requestDelete ? "Usuń produkt" : "Zobacz produkt"}</button>
                    </div>
                </div>
            </Fragment> : null
    );
}
export default Product