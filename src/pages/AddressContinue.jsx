import "../css/address_continue.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddressItem from "../components/AddressItem";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ClipLoader from "react-spinners/ClipLoader";

const AddressContinue = () => {
    const location = useLocation();
    const user = location.state.user;
    const book = location.state.book;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { cart, placeCartOrder } = useContext(CartContext);

    // Handle click on Proceed button
    const handleProceedBtn = async () => {
        setLoading(true);
        if (!book) {
            // Handle placing a cart order
            const cartOrderData = cart.map((item) => {
                return {
                    book: item.book,
                    quantity: item.quantity,
                    deliveryAddress: user.address[0],
                    user: user,
                };
            });
            try {
                const status = await placeCartOrder(cartOrderData);

                if (status === true) {
                    navigate("/orderSuccess");
                } else {
                    toast.error("Placing order failed..., try again later", {
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
        } else {
            // Handle placing an order for a single book
            const orderData = [
                {
                    book: book,
                    quantity: 1,
                    deliveryAddress: user.address[0],
                    user: user,
                },
            ];

            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/order/place-order`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(orderData),
                    }
                );
                if (response.ok) {
                    navigate("/orderSuccess");
                } else {
                    toast.error("Placing order failed..., try again later", {
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
        }
    };

    // Handle change address button click
    const handleChangeAddress = async () => {
        navigate("/addressSelector", { state: { book, user } });
    };

    // Render the address continuation page
    return (
        <>
            <Navbar backButton={true} />
            <div className="address-continue-page">
                <div className="address-continue-container">
                    <h3>Deliver to:</h3>
                    <div className="address-continue-item">
                        <AddressItem address={user.address[0]} />
                        <div className="address_combo">
                            <button
                                onClick={handleChangeAddress}
                                className="add-new-address-btn"
                                id="#change-address-btn"
                            >
                                Change Address
                            </button>
                            <div className="seleted-next-btn">
                                <button
                                    onClick={handleProceedBtn}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? "Processing..." : "Proceed"}
                                    {loading && (
                                        <div className="loading-overlay-btn">
                                            <ClipLoader color="#620c88" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressContinue;
