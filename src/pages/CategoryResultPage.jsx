import '../css/category_result_page.css'
import '../css/filter_model.css'
import { useState, useEffect } from "react";
import CategoryResultItem from "../components/CategoryResultItem";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterModel from "../components/FIlterModel";
import {BiFilterAlt as FilterIcon} from 'react-icons/bi';
import {AiOutlineClose as CloseIcon} from 'react-icons/ai';
import BeatLoader from "react-spinners/BeatLoader";

const CategoryResultPage = ({categoryName}) => {

    const navigate = useNavigate();   
    const [loading, setLoading]=useState(false); 
    const [originalBooks, setOriginalBooks]=useState([]);
    const [books, setBooks] = useState([]);
    const [showFilter, setShowFilter]=useState(false);
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

    useEffect(() => {
        fetchBooksByCategory();
        setPriceFilter(null);
        setLanguageFilters({
            English: false,
            Hindi: false,
            Urdu: false,
            Russian: false,
            Others:false,
            // French: false,
            // Spanish: false,
            // German: false,
            // Greek:false,
        });
          
        setOtherFilters({
            outOfStock: false,
            onlyLatest: false,
            deliveryWithinOneDay: false,
        });
    }, [categoryName]);


    const handlePriceFilterChange = (filterType) => {      
        setPriceFilter(filterType);
    };
    const handleLanguageFilterChange=(language)=>{
        setLanguageFilters({...languageFilters, [language]: !languageFilters[language]});
    };
    const handleOtherFilterChange = (filter) => {
        setOtherFilters({ ...otherFilters, [filter]: !otherFilters[filter] });
    };
    
    const applyFilters = () => {
        
        let filteredBooks = [...originalBooks];    
        let isAtLeastOneTrue = Object.values(languageFilters).some(value => value === true);
       //apply language filter
        if(isAtLeastOneTrue){
            filteredBooks=originalBooks.filter(book => languageFilters[book.language]);
        }

        // Apply other filters (outOfStock, onlyLatest, deliveryWithinOneDay) 
        if (otherFilters.outOfStock) {
            filteredBooks = filteredBooks.filter(book => book.stockAvailability > 0);
        }

        if (otherFilters.onlyLatest) {

            const currentDate = new Date();
           
            // Calculate the date one week ago
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(currentDate.getDate() - 7);

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

    const closeModel=()=>{
        setShowFilter(false);
    };



    const fetchBooksByCategory = async () => {
        
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/book/search/category?page=1&size=20&query=${categoryName}`);

            if (response.ok) {
                const books = await response.json();
                setOriginalBooks(books);
                setBooks(books);
                setLoading(false);
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
        } finally{
            
        }
    };


    return (
        <>
        <Navbar/>
        <div className="category-result-container">
            { loading ? 
            <div className="loading-overlay">
                <BeatLoader color="#36d7b7" className="loading-spinner" />
            </div>
            :
            originalBooks.length===0?<div className="empty-cart empty-cart-special-case" >
                    <h1 className='empty-cart-heading'>Item not found...</h1>
                </div> :
            <>
            <div className={`category-result-filter ${showFilter ? 'category-result-filter-model' : ''}`}>
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
            <div className="category-result-item-container">
                <div className="filter-button-container">
                <p>Results</p>
                 <div onClick={()=>setShowFilter(true)}>
                    <FilterIcon/>
                    <p>Filters </p>
                 </div>
                </div>
                <div className="category-result-list-container">
                    {books.map(book => <CategoryResultItem key={book.id} book={book} />)}
                </div>
            </div>
            </>
            }
        </div>
        </>
    );
};

export default CategoryResultPage;
