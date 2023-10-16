import "../css/login_page.css";
import React, { useContext, useState } from "react";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { doSellerLogin } from "../auth/sellerAuth";


const SellerOTPVerifiedPasswordCreatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log(location.state);
    const onSubmit = async (data) => {
        
        const { password1, password2 } = data;

        if (password1 !== password2) {
            toast.error("Passwords do not match", {
                position: "top-center",
                theme: "dark",
            });
            return;
        }

        try {
            setLoading(true); // Start loading spinner on the button
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/seller/otp-verified/update-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({sellerName:location.state,newPassword:password1})
                }
            );

            if (response.ok) {
                const sellerData = await response.json();
                doSellerLogin(sellerData, () => {
                    navigate("/");
                });
            } else if (response.status === 404) {
                const errorMessage = await response.text();
                console.log(errorMessage);
                toast.error("Account not found for "+location.state, {
                    position: "top-center",
                    theme: "dark",
                });
            } else {
               console.log(await response.json());
            }
        } catch (error) {
            console.error(error);
            const errorObj = { errorMessage: error.message };
            navigate("/errorPage", { state: errorObj });
        } finally {
            setLoading(false); // Stop loading spinner on the button
        }
    };

    

    return (
        <div className="login-page-container">
            <div className="login-page" id="password-page">
                <h1>Make a password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Create a password"
                        {...register("password1", {
                            required: "First create a password",
                            pattern: {
                                value: /^(?!.*\s).*$/,
                                message: "Space is not allowed",
                            },
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
                    <p className="error-message">{errors.password1?.message}</p>

                    <input
                        type="password"
                        placeholder="Re-enter password"
                        {...register("password2", {
                            required: "Re-enter password",
                            pattern: {
                                value: /^(?!.*\s).*$/,
                                message: "Space is not allowed",
                            },
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
                    <p className="error-message">{errors.password2?.message}</p>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading ? true : false}
                    >
                        {loading ? "Waiting..." : "Create Password"}
                        {loading && (
                            <div className="loading-overlay-btn">
                                <ClipLoader color="#620c88" />
                            </div>
                        )}
                    </button>
                </form>
                {/* <p className="create-account-link">
                    <Link onClick={()=>navigate()}>Go Back</Link>
                </p> */}
            </div>
        </div>
    );
};

export default SellerOTPVerifiedPasswordCreatePage;
