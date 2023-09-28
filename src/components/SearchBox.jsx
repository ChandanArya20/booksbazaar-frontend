import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/searchbox.css';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({searchQuery }) => {

  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [placeholderTest, setPlaceholderText] = useState('Search books by title, category and more...');
  const [searchResults, setSearchResults]=useState([]);
  const navigate=useNavigate();


  useEffect(() => {
    // Detect screen width and set the appropriate placeholder class
    const screenWidth = window.innerWidth;
    if (screenWidth <= 426) 
      setPlaceholderText('Type to Search books...');
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchSuggestedFilterResultes(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/searchResults',{state:searchTerm});

  };

  const fetchSuggestedFilterResultes=async(query)=>{
    try {
      const response=await fetch(`http://localhost:8080/api/book/suggest_book_names?size=10&query=${query}`);
      if(response.ok){
        const filterResults=await response.json();
        setSearchResults(filterResults);
        console.log(filterResults);
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  const handleSearchResultClick=(result)=>{
    setSearchTerm(result);
    setSearchResults([]);
    navigate('/searchResults',{state:result});
  }



  return (
    <div className="search-box-container">
      <form className='search-box' onSubmit={handleSubmit}>
        <button className="search-button">  
           <FaSearch/>
        </button>
        <input
          type="text"
          placeholder={placeholderTest}
          value={searchTerm}
          onChange={(e)=>handleSearch(e.target.value)}
          className='search-input'
        />    
      </form>
      {
        searchTerm && searchResults.length!==0 && <div className="suggestedSearchResults">
          {
            searchResults.map(result=>(           
              <div className="result-text-container" key={result} onClick={()=>handleSearchResultClick(result)}>
                <div>
                  <FaSearch id="result-text-search-button"/>
                </div>
                <p className="result-text" >{result}</p>
              </div>
            ))
          }

        </div>
      }

    </div>
  );
};

export default SearchBox;
