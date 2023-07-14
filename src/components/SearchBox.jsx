import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/searchbox.css'

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
   

  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;
