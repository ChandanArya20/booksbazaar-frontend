import '../css/order_item.css'
import {MdOutlineArrowForwardIos } from 'react-icons/md'

const OrderItem = ({ order }) => {

  return (
    <div className="order-item">
      <img src={order.book.imageURL} alt="Book" className="book-image" />
      <div className="book-details">
        <h3 className="book-title">{order.book.title}</h3>
        <p className="book-author">{order.book.author}</p>
      </div>
        <div className="book-details-second">
            <p className="quantity"> <span>Price: </span> {order.book.price*order.quantity}</p>
            <p className="delivery-date"> <span>Delivery Date: </span> {order.deliveryDate}</p>
            <p className="delivery-statuss"> <span>Delivery Status: </span> <span id='delivery-status'>{order.status}</span></p>
        </div>
        <div className="forword-sign">
          <MdOutlineArrowForwardIos/>
        </div>
        {/* <p className="delivery-address">Delivery Address: {order.deliveryAddress}</p>  */}
    </div>
  );
};

export default OrderItem;
