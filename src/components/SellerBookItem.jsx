import "../css/seller_book_item.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SellerBookItem = ({ bookData }) => {

    const [book, setBook] = useState(bookData);
    const navigate = useNavigate();


    // Function to navigate to the book update page
    const updateBookData = (e) => {
        e.stopPropagation();
        navigate("/bookUpdate", { state: book });
    };


    // Function to navigate to the product details page
    const productDetailsHandler = () => {
        navigate("/productDetails", { state: book });
    };


    // Function to change the status of the book (activate/deactivate)
    const changeStatus = async (e) => {
        e.stopPropagation();
        try {
            const initialStatus = book.status;
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/book/${book.id}/changeStatus/`,
                {
                    method: "PATCH",
                }
            );
            if (response.ok) {
                const message = await response.text();
                toast.success(message, {
                    position: "top-center",
                    theme: "dark",
                });
                // Update the book status in the state
                setBook({ ...book, status: !initialStatus });
            }
        } catch (error) {
            console.error(error);
            const errorObj = { errorMessage: error.message };
            // Navigate to the error page in case of an error
            navigate("/errorPage", { state: errorObj });
        }
    };


	
    return (
        <div className="seller-book-card" onClick={productDetailsHandler}>
            <div className="left-content">
                <div className="image-container">
                    <img
                        src={book.imageURL}
                        alt={book.title}
                        className="book-image"
                    />
                </div>
                <h6 className="book-title">{book.title}</h6>
            </div>
            <div className="seller-book-details">
                <div className="book-details-info">
                    <p className="book-author">
                        <span>By </span> {book.author}
                    </p>
                    <p className="book-price">₹{book.price}</p>
                    <p className="book-stock">
                        <span>Stock: </span>
                        {book.stockAvailability}
                    </p>
                    <p className="seller-book-id">
                        {" "}
                        <span>Book id: </span>
                        {book.id}
                    </p>
                </div>
                <div className="book-details-button">
                    {/* Button to update book data */}
                    <button
                        className="update-btn uppper-btn"
                        onClick={updateBookData}
                    >
                        Update
                    </button>
                    {/* Button to change book status */}
                    <button
                        className="update-btn"
                        onClick={changeStatus}
                        id={book.status ? "deactivate-btn" : "activate-btn"}
                    >
                        {book.status ? "Deactivate" : "Activate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerBookItem;
