import "../css/login_page.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContex";
import ClipLoader from "react-spinners/ClipLoader";

const UserForgotPasswordByEmail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);

    // A promise that resolves after 5 seconds 
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve({ status: 'timeout' }), 5000);
    });

    // Function to handle OTP
    const sendOTP = async (data) => {
        console.log(data.email);
        setLoading(true);
        try {
            const response = await Promise.race([
                fetch(`${process.env.REACT_APP_API_URL}/user/send-otp?user-name=${data.email}`),
                timeoutPromise,
            ]);
           
            if (response.status=="timeout" || response.ok) {
                navigate("/otpVerification", {state:data.email});
            } else if (response.status === 404) {
                console.log(response);
                toast.error("Account not found for this email", {
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
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-page">
                <h1>Forgot Password?</h1>
                <p className="login-with-phone-link">
                    <Link to="/userForgotPassPhone">Use Phone?</Link>
                </p>
                <form onSubmit={handleSubmit(sendOTP)}>
                    <input
                        type="email"
                        placeholder="Registered email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address!",
                            },
                        })}
                    />
                    <p className="error-message">{errors.email?.message}</p>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Waiting..." : "Send OTP"}
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

export default UserForgotPasswordByEmail;
