import "../css/order_page.css";
import UserOrderItem from "../components/UserOrderItem";
import { getCurrentUserDetails } from "../utils/userDetails";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { BiFilterAlt as FilterIcon } from "react-icons/bi";
import SellerOrderFilterModel from "../components/SellerOrderFilterModel";
import BeatLoader from "react-spinners/BeatLoader";

const UserOrderPage = () => {
    const [loading, setLoading] = useState(false);
    const [originalOrders, setOriginalOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const [showFilter, setShowFilter] = useState(false);
    const [filterStatus, setFilterStatus] = useState({
        Pending: false,
        Confirmed: false,
        Shipped: false,
        Delivered: false,
        Cancelled: false,
        Returned: false,
    });

    // Close the filter modal
    const closeModel = (e) => {
        e.stopPropagation();
        setShowFilter(false);
    };

    // Apply filters to orders
    const applyFilter = (filteredStatus) => {
        setFilterStatus(filteredStatus);
        const filteredOrders = originalOrders.filter(
            (order) => filteredStatus[order.status]
        );

        if (filteredOrders.length === 0) {
            setOrders(originalOrders);
        } else {
            setOrders(filteredOrders);
        }
    };

    // Fetch all orders associated with the user
    const fetchAllOrders = async () => {
        setLoading(true);
        const userId = getCurrentUserDetails().id;
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/order/user/${userId}/all-orders`
            );

            if (response.ok) {
                const orderList = await response.json();
                setOriginalOrders(orderList);
                setOrders(orderList);
                setLoading(false);
            } else {
                const errorObj = {
                    errorMessage: "Something went wrong, try later...",
                };
                navigate("/errorPage", { state: errorObj });
            }
        } catch (error) {
            console.error(error);
            toast.error("Server is down, try again later", {
                position: "top-center",
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <Navbar backButton={true} />
            {loading ? (
                <div className="loading-overlay">
                    <BeatLoader color="#36d7b7" className="loading-spinner" />
                </div>
            ) : orders.length === 0 ? (
                <div className="empty-cart">
                    <h1 className="empty-cart-heading">
                        There are no recent orders...
                    </h1>
                    <button
                        className="empty-cart-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div className="order-page">
                        <h2>My Orders</h2>
                        <div
                            className="filter-button"
                            onClick={() => setShowFilter(true)}
                        >
                            <FilterIcon />
                            <p>Filters </p>
                        </div>
                        {showFilter && (
                            <SellerOrderFilterModel
                                setShowFilter={setShowFilter}
                                applyFilter={applyFilter}
                                currentFilterStatus={filterStatus}
                            />
                        )}
                        <div className="order-list">
                            {orders?.map((order) => (
                                <UserOrderItem key={order.id} order={order} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default UserOrderPage;
