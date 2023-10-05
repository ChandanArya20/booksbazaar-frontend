import "../css/order_filter_model.css";
import React, { useState } from "react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const SellerOrderFilterModel = ({
    setShowFilter,
    applyFilter,
    currentFilterStatus,
}) => {
	
    // Initialize filterStatus state with the current filter status
    const [filterStatus, setFilterStatus] = useState(currentFilterStatus);

    // Handle changes when a filter checkbox is toggled
    const handleFilterChange = (status) => {
        setFilterStatus({ ...filterStatus, [status]: !filterStatus[status] });
    };

    // Apply the selected filters and close the modal
    const handleApplyFilter = () => {
        applyFilter(filterStatus);
        closeModel();
    };

    // Reset all filters to their initial state and close the modal
    const handleResetFilter = () => {
        applyFilter({
            Pending: false,
            Confirmed: false,
            Shipped: false,
            Delivered: false,
            Cancelled: false,
            Returned: false,
        });
        closeModel();
    };

    // Close the filter modal
    const closeModel = (e) => {
        setShowFilter(false);
    };

    return (
        <>
            {/* Background overlay */}
            <div className="filter-model-container"></div>
            {/* Filter modal content */}
            <div className="modal-content">
                {/* Close button */}
                <div className="filter-cross-button" onClick={closeModel}>
                    <CloseIcon />
                </div>
                <h2>Filter Orders by Status</h2>
                {/* Filter options */}
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
                {/* Filter buttons */}
                <div className="filter-buttons">
                    {/* Reset filter button */}
                    <button
                        onClick={handleResetFilter}
                        id="reset-filter-btn"
                        disabled={Object.values(filterStatus).every(
                            (status) => !status
                        )}
                    >
                        Reset Filter
                    </button>
                    {/* Apply filter button */}
                    <button
                        onClick={handleApplyFilter}
                        id="apply-filter-btn"
                        disabled={Object.values(filterStatus).every(
                            (status) => !status
                        )}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </>
    );
};

export default SellerOrderFilterModel;
