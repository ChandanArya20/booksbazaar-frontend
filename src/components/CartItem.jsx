import '../css/cart_item.css';
import { RiDeleteBin6Line as CartDeleteButton } from 'react-icons/ri';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {

  const { id, title, author, image, price, quantity: initialQuantity, totalPrice: initialTotalPrice } = item;
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Update the totalPrice whenever quantity changes
    setTotalPrice(price * quantity);
  }, [quantity, price]);

  const plusButtonHandler = () => {
    setQuantity(quantity + 1);
    updateCartItem(quantity + 1);
  };

  const minusButtonHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCartItem(quantity - 1);
    }
  };

  const updateCartItem = (updatedQuantity) => {
    // Calculate the updated total price and update the cart item in the context
    const updatedTotalPrice = price * updatedQuantity;
    setCart((prevCart) =>
      prevCart.map((book) =>
        book.id === id ? { ...book, quantity: updatedQuantity, totalPrice: updatedTotalPrice } : book
      )
    );
  };

  const cartRemoveHandler = () => {
    setCart(cart.filter((book) => book.id !== id));
  };

  return (
    <>
      <div className="cart-item">
        <div className="product-image">
          <img src={image} alt="Product Image" />
        </div>

        <div className="book-details">
          <h3 className="book-title">{title}</h3>
          <a className="book-author">{author}</a>
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
