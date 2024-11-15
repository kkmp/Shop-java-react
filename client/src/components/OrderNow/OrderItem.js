const OrderItem = (product) => {
    return (
        <tr>
            <td><b>{product.name}</b></td>
            <td>{product.price} zł</td>
        </tr>
    );
}
export default OrderItem