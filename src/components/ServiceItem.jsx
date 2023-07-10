import React from 'react';
import PropTypes from 'prop-types';
import '../css/service_item.css';

const ServiceItem = ({ icon:Icon, title, description }) => {
  return (
    <div className="services__item">
      <Icon className='services__icon'/>
      <h3 className="services__item-title">{title}</h3>
      <p className="services__item-description">{description}</p>
    </div>
  );
};

ServiceItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ServiceItem;
