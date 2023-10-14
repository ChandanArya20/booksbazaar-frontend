import "../css/seller_dashboard.css";
import { FaUser as ProfileIcon } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerProfileDropdown from "../components/SellerProfileDropdown";
import Navbar from "../components/Navbar";
import SellerBookItem from "../components/SellerBookItem";
import { toast } from "react-toastify";
import { getCurrentSellerDetails } from "../auth/sellerAuth";
import BackButton from "../components/BackButton";
import BeatLoader from "react-spinners/BeatLoader";

const SellerDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        fetchSellerAllBooks();
    }, []);

    // Handler for the "Sell a New Book" button
    const sellBookButtonHandler = () => {
        navigate("/bookAdd");
    };

    // Fetch all books associated with the seller
    const fetchSellerAllBooks = async () => {
        setLoading(true);
        const sellerId = getCurrentSellerDetails().id;
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/book/seller/${sellerId}/all-book`
            );
            if (response.ok) {
                const bookList = await response.json();
                setBooks(bookList);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Server is down, try again later", {
                position: "top-center",
                theme: "dark",
            });
        }
    };

    // Handler for the "See All Orders" button
    const seeAllOrders = () => {
        navigate("/sellerOrders");
    };

    return (
        <>
            <Navbar />
            <div className="seller-dashboard-container">
                {loading ? (
                    <div className="loading-overlay">
                        <BeatLoader
                            color="#36d7b7"
                            className="loading-spinner"
                        />
                    </div>
                ) : (
                    <>
                        <div className="seller-dashboard">
                            <h2>Welcome, Book Seller!</h2>
                            <div
                                className="dashboard-main"
                                id="dashboard-main-id"
                            >
                                <BackButton />
                                <button onClick={sellBookButtonHandler}>
                                    Sell a New Book{" "}
                                </button>
                                <div
                                    className="profile-icon seller-profile-icon"
                                    onClick={() => setShowMenu(true)}
                                >
                                    <ProfileIcon id="seller-profile" />
                                </div>
                                {showMenu && (
                                    <SellerProfileDropdown
                                        setShowMenu={setShowMenu}
                                        showMenu={showMenu}
                                    />
                                )}
                            </div>
                            <div className="see-all-orders-btn-container">
                                <button
                                    onClick={seeAllOrders}
                                    id="see-all-orders-btn"
                                >
                                    See All Orders{" "}
                                </button>
                            </div>
                            <div className="published-books">
                                <h3>Published Books</h3>
                            </div>
                            <div className="seller-books">
                                {books.length === 0 ? (
                                    <div className="empty-seller-publish-books">
                                        <h1 className="empty-cart-heading">
                                            There is no published books...
                                        </h1>
                                        <button
                                            className="empty-cart-btn"
                                            onClick={() => navigate(-1)}
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                ) : (
                                    books.map((book) => (
                                        <SellerBookItem
                                            key={book.id}
                                            bookData={book}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SellerDashboard;
