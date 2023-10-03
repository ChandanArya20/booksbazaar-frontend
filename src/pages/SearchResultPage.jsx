import '../css/search_result_page.css'
import '../css/filter_model.css'
import { useState, useEffect } from "react";
import SearchResultItem from "../components/SearchResultItem";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterModel from "../components/FIlterModel";
import { BiFilterAlt as FilterIcon } from 'react-icons/bi';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import BeatLoader from "react-spinners/BeatLoader";

const SearchResultPage = () => {

    const searchQuery = useLocation().state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [originalBooks, setOriginalBooks] = useState([]);
    const [books, setBooks] = useState([]);

    const [showFilter, setShowFilter] = useState(false);
    const [priceFilter, setPriceFilter] = useState(null);
    const [languageFilters, setLanguageFilters] = useState({
        English: false,
        Hindi: false,
        Spanish: false,
        French: false,
        German: false,
    });
    const [otherFilters, setOtherFilters] = useState({
        outOfStock: false,
        onlyLatest: false,
        deliveryWithinOneDay: false,
    });

    const handlePriceFilterChange = (filterType) => {
        setPriceFilter(filterType);
    };
    const handleLanguageFilterChange = (language) => {
        setLanguageFilters({ ...languageFilters, [language]: !languageFilters[language] });
    };
    const handleOtherFilterChange = (filter) => {
        setOtherFilters({ ...otherFilters, [filter]: !otherFilters[filter] });
    };

    
    const applyFilters = () => {

        // Apply language filters
        let filteredBooks = [...originalBooks];

        let isAtLeastOneTrue = Object.values(languageFilters).some(value => value === true);

        if (isAtLeastOneTrue) {

            filteredBooks = originalBooks.filter(book => languageFilters[book.language]);
        }

        // Apply other filters (outOfStock, onlyLatest, deliveryWithinOneDay)
        if (otherFilters.outOfStock) {
            filteredBooks = filteredBooks.filter(book => book.stockAvailability > 0);
        }

        if (otherFilters.onlyLatest) {

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

    const sortBooks = (booksData) => {

        // Apply price filter
        let sortedBooks = [...booksData];
        if (priceFilter === 'lowToHigh') {
            sortedBooks.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'highToLow') {
            sortedBooks.sort((a, b) => b.price - a.price);
        }

        return sortedBooks;
    }

    useEffect(() => {
        applyFilters();
    }, [languageFilters, otherFilters, originalBooks]);

    useEffect(() => {
        setBooks(sortBooks(books));
    }, [priceFilter]);


    const searchBooks = async () => {

        let query=searchQuery?.replace(/[^a-zA-Z0-9\s]/g, ' ');
        let fetchedbooks=[];

        try {

            const response = await fetch(`${process.env.REACT_APP_API_URL}/book/search?page=${page}&size=20&query=${query}`);

            if (response.ok) {

                fetchedbooks = await response.json();
                if(fetchedbooks.length===0){
                    window.removeEventListener("scroll", handleScroll);
                }else{
                    setOriginalBooks(prev=>[...prev, ...fetchedbooks]);
                    setBooks(prev=>[...prev, ...fetchedbooks])
                }

            } else {
                const errorObj = { errorMessage: "Something went wrong, try later..." };
                navigate("/errorPage", { state: errorObj });
            }
        } catch (error) {      
            toast.error("Server is down, try again later", {
                position: 'top-center',
                theme: 'dark'
            });
        } finally{
            setLoading(false);           
            if(fetchedbooks.length>0){
                setIsLoadingMore(false);
            }        
        }
    };
    useEffect(() => {
        setLoading(true);
        setPage(1); 
        setOriginalBooks([]); 
    }, [searchQuery]);

    useEffect(() => {     
        searchBooks();
    }, [page,searchQuery]);

    const closeModel = () => {
        setShowFilter(false);
    };

    const handleScroll = () => {

        if (isLoadingMore) {
            return;
        }
        if (window.innerHeight + document.documentElement.scrollTop +1 >= 
            document.documentElement.scrollHeight) {
            setIsLoadingMore(true);
            setPage(pre => pre + 1);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoadingMore]); 

    useEffect(()=>{
        console.log(originalBooks);
    },[originalBooks]);



    return (
        <>
            <Navbar backButton={true} showSearchValue={true} searchQuery={searchQuery} />
            <div className="search-result-container">
                {loading ?
                    <div className="loading-overlay">
                        <BeatLoader color="#36d7b7" className="loading-spinner" />
                    </div>
                    :
                    originalBooks.length === 0 ? <div className="empty-cart empty-cart-special-case" >
                        <h1 className='empty-cart-heading'>Item not found...</h1>
                    </div>
                        :
                        <>
                            <div className={`search-result-filter ${showFilter ? 'search-result-filter-model' : ''}`}>
                                <div className="category-filter-modal-cross-button" onClick={closeModel}>
                                    <CloseIcon />
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
                            <div className="search-result-item-container" >
                                <div className="search-filter-button-container">
                                    <p>Results</p>
                                    <div onClick={() => setShowFilter(true)}>
                                        <FilterIcon />
                                        <p>Filters </p>
                                    </div>
                                </div>
                                <div className="search-result-item-container">
                                    {books.map(book => <SearchResultItem key={book.id} book={book} />)}
                                </div>                              
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SearchResultPage;
