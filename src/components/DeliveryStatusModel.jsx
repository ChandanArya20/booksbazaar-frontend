import '../css/delivery_status_model.css';
import React, { useState } from 'react';

const DeliveryStatusModel = () => {

    const [selectedStatus, setSelectedStatus] = useState('Pending'); // Default status
    const deliveryStatuses = ['Pending', 'In Transit', 'Out for Delivery', 'Delivered'];
    

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

  return (
    <>
    <div className="change-delivery-status-model-container"></div>
    <div className="delivery-status-model">
      <h2>Delivery Status</h2>
      <p>Current Status: {selectedStatus}</p>
      <select onChange={handleStatusChange} value={selectedStatus}>
        {deliveryStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button className="save-button">Save Status</button>
    </div>
    </>
  );
};

export default DeliveryStatusModel;
