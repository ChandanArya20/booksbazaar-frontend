import React from "react";
import "../css/service_item.css";

const ServiceItem = ({ icon: Icon, title, description }) => {
    return (
        <div className="services-item">
            <Icon className="services-icon" />
            <h3 className="services-item-title">{title}</h3>
            <p className="services-item-description">{description}</p>
        </div>
    );
};

export default ServiceItem;
