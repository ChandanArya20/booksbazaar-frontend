import React from 'react';
import '../css/category_result_item.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CategoryResultItem = ({ book }) => {

  const { cart, setCart } = useContext(CartContext);
  const navigate=useNavigate()
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
    <div className="result-book-card" >
      <img src={book.imageURL} alt="Book image" className="book-card-image" onClick={showProductDetails}/>
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author"><span>By: </span>{book.author}</p>
        <div className="book-card-footer">
            <div className="book-card-price">₹{book.price}</div>
            <button
            className={isBookInCart ? 'book-card-button-remove' :'book-card-button'}
            onClick={isBookInCart ? removeFromCart : addToCart}
            >
            {isBookInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryResultItem;
