import React from "react";
import "../css/category_result_item.css";
import { useContext } from "react";
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContex';

const CategoryResultItem = ({ book }) => {

    const { cart, addToCart } = useContext(CartContext);
    const { isUserLoggedin } = useContext(UserContext);
    const navigate = useNavigate();


    // Check if the book is already in the cart
    const isBookInCart = cart.some((item) => item.book.id === book.id);


    // Function to navigate to the cart page
    const goToCart = (e) => {
        e.stopPropagation();
        navigate("/cart");
    };


    // Function to handle adding the book to the cart
    const handleAddToCart = (e) => {
        e.stopPropagation();

        if (isUserLoggedin()) {
            const cartItem = { book, quantity: 1 };
            addToCart(cartItem);
        } else {
            navigate("/userPhoneLogin");
        }
    };

    // Function to navigate to the product details page
    const showProductDetails = () => {
        navigate("/productDetails", { state: book });
    };

    // Render the component
    return (
        <div className="result-book-card">
            <img
                src={book.imageURL}
                alt="Book image"
                className="book-card-image"
                onClick={showProductDetails}
            />
            <div className="book-card-content">
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-author">
                    <span>By: </span>
                    {book.author}
                </p>
                <div className="book-card-footer">
                    <div className="book-card-price">₹{book.price}</div>
                    <button
                        className="book-card-button"
                        onClick={isBookInCart ? goToCart : handleAddToCart}
                    >
                        {isBookInCart ? "Go To Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryResultItem;
