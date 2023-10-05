import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../css/searchbox.css";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ searchQuery }) => {
    // State variables
    const [searchTerm, setSearchTerm] = useState(searchQuery || "");
    const [placeholderText, setPlaceholderText] = useState(
        "Search books by title, category and more..."
    );
    const [searchResults, setSearchResults] = useState([]);
    const [isBoxExpanded, setIsBoxExpanded] = useState(false);
    const navigate = useNavigate();


    // Detect screen width to set placeholder text
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 426) setPlaceholderText("Type to Search books...");
    }, []);


    // Function to handle search term input
    const handleSearch = (value) => {
        setSearchTerm(value);
        fetchSuggestedFilterResults(value);
    };


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/searchResults", { state: searchTerm });
    };


    // Function to fetch suggested search results
    const fetchSuggestedFilterResults = async (query) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/book/suggest_book_names?size=10&query=${query}`
            );
            if (response.ok) {
                const filterResults = await response.json();
                setSearchResults(filterResults);
            }
        } catch (error) {
            console.log(error);
        }
    };


    // Function to handle search result click
    const handleSearchResultClick = (result) => {
        setSearchTerm(result);
        setSearchResults([]);
        navigate("/searchResults", { state: result });
    };


    // Function to expand the search box
    const activateSearchBox = () => {
        setIsBoxExpanded(true);
    };


    // Function to collapse the search box
    const deactivateSearchBox = () => {
        setIsBoxExpanded(false);
    };

	
    return (
        <>
            {isBoxExpanded && (
                // Overlay for closing the search box
                <div
                    className="remove-search-box-size"
                    onClick={deactivateSearchBox}
                    onScroll={deactivateSearchBox}
                ></div>
            )}
            <div className="search-box-container">
                <form
                    className={`search-box ${
                        isBoxExpanded ? "search-box-increase-size" : ""
                    }`}
                    onSubmit={handleSubmit}
                    onClick={activateSearchBox}
                >
                    <button className="search-button">
                        <FaSearch />
                    </button>
                    <input
                        type="text"
                        autoFocus={isBoxExpanded}
                        placeholder={placeholderText}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                </form>
                {searchTerm && searchResults.length !== 0 && (
                    // Suggested search results
                    <div
                        className={`suggestedSearchResults ${
                            !isBoxExpanded
                                ? "suggestedSearchResults-decrease-size"
                                : ""
                        }`}
                    >
                        {searchResults.map((result) => (
                            <div
                                className="result-text-container"
                                key={result}
                                onClick={() => handleSearchResultClick(result)}
                            >
                                <div>
                                    <FaSearch id="result-text-search-button" />
                                </div>
                                <p className="result-text">{result}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBox;
