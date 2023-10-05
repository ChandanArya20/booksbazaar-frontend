import "../css/login_page.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isLoggedIn, getCurrentUserDetails } from "../Auth/loginFunc";

const SellerRegistrationPage = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const currentUser = getCurrentUserDetails();

    const registerUser = (data) => {
        navigate("/sellerPassword", { state: data });
    };

    return (
        <div className="login-page-container">
            <div className="login-page" id="registration-page">
                <h1>Registration</h1>
                <form onSubmit={handleSubmit(registerUser)}>
                    <input
                        type="text"
                        defaultValue={isLoggedIn && currentUser?.name}
                        placeholder="Enter full name"
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message: "Only letters and spaces are allowed",
                            },
                            minLength: {
                                value: 3,
                                message: "Name should not be less than 3",
                            },
                        })}
                    />
                    <p className="error-message">{errors.name?.message}</p>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        {...register("location", {
                            required: "Location is required",
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message: "Only letters and spaces are allowed",
                            },
                            minLength: {
                                value: 3,
                                message: "Location should not be less than 3",
                            },
                        })}
                    />
                    <p className="error-message">{errors.location?.message}</p>
                    <input
                        type="email"
                        defaultValue={isLoggedIn && currentUser?.email}
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address!",
                            },
                        })}
                    />
                    <p className="error-message">{errors.email?.message}</p>

                    <input
                        type="tel"
                        placeholder="Phone (optional)"
                        defaultValue={isLoggedIn && currentUser?.phone}
                        {...register("phone", {
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
                    <button type="submit" className="login-button">
                        Continue
                    </button>
                </form>
                <p className="create-account-link">
                    Existing seller? <Link to="/sellerLogin">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default SellerRegistrationPage;
