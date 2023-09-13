import '../css/search_result_page.css'
import '../css/filter_model.css'
import { useState, useEffect } from "react";
import SearchResultItem from "../components/SearchResultItem";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterModel from "../components/FIlterModel";
import {BiFilterAlt as FilterIcon} from 'react-icons/bi';
import {AiOutlineClose as CloseIcon} from 'react-icons/ai';

const SearchResultPage = () => {

    const searchQuery=useLocation().state;
    const navigate = useNavigate();    
    const [originalBooks, setOriginalBooks]=useState([]);
    const [showFilter, setShowFilter]=useState(false);
    const [books, setBooks] = useState([]); 
    const [priceFilter, setPriceFilter] = useState(null);
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
        deliveryWithinOneDay: false,
    });

    const handlePriceFilterChange = (filterType) => {      
        setPriceFilter(filterType);
    };
    const handleLanguageFilterChange=(language)=>{
        setLanguageFilters({...languageFilters, [language]: !languageFilters[language]});
    };
    const handleOtherFilterChange = (filter) => {
        setOtherFilters({ ...otherFilters, [filter]: !otherFilters[filter] });
    };
    
     // Apply filters to the original books and set the filtered books
     const applyFilters = () => {
         
        // Apply language filters
        let filteredBooks = [...originalBooks];
       
        let isAtLeastOneTrue = Object.values(languageFilters).some(value => value === true);
       
        if(isAtLeastOneTrue){

            filteredBooks=originalBooks.filter(book => languageFilters[book.language]);
        }

        // Apply other filters (outOfStock, onlyLatest, deliveryWithinOneDay)
        if (otherFilters.outOfStock) {
            filteredBooks = filteredBooks.filter(book => book.stockAvailability > 0);
        }

        if (otherFilters.onlyLatest) {
            // Get the current date
            const currentDate = new Date();
           
            // Calculate the date one week ago
            const oneWeekAgo = new Date(currentDate);
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Filter books based on bookListingTime
            filteredBooks = filteredBooks.filter(book => {
                
                // Parse the bookListingTime string to a Date object
                const bookListingTime = new Date(book.bookListingTime);
                
                // Check if bookListingTime is within the last week
                return bookListingTime >= oneWeekAgo;
            });
        }

        if (otherFilters.deliveryWithinOneDay) {
            filteredBooks = filteredBooks.filter(book => book.deliveryTime === 1);
        }

        setBooks(sortBooks(filteredBooks));
    };

    useEffect(() => {
        applyFilters();
    }, [languageFilters, otherFilters]);

    const sortBooks=(booksData)=>{

        // Apply price filter
        let sortedBooks=[...booksData];
        if (priceFilter === 'lowToHigh') {
            sortedBooks.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'highToLow') {
            sortedBooks.sort((a, b) => b.price - a.price);
        }

        return sortedBooks;
    }

    useEffect(() => {
        setBooks(sortBooks(books));
    }, [priceFilter]);


    const searchBooks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/book/search?query=${searchQuery}`);

            if (response.ok) {
                const books = await response.json();
                setOriginalBooks(books);
                setBooks(books);
            } else {
                const errorObj = { errorMessage: "Something went wrong, try later..." };
                navigate("/errorPage", { state: errorObj });
            }
        } catch (error) {
            console.error(error);
            toast.error("Server is down, try again later", {
                position: 'top-center',
                theme: 'dark'
            });
        }
    };

    useEffect(()=>{
        searchBooks();
    },[searchQuery])

    const closeModel=()=>{
        setShowFilter(false);
    };


  

    return (
        <>
        <Navbar backButton={true} showSearchValue={true} searchQuery={searchQuery}/>
        <div className="search-result-container">
            <div className={`search-result-filter ${showFilter ? 'search-result-filter-model' : ''}`}>
                <div className="category-filter-modal-cross-button" onClick={closeModel}>
                    <CloseIcon/>
                </div>
                <FilterModel                
                    priceFilter={priceFilter}
                    handlePriceFilterChange={handlePriceFilterChange}
                    languageFilters={languageFilters}
                    handleLanguageFilterChange={handleLanguageFilterChange}
                    otherFilters={otherFilters}
                    handleOtherFilterChange={handleOtherFilterChange}             
                />
            </div>
            <div className="search-result-item-container">
                <div className="filter-button-container">
                 <div onClick={()=>setShowFilter(true)}>
                    <FilterIcon/>
                    <p>Filters </p>
                 </div>
                </div>
                <div className="search-result-item-container">
                    {books.map(book => <SearchResultItem key={book.id} book={book} />)}
                </div>
            </div>
            
        </div>
        </>
    );
};

export default SearchResultPage;
