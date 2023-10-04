import '../css/cart_item.css';
import { RiDeleteBin6Line as CartDeleteButton } from 'react-icons/ri';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ cartItem }) => { 
  const {cart, updateCartItemQuantity, deleteCartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(cartItem.book.price);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const navigate=useNavigate();

  useEffect(() => {
    setTotalPrice(cartItem.book.price * quantity);
  }, [quantity]);


  const showProductDetails=()=>{
    navigate("/productDetails", { state: cartItem.book });
  }

  const plusButtonHandler = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
    updateCartItemQuantity(cartItem,quantity+1);
    console.log(cart);
  };

  const minusButtonHandler = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItemQuantity(cartItem,quantity-1);
    }
  };

  const cartRemoveHandler = (e) => {
    e.stopPropagation();
    deleteCartItems([cartItem]);
  };



  return (
    <>
      <div className="cart-item" onClick={showProductDetails}>
        <div className="left-cart-item">
          <div className="product-image" >
            <img src={cartItem.book.imageURL} alt="Product Image" />
          </div>

          <div className="book-details">
            <h3 className="book-title">{cartItem.book.title}</h3>
            <a className="book-author">{cartItem.book.author}</a>
          </div>
        </div>
        <div className="right-cart-item">
          <div className="quantity-control">
            <button className="quantity-btn minus" onClick={minusButtonHandler}>
              -
            </button>
            <input type="number" className="quantity-input" value={quantity} readOnly onClick={(e)=>e.stopPropagation()}/>
            <button className="quantity-btn plus" onClick={plusButtonHandler}>
              +
            </button>
          </div>
          <div className="price">{totalPrice.toFixed(2)} ₹</div>
          <div>
            <CartDeleteButton className="remove-btn" onClick={cartRemoveHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
