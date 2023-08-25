import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/searchbox.css';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ showSearchBox, searchQuery }) => {

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const navigate=useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery=searchTerm.trim();
    console.log(searchQuery);
    navigate('/searchResultPage',{state:searchQuery})

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
