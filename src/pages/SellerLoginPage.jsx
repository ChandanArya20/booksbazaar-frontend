import "../css/login_page.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { doSellerLogin } from "../auth/sellerAuth";
import ClipLoader from "react-spinners/ClipLoader";

const SellerLoginPage = () => {
	
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const loginSeller = async (data) => {
        try {
            setLoading(true);
            let response = await fetch(
                `${process.env.REACT_APP_API_URL}/seller/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const sellerData = await response.json();
                doSellerLogin(sellerData, () => {
                    navigate("/sellerDashboard");
                });
                setLoading(false);
            } else if (response.status === 500) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.status);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage, {
                    position: "top-center",
                    theme: "dark",
                });
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            const errorObj = { errorMessage: error.message };
            navigate("/errorPage", { state: errorObj });
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-page">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(loginSeller)}>
                    <input
                        type="text"
                        placeholder="Seller id"
                        {...register("sellerId", {
                            required: "Enter Seller id",
                            minLength: {
                                value: 8,
                                message: "Seller id should not be less than 8",
                            },
                            maxLength: {
                                value: 15,
                                message:
                                    "Seller id should not be greater than 15",
                            },
                        })}
                    />
                    <p className="error-message">{errors.sellerId?.message}</p>

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Enter password",
                            minLength: {
                                value: 8,
                                message: "Password should not be less than 8",
                            },
                            maxLength: {
                                value: 15,
                                message:
                                    "Password should not be greater than 15",
                            },
                        })}
                    />
                    <p className="error-message">{errors.password?.message}</p>
                    <p className="forgot-password-link">
                        <Link to="/sellerForgotPassEmail">Forgot password?</Link>
                    </p>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading ? true : false}
                    >
                        {loading ? "Waiting..." : "Login"}
                        {loading && (
                            <div className="loading-overlay-btn">
                                <ClipLoader color="#620c88" />
                            </div>
                        )}
                    </button>
                </form>
                <p className="create-account-link">
                    New seller? <Link to="/SellerSignUp">Become a seller</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SellerLoginPage;
