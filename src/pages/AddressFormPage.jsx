import "../css/address_form_page.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { getUserAddress } from "../utils/userDetails";
import ClipLoader from "react-spinners/ClipLoader";

const AddressFormPage = () => {
	
    const { cart, setCart, placeCartOrder } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;
    const book = location.state.book;
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handle form submission
    const submitAddress = async (addressData) => {
        setLoading(true);
        try {
            // Send address data to the server
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/${user.id}/saveAddress`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(addressData),
                }
            );
            if (response.ok) {
                await placeOrderItem(book);
            } else {
                console.log(await response.text());
                toast.error("There is some issues, try later...", {
                    position: "top-center",
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log(error);
            const errorObj = { errorMessage: error.message };
            navigate("/errorPage", { state: errorObj });
        } finally {
            setLoading(false);
        }
    };

    // Place an order
    const placeOrderItem = async (book) => {
        const userAddress = await getUserAddress();
        if (!book) {
            const cartOrderData = cart.map((item) => {
                return {
                    book: item.book,
                    quantity: item.quantity,
                    deliveryAddress: userAddress[0],
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
            const orderData = [
                {
                    book: book,
                    quantity: 1,
                    deliveryAddress: userAddress[0],
                    user: user,
                },
            ];
            try {
                // Place an order for a single book
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/order/placeOrder`,
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
            }
        }
    };

    // Render the address form
    return (
        <div className="address-form-page">
            <div className="address-form-container">
                <h2>Address Details</h2>
                <form onSubmit={handleSubmit(submitAddress)}>
                    {/* Form fields */}
                    {/* ... */}
                    <div className="form-group-buttons">
                        <button onClick={() => navigate(-1)} id="back">
                            Back
                        </button>
                        <button type="submit" disabled={loading ? true : false}>
                            {loading ? "Processing..." : "Submit"}
                            {loading && (
                                <div className="loading-overlay-btn">
                                    <ClipLoader color="#620c88" />
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressFormPage;
