import '../css/order_filter_model.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const FilterModel = ({ applyFilter, currentFilterStatus }) => {
  const [filterStatus, setFilterStatus] = useState(currentFilterStatus);
  const [priceFilter, setPriceFilter] = useState('lowToHigh'); // Default filter is low to high.
  const [languageFilters, setLanguageFilters] = useState({
    English: false,
    Hindi: false,
    Spanish: false,
    French: false,
    German: false,
    // Add more languages as needed
  });
  const [otherFilters, setOtherFilters] = useState({
    outOfStock: false,
    onlyLatest: false,
    deliveryWithinOneDay: false, // New filter option
  });

  useEffect(() => {
    console.log(filterStatus);
  }, [filterStatus]);

  const handleFilterChange = (status) => {
    setFilterStatus({ ...filterStatus, [status]: !filterStatus[status] });
  };

  const handleApplyFilter = () => {
    console.log('handleApplyFilter');
    applyFilter(filterStatus);
  };

  const handleResetFilter = () => {
    applyFilter({
      Pending: false,
      Confirmed: false,
      Shipped: false,
      Delivered: false,
      Cancelled: false,
      Returned: false,
    });
  };

  const handlePriceFilterChange = (filterType) => {
    setPriceFilter(filterType);
  };

  const handleLanguageFilterChange = (language) => {
    setLanguageFilters({ ...languageFilters, [language]: !languageFilters[language] });
  };

  const handleOtherFilterChange = (filter) => {
    setOtherFilters({ ...otherFilters, [filter]: !otherFilters[filter] });
  };

  const doNothing = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="category-filter-modal-container">
        <h2 id='category-filter-heading'>Filters</h2>
        <div className="price-filter">
          <h2>Price</h2>
          <div className="price-filter-options">
            <label className="price-filter-option">
              <input
                type="radio"
                name="priceFilter"
                value="lowToHigh"
                checked={priceFilter === 'lowToHigh'}
                onChange={() => handlePriceFilterChange('lowToHigh')}
              />
              <span> Low to High</span>
            </label>
            <label className="price-filter-option">
              <input
                type="radio"
                name="priceFilter"
                value="highToLow"
                checked={priceFilter === 'highToLow'}
                onChange={() => handlePriceFilterChange('highToLow')}
              />
              <span> High To Low</span>
            </label>
          </div>
        </div>
        <div className="price-filter">
          <h2>Languages</h2>
          <div className="price-filter-options">
            {Object.keys(languageFilters).map((language) => (
              <label key={language} className="price-filter-option">
                <input
                  type="checkbox"
                  checked={languageFilters[language]}
                  onChange={() => handleLanguageFilterChange(language)}
                />
                <span> {language}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="price-filter">
          <h2>Others</h2>
          <div className="price-filter-options">
            <label className="price-filter-option">
              <input
                type="checkbox"
                checked={otherFilters.outOfStock}
                onChange={() => handleOtherFilterChange('outOfStock')}
              />
              <span> Don't Include Out of Stock</span>
            </label>
            <label className="price-filter-option">
              <input
                type="checkbox"
                checked={otherFilters.onlyLatest}
                onChange={() => handleOtherFilterChange('onlyLatest')}
              />
              <span> Only Latest Books</span>
            </label>
            <label className="price-filter-option">
              <input
                type="checkbox"
                checked={otherFilters.deliveryWithinOneDay}
                onChange={() => handleOtherFilterChange('deliveryWithinOneDay')}
              />
              <span> Delivery Within One Day</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModel;
