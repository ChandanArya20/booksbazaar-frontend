import '../css/category_result_page.css'
import '../css/filter_model.css'
import { useState, useEffect } from "react";
import CategoryResultItem from "../components/CategoryResultItem";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterModel from "../components/FIlterModel";

const CategoryResultPage = ({categoryName}) => {

    const navigate = useNavigate();    
    const [originalBooks, setOriginalBooks]=useState([]);
    const [books, setBooks] = useState([]);
    const [partialyFilteredBooks, setPartialyFilteredBooks] = useState([]);

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
    
     // Apply filters to the original books and set the filtered books
     const applyFilters = () => {
         
        // Apply language filters
        let filteredBooks = [...originalBooks];
       
        let isAtLeastOneTrue = Object.values(languageFilters).some(value => value === true);
       
        if(isAtLeastOneTrue){
            console.log("RAm");
            filteredBooks=originalBooks.filter(book => languageFilters[book.language]);
        }

        // Apply other filters (outOfStock, onlyLatest, deliveryWithinOneDay)
        console.log(otherFilters.outOfStock);
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

        setPartialyFilteredBooks(filteredBooks);
    };

    useEffect(() => {
        applyFilters();
    }, [languageFilters, otherFilters]);

    const sortBooks=()=>{

        // Apply price filter
        let sortedBooks=[...partialyFilteredBooks];
        if (priceFilter === 'lowToHigh') {
            sortedBooks.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'highToLow') {
            sortedBooks.sort((a, b) => b.price - a.price);
        }

        setBooks(sortedBooks);
    }

    useEffect(() => {
        sortBooks();
    }, [priceFilter, partialyFilteredBooks]);
    useEffect(() => {
        console.log(partialyFilteredBooks);
    }, [partialyFilteredBooks]);


    const fetchBooksByCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/book/search/category?query=${categoryName}`);

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

  

    return (
        <>
        <Navbar/>
        {/* <CategoryRow/> */}
        <div className="category-result-container">
            <div className="category-result-filter">
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
                {books.map(book => <CategoryResultItem key={book.id} book={book} />)}
            </div>
        </div>
        </>
    );
};

export default CategoryResultPage;
