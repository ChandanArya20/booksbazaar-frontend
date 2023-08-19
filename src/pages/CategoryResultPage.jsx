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
    const [originalBooks, setOriginalBooks]=useState([])
    const [books, setBooks] = useState([]);
    const [filterStatus, setFilterStatus] = useState({
      Pending: false,
      Confirmed: false,
      Shipped: false,
      Delivered: false,
      Cancelled: false,
      Returned: false
    });


    const fetchBooksByCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/book/search/category?query=${categoryName}`);

            if (response.ok) {
                const books = await response.json();
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

    useEffect(() => {
        fetchBooksByCategory();
    }, [categoryName]);

  
    const applyFilter=(filteredStatus)=>{

        setFilterStatus(filteredStatus);
        const filteredBooks=originalBooks.filter(book=>filteredStatus[book.status]);

        if(filteredBooks.length===0){
            setBooks(originalBooks);
        }else{
            setBooks(filteredBooks);
        }
    };

    return (
        <>
        <Navbar/>
        {/* <CategoryRow/> */}
        <div className="category-result-container">
            <div className="category-result-filter">
                <FilterModel applyFilter={applyFilter} currentFilterStatus={filterStatus}/>
            </div>
            <div className="category-result-item-container">
                {books.map(book => <CategoryResultItem key={book.id} book={book} />)}
            </div>
        </div>
        </>
    );
};

export default CategoryResultPage;
