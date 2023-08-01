import '../css/order_success_page.css'
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {

    const navigate=useNavigate()

  const handleContinueShopping=()=>{

    navigate("/")
  }
  
  return (
    <div className="order-success-container">
      <div className="order-success-content">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order.</p>
        <p>Your items will be delivered soon.</p>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
