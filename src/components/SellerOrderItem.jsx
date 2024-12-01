import "../css/order_item.css";
import "../css/delivery_status_model.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { formatDateForOrderItem } from "../utils/formatDate";
import DeliveryStatusModel from "../components/DeliveryStatusModel";
import { useState } from "react";

const SellerOrderItem = ({ order }) => {

    const navigate = useNavigate();
    // State to control the visibility of the delivery status model
    const [showStatusModel, setShowStatusModel] = useState(false);
    // State to store the current order status
    const [status, setStatus] = useState(order.status);

    // Function to handle changes in order status
    const handleStatusChanges = (newStatus) => {
        setStatus(newStatus);
    };

    // Function to navigate to order details page
    const handleOrderDetails = () => {
        navigate("/sellerOrderItemDetails", { state: order });
    };

    // Function to show the delivery status model
    const showDeliveryStatusModel = (e) => {
        e.stopPropagation(); // Prevent event propagation to parent elements
        setShowStatusModel(true);
    };

    return (
        <div
            className="order-item"
            onClick={handleOrderDetails}
            id={
                status === "Cancelled" || status === "Returned"
                    ? "order-item-cancelled"
                    : status === "Delivered"
                    ? "order-item-delivered"
                    : ""
            }
        >
            <div className="order-item-left">
                <img
                    src={order.book.imageURL}
                    alt="Book"
                    className="book-image"
                />
                <div className="book-details">
                    <h3 className="book-title">{order.book.title}</h3>
                    <p className="book-author">{order.book.author}</p>
                </div>
            </div>
            <div className="book-details-second">
                <p className="book-id">
                    {" "}
                    <span>Book id: </span>
                    {order.book.id}
                </p>
                <p className="delivery-date ">
                    {" "}
                    <span>Delivery Date: </span>
                    <span
                        id="delivery-date-span"
                        className={
                            order.status === "Cancelled"
                                ? "text-with-line-through"
                                : ""
                        }
                    >
                        {formatDateForOrderItem(order.deliveryDate)}{" "}
                    </span>
                </p>
                <p className="delivery-statuss">
                    {" "}
                    <span>Delivery Status: </span>
                    <span
                        className="delivery-status"
                        id={"order-" + status + "-status"}
                    >
                        {status}
                    </span>
                </p>
                <p className="quantity">
                    {" "}
                    <span>Total Price: </span> ₹
                    {order.book.price * order.quantity}
                </p>
            </div>
            <div className="delivery-status-change-btn">
                {/* Button to change delivery status */}
                <button
                    onClick={showDeliveryStatusModel}
                    className="add-new-address-btn"
                    id="delivery-status-change-btn"
                >
                    Change status{" "}
                </button>
            </div>
            {/* Render the delivery status model when showStatusModel is true */}
            {showStatusModel && (
                <DeliveryStatusModel
                    setShowStatusModel={setShowStatusModel}
                    orderId={order.id}
                    orderStatus={status}
                    handleStatusChanges={handleStatusChanges}
                />
            )}
            <div className="forword-sign">
                <MdOutlineArrowForwardIos />
            </div>
        </div>
    );
};

export default SellerOrderItem;
