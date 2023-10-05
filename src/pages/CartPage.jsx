import "../css/cart_page.css";
import React, { useState, useContext, useEffect } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getWholeUserData } from "../Helper/helper";
import BeatLoader from "react-spinners/BeatLoader";

const CartPage = () => {
	
    const { cart, refreshAllCartItems, totalCartPrice, cartQuantity } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [cart]);

    useEffect(() => {
        refreshAllCartItems();
    }, []);

    const handlePlaceOrder = async () => {
        const user = await getWholeUserData();
        const book = null;
        if (user.address.length !== 0) {
            navigate("/addressContinue", { state: { book, user } });
        } else {
            navigate("/addressForm", { state: { book, user } });
        }
    };

    return (
        <>
            <Navbar backButton={true} />
            {loading ? (
                <div className="loading-overlay">
                    <BeatLoader color="#36d7b7" className="loading-spinner" />
                </div>
            ) : cartQuantity === 0 ? (
                <div className="empty-cart">
                    <h1 className="empty-cart-heading">Cart is Empty</h1>
                    <button
                        className="empty-cart-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-page">
                    <div className="cart-all-item">
                        <h1>Shopping Carts</h1>
                        <div className="cart-items-container">
                            <div className="cart-items">
                                {cart.map((item, index) => (
                                    <CartItem key={index} cartItem={item} />
                                ))}
                            </div>
                        </div>
                        <div className="order-details">
                            <div className="total-amount">
                                Total: ₹ {totalCartPrice.toFixed(2)}
                            </div>
                            <button
                                className="purchase-btn"
                                onClick={handlePlaceOrder}
                            >
                                Place order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartPage;
