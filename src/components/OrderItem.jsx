import '../css/order_item.css'

const OrderItem = ({ order }) => {

  return (
    <div className="order-item">
      <img src={order.book.imageURL} alt="Book" className="book-image" />
      <div className="book-details">
        <h3 className="book-title">{order.book.title}</h3>
        <p className="book-author">{order.book.author}</p>
      </div>
        <div className="book-details-second">
            <p className="quantity">Quantity: {order.quantity}</p>
            <p className="delivery-date">Delivery Date: {order.deliveryDate}</p>
            <p className="delivery-status"><span>Delivery Status: </span>{order.status}</p>
        </div>
        {/* <p className="delivery-address">Delivery Address: {order.deliveryAddress}</p>  */}
    </div>
  );
};

export default OrderItem;
