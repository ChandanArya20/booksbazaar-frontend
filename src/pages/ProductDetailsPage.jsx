import "../css/product_details_page.css";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContex";
import { getWholeUserData } from "../utils/userDetails";
import BeatLoader from "react-spinners/BeatLoader";

const ProductDetailsPage = () => {
    const location = useLocation();
    const bookInfo = location.state; // Extract book information from the location state.
    const navigate = useNavigate();
    const [book, setBook] = useState();
    const { cart, addToCart } = useContext(CartContext);
    const { isUserLoggedin } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const isBookInCart = cart.some((item) => item.book.id === bookInfo?.id); // Check if the book is already in the cart.

    // Function to fetch book details from the API.
    const getAllBookDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/book/${bookInfo.id}`
            );
            if (response.ok) {
                const bookData = await response.json();
                setBook(bookData); // Set the book data in the state.
            }
        } catch (error) {
            console.error(error);
            toast.error("Server is down, try again later", {
                position: "top-center",
                theme: "dark",
            });
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBookDetails(); // Fetch book details when the component mounts.
    }, []);

    useEffect(() => {
        console.log(book); // Log book data when it changes.
    }, [book]);

    // Function to handle adding the book to the cart.
    const handleAddToCart = () => {
        if (isUserLoggedin()) {
            const cartItem = { book, quantity: 1 };
            addToCart(cartItem); // Add the book to the cart.
        } else navigate("/userPhoneLogin"); // Redirect to login if not logged in.
    };

    // Function to navigate to the cart page.
    const goToCart = () => {
        if (isUserLoggedin()) {
            navigate("/cart"); // Navigate to the cart page if logged in.
        } else navigate("/userPhoneLogin"); // Redirect to login if not logged in.
    };

    // Function to handle the "Buy Now" button click.
    const handleBuyNow = async () => {
        if (isUserLoggedin()) {
            try {
                const user = await getWholeUserData();

                if (user.address.length !== 0) {
                    navigate("/addressContinue", { state: { book, user } });
                } else {
                    navigate("/addressForm", { state: { book, user } });
                }
            } catch (error) {
                console.error(error);
                const errorObj = { errorMessage: error.message };
                navigate("/errorPage", { state: errorObj });
            }
        } else {
            navigate("/userPhoneLogin"); // Redirect to login if not logged in.
        }
    };

    return (
        <>
            <Navbar backButton={true} />
            {loading ?
            (
                <div className="loading-overlay">
                    <BeatLoader color="#36d7b7" className="loading-spinner" />
                </div>
            ):
            (<div className="product-details-page">
                <div className="product-details-image">
                    <img src={book?.imageURL} alt={book?.title} />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{book?.title}</h1>
                    <p className="product-author">By {book?.author}</p>
                    <p className="product-price">₹{book?.price}</p>
                    <div className="product-buttons">
                        <button
                            className="addToCart"
                            onClick={isBookInCart ? goToCart : handleAddToCart}
                        >
                            {isBookInCart ? "Go To Cart" : "Add To Cart"}
                        </button>
                        <button className="buyNow" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                    <div className="book-highlight">
                        <h3 className="highlight-title">Highlight</h3>
                        <p className="highlight-item">
                            <span className="highlight-label">Author:</span>{" "}
                            {book?.author}
                        </p>
                        <p className="highlight-item">
                            <span className="highlight-label">Language:</span>{" "}
                            {book?.language}
                        </p>
                        <p className="highlight-item">
                            <span className="highlight-label">Pages:</span>{" "}
                            {book?.pages}
                        </p>
                        <p className="highlight-item">
                            <span className="highlight-label">Publisher:</span>{" "}
                            {book?.publisher}
                        </p>
                    </div>
                    <div className="specifications">
                        <h2 className="section-title">Specifications</h2>
                        <ul className="spec-list">
                            {book?.isbn ? (
                                <li className="spec-item">
                                    <span className="spec-label">ISBN:</span>{" "}
                                    {book?.isbn}
                                </li>
                            ) : (
                                ""
                            )}
                            <li className="spec-item">
                                <span className="spec-label">Pages:</span>{" "}
                                {book?.pages}
                            </li>
                            <li className="spec-item">
                                <span className="spec-label">Publisher:</span>{" "}
                                {book?.publisher}
                            </li>
                            {book?.publishingYear ? (
                                <li className="spec-item">
                                    <span className="spec-label">
                                        Publishing Year:
                                    </span>{" "}
                                    {book?.publishingYear.slice(0, 4)}
                                </li>
                            ) : (
                                ""
                            )}
                            <li className="spec-item">
                                <span className="spec-label">Category:</span>{" "}
                                {book?.category}
                            </li>
                            <li className="spec-item">
                                <span className="spec-label">Format:</span>{" "}
                                {book?.format}
                            </li>
                            <li className="spec-item">
                                <span className="spec-label">Publisher:</span>{" "}
                                {book?.publisher}
                            </li>
                            {book?.edition ? (
                                <li className="spec-item">
                                    <span className="spec-label">Edition:</span>{" "}
                                    {book?.edition}
                                </li>
                            ) : (
                                ""
                            )}
                        </ul>
                    </div>
                    <p className="highlight-item" id="description-highlight">
                        <span className="highlight-label" id="description">
                            Description:
                        </span>{" "}
                        {book?.description}
                    </p>
                </div>
            </div>
            )
            }
        </>
    );
};

export default ProductDetailsPage;
