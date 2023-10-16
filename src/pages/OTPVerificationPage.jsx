import "../css/login_page.css";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const OTPVerificationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const userName=useLocation().state;

    console.log(userName);

    // Function to handle OTP verification
    const verifyOTP = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/user/verify-otp?user-name=${userName}&otp=${data.otp}`
            );

            if (response.ok) {
                console.log(userName);
                navigate("/otpPasswordCreate",{state:userName});
            } else if (response.status === 404) {
                toast.error("Account not found for this "+userName, {
                    position: "top-center",
                    theme: "dark",
                });
            } else {
                console.log(response);
                toast.error("OTP verification failed...", {
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
        <div className="login-page-container">
            <div className="login-page">
                <h1>Enter OTP</h1>
                <p id="otp-sent-to-heading">OTP has been sent to </p>
                <p id="otp-sent-to">{userName}</p>
                <form onSubmit={handleSubmit(verifyOTP)}>
                    <input
                        type="text"
                        placeholder="enter OTP"
                        {...register("otp", {
                            required: "OTP is required",
                            pattern: {
                                pattern: {
                                    value: /^[0-9]{6}$/, // Regular expression for 6 digits (0-9)
                                    message: "Invalid OTP. Please enter a 6-digit number.",
                                },
                            },

                        })}
                    />
                    <p className="error-message">{errors.otp?.message}</p>

                    {/* OTP verification button */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Waiting..." : "Verify OTP"}
                        {loading && (
                            <div className="loading-overlay-btn">
                                <ClipLoader color="#620c88" />
                            </div>
                        )}
                    </button>
                </form>
                <p className="create-account-link">
                        <Link onClick={()=>navigate(-1)}>Go Back</Link>
                </p>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
