import '../css/order_item.css'
import { useNavigate } from 'react-router-dom';
import {MdOutlineArrowForwardIos } from 'react-icons/md'
import { formatDateForOrderItem } from '../Auth/helper'

const OrderItem = ({ order }) => {

  const navigate=useNavigate()

  const handleOrderDetails=()=>{
    navigate("/orderItemDetailsPage",{state:order})
  }

  return (
    <div className="order-item" onClick={handleOrderDetails}
      id={order.status==='Cancelled' || order.status==='Returned' ? 'order-item-cancelled': 
      order.status==='Delivered' ? 'order-item-delivered':''}
    >
      <img src={order.book.imageURL} alt="Book" className="book-image" />
      <div className="book-details">
        <h3 className="book-title">{order.book.title}</h3>
        <p className="book-author">{order.book.author}</p>
      </div>
        <div className="book-details-second">
            <p className="delivery-date "> <span>Delivery Date: </span> 
              <span 
                id='delivery-date-span'
                className={order.status==='Cancelled' ? 'text-with-line-through' : ''}        
              > 
              {formatDateForOrderItem(order.deliveryDate)} </span>       
            </p>
            <p className="delivery-statuss"> <span>Delivery Status: </span> 
              <span 
                className='delivery-status'
                id={'order-'+order.status+'-status'}
              >
              {order.status}</span>         
            </p>
            <p className="quantity"> <span>Total Price: </span> ₹{order.book.price*order.quantity}</p>
        </div>
        <div className="forword-sign">
          <MdOutlineArrowForwardIos/>
        </div>
    </div>
  );
};

export default OrderItem;
