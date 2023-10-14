import "../css/order_item_details_page.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/formatDate";
import AddressItem from "../components/AddressItem";
import { useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const OrderItemDetailsPage = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const order = location.state;
    const [status, setStatus] = useState(order.status);

    // Function to handle order cancellation
    const handleCancelOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/order/${order.id}?status=Cancelled`,
                {
                    method: "PATCH",
                }
            );
            if (response.ok) {
                setStatus("Cancelled");
                toast.success("Order cancelled successfully...", {
                    position: "top-center",
                    theme: "dark",
                });
            } else {
                toast.error("Order cancellation failed..., try again", {
                    position: "top-center",
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj = { errorMessage: error.message };
            navigate("/errorPage", { state: errorObj });
        } finally {
            setLoading(false);
        }
    };

    // Function to handle order return
    const handleReturnOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/order/${order.id}?status=Returned`,
                {
                    method: "PATCH",
                }
            );
            if (response.ok) {
                setStatus("Returned");
                toast.success(
                    "Order returned successfully..., Order will be picked up soon",
                    {
                        position: "top-center",
                        theme: "dark",
                    }
                );
            } else {
                toast.error("Order return failed..., try again", {
                    position: "top-center",
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj = { errorMessage: error.message };
            navigate("/errorPage", { state: errorObj });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar backButton={true} />
            <div className="order-item-details-container">
                <div className="order-item-image">
                    <img src={order.book.imageURL} alt={order.book.title} />
                </div>
                <div className="order-item-details">
                    {/* Display order details */}
                    <h1>{order.book.title}</h1>
                    <p>
                        <span>By: </span>
                        {order.book.author}
                    </p>
                    <p>
                        <span>Order Date: </span>
                        {formatDate(order.orderDate)}
                    </p>
                    <p>
                        {" "}
                        <span>Quantity: </span>
                        {order.quantity}
                    </p>
                    <p>
                        {" "}
                        <span>Total price: </span>₹
                        {order.quantity * order.book.price}
                    </p>
                    <p
                        className={
                            order.status === "Cancelled"
                                ? "text-with-line-through"
                                : ""
                        }
                    >
                        <span>Delivery Date: </span>
                        {formatDate(order.deliveryDate)}
                    </p>
                    <p>
                        <span>Delivery Status: </span>
                        <span
                            className="delivery-status"
                            id={"order-" + order.status + "-status"}
                        >
                            {status}
                        </span>
                    </p>
                    <h2>Shipping Address</h2>
                    <div className="order-item-details-extra">
                        <AddressItem address={order.deliveryAddress} />

                        <div className="cancel-order-button">
                            {/* Display appropriate buttons based on order status */}
                            {status !== "Cancelled" &&
                                status !== "Delivered" &&
                                status !== "Returned" && (
                                    <button
                                        onClick={handleCancelOrder}
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Cancelling..."
                                            : "Cancel Order"}
                                        {loading && (
                                            <div className="loading-overlay-btn">
                                                <ClipLoader color="#620c88" />
                                            </div>
                                        )}
                                    </button>
                                )}
                            {status == "Delivered" && (
                                <button
                                    onClick={handleReturnOrder}
                                    disabled={loading}
                                >
                                    {loading ? "Returning..." : "Return"}
                                    {loading && (
                                        <div className="loading-overlay-btn">
                                            <ClipLoader color="#620c88" />
                                        </div>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderItemDetailsPage;
