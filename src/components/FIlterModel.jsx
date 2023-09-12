import '../css/order_filter_model.css';

const FilterModel = ({
    priceFilter,
    handlePriceFilterChange,
    languageFilters,
    handleLanguageFilterChange,
    otherFilters,
    handleOtherFilterChange,
  }) => {


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
              <span> Exclude Out of Stock</span>
            </label>
            <label className="price-filter-option">
              <input
                type="checkbox"
                checked={otherFilters.onlyLatest}
                onChange={() => handleOtherFilterChange('onlyLatest')}
              />
              <span> Only Latest</span>
            </label>
            <label className="price-filter-option">
              <input
                type="checkbox"
                checked={otherFilters.deliveryWithinOneDay}
                onChange={() => handleOtherFilterChange('deliveryWithinOneDay')}
              />
              <span> Delivery Within 24hr</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModel;
