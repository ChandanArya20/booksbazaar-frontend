import '../css/bookcard.css';
import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {

  const { cart, setCart } = useContext(CartContext);
  const navigate=useNavigate()

  //checking whether comming book is already in cart or not 
  const isBookInCart = cart.some((item) => item.id === book.id);

  const addToCart = () => {
    if (!isBookInCart) {
      setCart([
        ...cart,
        {
          ...book,
          quantity: 1,
          totalPrice: book.price,
        },
      ]);
    }
  };

  const removeFromCart = () => {
    if (isBookInCart) {
      setCart(cart.filter((item) => item.id !== book.id));
    }
  };

  const showProductDetails=()=>{
    navigate("/productDetailsPage", { state: book })
  }

  return (
    <div className="book-card" >
      <img src={book.image} alt={book.title} className="book-card-image" onClick={showProductDetails}/>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <div className="book-card-price">₹{book.price}</div>
        <button
          className={isBookInCart ? 'book-card-button-remove' :'book-card-button'}
          onClick={isBookInCart ? removeFromCart : addToCart}
        >
          {isBookInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
