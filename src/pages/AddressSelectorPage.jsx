import '../css/address_selector_page.css'; 
import React, { useContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getWholeUserData } from '../Helper/helper';
import Navbar from '../components/Navbar';
import ClipLoader  from "react-spinners/ClipLoader";

const AddressSelectorPage = () => {

  const navigate=useNavigate();
  const location=useLocation();
  const user=location.state.user;
  const book=location.state.book;
  const [loading, setLoading]=useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddress, setUserAddress]=useState(user.address);
  const {cart, placeCartOrder}=useContext(CartContext);

  console.log(user);
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress=async()=>{
    const book=null;
    navigate("/addressForm", {state:{book,user}});
  }

  const handleProceedBtn=async()=>{
      setLoading(true);
      if(!book){

        const cartOrderData=cart.map(item=>{
          return {book:item.book, quantity:item.quantity,deliveryAddress: selectedAddress, user:user}
          });

        try {
            const status = await placeCartOrder(cartOrderData) ;

            if(status===true){
                navigate("/orderSuccess");
            }else{
                toast.error("Placing order failed..., try again later", {
                    position: 'top-center',
                    theme: 'dark'
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj={  errorMessage : error.message };
            navigate('/errorPage', {state:errorObj });
        } finally{
          setLoading(false);
        }
        
    } else{

        const orderData=[{book:book, quantity:1, deliveryAddress:selectedAddress, user:user }];
        try {
            const response=await fetch(`${process.env.REACT_APP_API_URL}/order/placeOrder`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            });
            if(response.ok){
                navigate("/orderSuccessPage");
            }else{
                toast.error("Placing order failed..., try again later", {
                    position: 'top-center',
                    theme: 'dark'
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj={  errorMessage : error.message };
            navigate('/errorPage', {state:errorObj });
        } finally{
          setLoading(false);
        }       
    }
  }


  return (
    <>
    <Navbar backButton={true}/> 
    <div className="address-selector-page">
      <div className="address-selector-container">
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
        <div className="address-handler-btn" >
        <button className='add-new-address-btn' onClick={handleAddNewAddress}>+Add a new Address</button>
        {
          selectedAddress !== null && <div className="seleted-next-btn">
                                              <button onClick={handleProceedBtn} disabled={loading ? true: false}>
                                              { loading ? 'Processing...' : 'Proceed'}
                                              {loading && <div className="loading-overlay-btn">
                                                              <ClipLoader color="#620c88" />
                                                          </div>
                                              }
                                              </button>
                                          </div>
        }
        </div>
      </div>    
    </div>
    </>
  );
};

export default AddressSelectorPage;
