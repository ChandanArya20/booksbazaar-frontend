import '../css/order_filter_model.css';
import React, { useState } from 'react';
import {AiOutlineClose as CloseIcon} from 'react-icons/ai';

const SellerOrderFilterModel = ({setShowFilter , applyFilter, currentFilterStatus}) => {

    const [filterStatus, setFilterStatus] = useState(currentFilterStatus);
  

    const handleFilterChange = (status) => {
        setFilterStatus({...filterStatus,[status]:!filterStatus[status]})
    };
    
    const handleApplyFilter = () => {
        applyFilter(filterStatus);
        closeModel();

    };

    const handleResetFilter = () => {
        applyFilter({
            Pending: false,
            Confirmed: false,
            Shipped: false,
            Delivered: false,
            Cancelled: false,
            Returned: false
        });
        closeModel()
      };
    

    const closeModel=(e)=>{
        setShowFilter(false);
    }


    return (
      <>
      <div className="filter-model-container"></div>
        <div className="modal-content">
          <div className="filter-cross-button" onClick={closeModel}>
              <CloseIcon/>
          </div>
          <h2>Filter Orders by Status</h2>
          <div className="filter-options">
            {Object.keys(filterStatus).map((status) => (
              <label key={status} className="filter-option">
                <input
                  type="checkbox"
                  checked={filterStatus[status]}
                  onChange={() => handleFilterChange(status)}
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
          <div className="filter-buttons">
            <button 
              onClick={handleResetFilter} 
              id='reset-filter-btn' 
              disabled={Object.values(filterStatus).every(status=>!status)}
              >Reset Filter</button>
            <button 
                  onClick={handleApplyFilter} 
                  id='apply-filter-btn' 
                  disabled={Object.values(filterStatus).every(status=>!status)}
                  >Apply Filter</button>
          </div>
      </div>
      </>
    );
  };

export default SellerOrderFilterModel;
