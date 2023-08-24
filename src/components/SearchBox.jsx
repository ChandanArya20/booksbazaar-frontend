import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/searchbox.css';

const SearchBox = ({ showSearchBox, toggleSearchBox }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    // Handle form submission if needed
    e.preventDefault();
    console.log(searchTerm);
  };

  useEffect(()=>{
    setPlaceholderVisible(showSearchBox)
  },[showSearchBox])

  console.log(showSearchBox);
  return (
    <form
      className={`search-box ${showSearchBox ? 'active' : ''}`}
      onSubmit={handleSubmit}
    >
      <button className="search-button">
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder={placeholderVisible ? 'Search books...': ''}
        value={searchTerm}
        onChange={handleSearch}
        className='search-input'
        onClick={()=>setPlaceholderVisible(false)}
      />
    </form>
  );
};

export default SearchBox;
