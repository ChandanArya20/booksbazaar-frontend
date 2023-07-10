import React from 'react';
import '../css/bookcard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-card__image" />
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__price">{book.price}</div>
        <button className="book-card__button">Add to Cart</button>
      </div>
    </div>
  );
};

export default BookCard;
