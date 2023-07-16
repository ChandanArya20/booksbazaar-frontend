import React from 'react';
import '../css/bookcard.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { cart, setCart } = useContext(CartContext);

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

  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-card-image" />
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
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
