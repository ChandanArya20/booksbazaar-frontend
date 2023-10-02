import '../css/delivery_status_model.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const DeliveryStatusModel = ({setShowStatusModel, orderId, orderStatus, handleStatusChanges}) => {

    const [selectedStatus, setSelectedStatus] = useState(orderStatus); // Default status
    const deliveryStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
    const navigate=useNavigate();
    

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const closeModel=(e)=>{
        e.stopPropagation(); 
        setShowStatusModel(false);
    }

    const doNothing=(e)=> {
        e.stopPropagation();
    }

    const handleChangeStatusButton=async()=>{
               
        try {
            const response= await fetch(`${process.env.REACT_APP_API_URL}/order/${orderId}?status=${selectedStatus}`,{
              method:'PATCH',
            }) ;
            if(response.ok){
              toast.success("Order cancelled successfully...", {
                position: 'top-center',
                theme: 'dark'
              });
              setShowStatusModel(false);
              handleStatusChanges(selectedStatus);
          } else{
              toast.error("Order cancellation failed..., try again", {
                position: 'top-center',
                theme: 'dark'
              });
          }
    
        } catch (error) {
            console.error(error);
            const errorObj={  errorMessage : error.message };
            navigate('/errorPage', {state:errorObj });
        }
    }

    return (
      <>
      <div className="change-delivery-status-model-container" onClick={doNothing}></div>
      <div className="delivery-status-model" onClick={doNothing}>
        <h2>Delivery Status</h2>
        <p>Current Status: {selectedStatus}</p>
        <select onChange={handleStatusChange} value={selectedStatus}>
          {deliveryStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <div className="delivery_status-btns">
        <button className='add-new-address-btn' id='delivery-status-change-cancel-btn' onClick={closeModel}>Cancel</button>
        <button
          className="save-button"
          onClick={handleChangeStatusButton}
          disabled={selectedStatus === orderStatus}> 
          Save Status
        </button>
        </div>
      </div>
      </>
    );
  };

export default DeliveryStatusModel;
