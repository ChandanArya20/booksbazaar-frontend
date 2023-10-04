import { useState, useEffect } from 'react';
import { FaAlgolia, FaSearch } from 'react-icons/fa';
import '../css/searchbox.css';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({searchQuery }) => {

  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [placeholderTest, setPlaceholderText] = useState('Search books by title, category and more...');
  const [searchResults, setSearchResults]=useState([]);
  const [isBoxExpanded, setIsBoxExpanded]=useState(false);
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
      const response=await fetch(`${process.env.REACT_APP_API_URL}/book/suggest_book_names?size=10&query=${query}`);
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
  const activeSearchBoxClass = () => {
    setIsBoxExpanded(true);
  };
  const deactiveSearchBoxClass = () => {
    setIsBoxExpanded(false);
  };



  return (
    <>
    {isBoxExpanded && <div className='remove-search-box-size' onClick={deactiveSearchBoxClass} onScroll={deactiveSearchBoxClass}></div>}
    <div className="search-box-container">
      <form className={`search-box ${isBoxExpanded ? 'search-box-increase-size' : ''}`} 
          onSubmit={handleSubmit} 
          onClick={activeSearchBoxClass}
      >
        <button className="search-button">  
           <FaSearch/>
        </button>
        <input
          type="text"
          autoFocus={isBoxExpanded}
          placeholder={placeholderTest}
          value={searchTerm}
          onChange={(e)=>handleSearch(e.target.value)}
          className='search-input'
        />    
      </form>
      {
        searchTerm && searchResults.length!==0 && <div className={`suggestedSearchResults ${!isBoxExpanded ? 'suggestedSearchResults-decrease-size' : ''}`} >
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
    </>
  );
};

export default SearchBox;
