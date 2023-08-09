import '../css/address_selector_page.css'; 
import React, { useContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { getCurrentUserDetails } from '../Auth/loginFunc';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getWholeUserData } from '../Auth/helper';

const AddressSelectorPage = () => {

  const navigate=useNavigate()
  const location=useLocation()
  const user=location.state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddress, setUserAddress]=useState(user.address)
  const {cart, placeOrder}=useContext(CartContext)

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress=async()=>{
    const user=await getWholeUserData()
    navigate("/addressFormPage", {state:user})
  }

  const handleProceedBtn=async()=>{

    const orderData=cart.map(item=>{
      return {book:item.book, quantity:item.quantity,deliveryAddress: selectedAddress, user:user}
      })
    console.log(orderData); 
    try {
      const status = await placeOrder(orderData) 
      if(status===true){
        navigate("/orderSuccessPage")
      }else{
        toast.error("Placing order failed..., try again later", {
          position: 'top-center',
          theme: 'dark'
        })
      }
     
    } catch (error) {
      console.error(error)
      const errorObj={  errorMessage : error.message }
      navigate('/errorPage', {state:errorObj })
    }
  }


  return (
    <div className="address-selector">
      <h2>Select Delivery Address</h2>
      <div className="address-list">
        {userAddress.map((address) => (
          <div
            key={address.id}
            className={`address-item ${selectedAddress === address ? 'selected' : ''}`}
            onClick={() => handleAddressSelection(address)}
          >
            <div className="address-info">
              <p><span>Name: </span>{address.name}</p>
              <p><span>Phone: </span>{address.phone}</p>
              <p>
                <span>Address: </span>{address.streetName}, {address.city}, {address.state} - {address.pincode}
              </p>
              <p><span>AddressType: </span>{address.addressType}</p>
            </div>
            <div className="select-indicator">
              {selectedAddress === address && <span>&#10003;</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="address-hanler-btn" >
      <button className='add-new-address-btn' onClick={handleAddNewAddress}>+Add a new Address</button>
      {
        selectedAddress !== null && <div className="seleted-next-btn">
                                            <button onClick={handleProceedBtn}>Proceed</button>
                                        </div>
      }
      </div>
    </div>
  );
};

export default AddressSelectorPage;
