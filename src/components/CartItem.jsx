import '../css/cart_item.css';
import { RiDeleteBin6Line as CartDeleteButton } from 'react-icons/ri'
import { useState, useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'

const CartItem = ({ cartItem }) => { 

  console.log(cartItem)

  const {cart, setCart } = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(cartItem.book.price)
  const [quantity, setQuantity] = useState(cartItem.quantity)

  useEffect(() => {
    setTotalPrice(cartItem.book.price * quantity);
  }, [quantity]);

  const plusButtonHandler = () => {
    setQuantity(quantity + 1)
    console.log(quantity)
    setCart(cart.map(item=>item.id===cartItem.id ? {...item, quantity:quantity+1}:item))
    console.log(cart)
  }

  const minusButtonHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setCart(cart.map(item=>item.id===cartItem.id ? {...item, quantity:quantity-1}:item))
    }
  }

  const cartRemoveHandler = () => {
    setCart(cart.filter(item => item.id !== cartItem.id));
  };

  return (
    <>
      <div className="cart-item">
        <div className="product-image">
          <img src={cartItem.book.imageURL} alt="Product Image" />
        </div>

        <div className="book-details">
          <h3 className="book-title">{cartItem.book.title}</h3>
          <a className="book-author">{cartItem.book.author}</a>
        </div>

        <div className="quantity-control">
          <button className="quantity-btn minus" onClick={minusButtonHandler}>
            -
          </button>
          <input type="number" className="quantity-input" value={quantity} readOnly />
          <button className="quantity-btn plus" onClick={plusButtonHandler}>
            +
          </button>
        </div>

        <div className="price">{totalPrice.toFixed(2)} ₹</div>
        <CartDeleteButton className="remove-btn" onClick={cartRemoveHandler} />
      </div>
    </>
  );
};

export default CartItem;
