import '../css/order_item.css'

const OrderItem = ({ order }) => {
  const { bookImage, bookTitle, bookAuthor, quantity, deliveryDate, deliveryStatus, deliveryAddress } = order;

  return (
    <div className="order-item">
      <img src={bookImage} alt="Book" className="book-image" />
      <div className="book-details">
        <h3 className="book-title">{bookTitle}</h3>
        <p className="book-author">{bookAuthor}</p>
        <p className="quantity">Quantity: {quantity}</p>
        <p className="delivery-date">Delivery Date: {deliveryDate}</p>
        <p className="delivery-status">Delivery Status: {deliveryStatus}</p>
        <p className="delivery-address">Delivery Address: {deliveryAddress}</p>
      </div>
    </div>
  );
};

export default OrderItem;
