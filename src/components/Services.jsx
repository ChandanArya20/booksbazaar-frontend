import React from "react";
import { FaBook, FaShippingFast, FaUserFriends } from "react-icons/fa";
import ServiceItem from "./ServiceItem";
import "../css/services.css";

const Services = () => {
    return (
        <section className="services">
            <h2 className="services-title">Our Services</h2>
            <div className="services-container">
                <ServiceItem
                    icon={FaBook}
                    title="Wide Selection of Books"
                    description="Explore our vast collection of books across various genres, ensuring there's something for every reader."
                />
                <ServiceItem
                    icon={FaShippingFast}
                    title="Fast Shipping"
                    description="We offer fast and reliable shipping, ensuring your books reach you in no time."
                />
                <ServiceItem
                    icon={FaUserFriends}
                    title="Excellent Customer Support"
                    description="Our dedicated customer support team is here to assist you with any queries or concerns you may have."
                />
            </div>
        </section>
    );
};

export default Services;
