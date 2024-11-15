import { Fragment } from "react";

const OrderItem = (order) => {
    return (
        <Fragment>
            <div className="col-6">
                <a href={'/productDetail/' + order.product.id}>
                    <img className="img-fluid" src={order.product.photo} />
                </a>
            </div>
            <div className="col-6">
                <h2><b>Nazwa przedmiotu:</b> {order.product.name}</h2>
                <h5><b>Cena:</b> {order.product.price}</h5>
                <h5><b>Opis przedmiotu:</b> {order.product.description}</h5>
                <h5><b>Status realizacji zamówienia:</b> {order.status}</h5>
                <h5><b>Metoda płatności:</b> {order.paymentMethod}</h5>
                <h5><b>Status platnosci:</b> {order.paymentStatus}</h5>
                <h5><b>Adres:</b> {order.address}</h5>
            </div>
            <hr className="dropdown-divider my-5 bg-dark"></hr>
        </Fragment>
    );
}
export default OrderItem