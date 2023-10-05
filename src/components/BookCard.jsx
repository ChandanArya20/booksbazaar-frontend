import "../css/bookcard.css";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContex";

const BookCard = ({ book }) => {
	
    const { cart, refreshAllCartItems, deleteCartItems, addToCart } =useContext(CartContext);
    const { isUserLoggedin } = useContext(UserContext);
    const [activeDelete, setActiveDelete] = useState(false);
    const navigate = useNavigate();

    //checking whether comming book is already in cart or not
    const isBookInCart = cart.some((item) => item.id === book.id) ||
						 cart.some((item) => item.book.id === book.id);
        

    //add book to the cart
    const HandleAddToCart = (e) => {
		
        e.stopPropagation();
        if (isUserLoggedin()) {
            const cartItem = { book, quantity: 1 };
            addToCart(cartItem);
        } else {
            navigate("/userPhoneLogin");
        }
    };

    
    //remove book from cart
    const HandleRemoveFromCart = async (e) => {
        setActiveDelete(true);
        e.stopPropagation();
        await refreshAllCartItems();
    };


    //delete book from cart
    useEffect(() => {
        if (activeDelete) {
            deleteCartItems(cart.filter((item) => item.book.id == book.id));
            setActiveDelete(false);
        }
    }, [cart]);


    const showProductDetails = () => {
        navigate("/productDetails", { state: book });
    };



    return (
        <div className="book-card" onClick={showProductDetails}>
            <img
                src={book.imageURL}
                alt={book.title}
                className="book-card-image"
            />
            <div className="book-card-content">
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-author">{book.author}</p>
                <div className="book-card-price">₹{book.price}</div>
                <button
                    className={
                        isBookInCart
                            ? "book-card-button-remove"
                            : "book-card-button"
                    }
                    onClick={(e) =>
                        isBookInCart
                            ? HandleRemoveFromCart(e)
                            : HandleAddToCart(e)
                    }
                >
                    {isBookInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default BookCard;
