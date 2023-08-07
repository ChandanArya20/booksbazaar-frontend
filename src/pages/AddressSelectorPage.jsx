import React, { useState } from 'react';
import '../css/address_selector_page.css'; 

const AddressSelectorPage = ({ addresses }) => {

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="address-selector">
      <h2>Select Delivery Address</h2>
      <div className="address-list">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`address-item ${selectedAddress === address ? 'selected' : ''}`}
            onClick={() => handleAddressSelection(address)}
          >
            <div className="address-info">
              <p>{address.name}</p>
              <p>{address.phone}</p>
              <p>
                {address.streetName}, {address.city}, {address.state} - {address.pincode}
              </p>
              <p>{address.addressType}</p>
            </div>
            <div className="select-indicator">
              {selectedAddress === address && <span>&#10003;</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSelectorPage;
