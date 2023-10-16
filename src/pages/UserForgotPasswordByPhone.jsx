import "../css/login_page.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const UserForgotPasswordByPhone = () => {
	
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

     // A promise that resolves after 5 seconds 
     const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve({ status: 'timeout' }), 5000);
    });

    // Function to handle OTP
    const sendOTP = async (data) => {
        setLoading(true);
        try {
            console.log(data.phone);
            const response = await Promise.race([
                fetch(`${process.env.REACT_APP_API_URL}/user/send-otp?user-name=${data.phone}`),
                timeoutPromise,
            ]);
            
            if (response.status=="timeout" || response.ok) {
                console.log(data.phone);
                navigate("/otpVerification", {state:data.phone});
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
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-page">
                <h1>Forgot Password?</h1>
                <p className="login-with-email-link">
                    <Link to="/userForgotPassEmail">Use Email?</Link>
                </p>
                <form onSubmit={handleSubmit(sendOTP)}>
                    <input
                        type="tel"
                        placeholder="Registered phone"
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                                value: /^[6-9][0-9]*$/,
                                message: "Only digits 0-9 are allowed",
                            },
                            minLength: {
                                value: 10,
                                message: "Number must be exactly 10 digits",
                            },
                            maxLength: {
                                value: 10,
                                message: "Number must be exactly 10 digits",
                            },
                        })}
                    />
                    <p className="error-message">{errors.phone?.message}</p>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading ? true : false}
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

export default UserForgotPasswordByPhone;
