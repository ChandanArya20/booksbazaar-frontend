import React from 'react';
import '../css/search_result_item.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContex';
import { getWholeUserData } from '../Helper/helper';


const SearchResultItem = ({ book }) => {

  const { cart, addToCart } = useContext(CartContext);
  const {isUserLoggedin}=useContext(UserContext)
  const navigate=useNavigate()
  const isBookInCart = cart.some((item) => item.id === book.id);


  const handleAddToCart = (e) => {
    e.stopPropagation();

    if(isUserLoggedin()){
      const cartItem={book, quantity:1}
      addToCart(cartItem)

    }else
      navigate("/userPhoneLogin")
  }

  const HandleBuyBook=async(e)=>{
    e.stopPropagation();

    const user=await getWholeUserData()

    if(user.address.length!==0){
      navigate("/addressContinue", {state:{book,user}})
    } else{
      navigate("/addressForm", {state:{book,user}})
    }     
  }

  const goToCart=(e)=>{

    e.stopPropagation();

    if(isUserLoggedin()){
      navigate("/cart")
    }else{
      navigate("/userPhoneLogin")
    }
  }

  const productDetailsHandler=()=>{
    navigate("/productDetails", { state: book })
  }

  return (
    <div className="search-result-book-card" onClick={productDetailsHandler}>
      <div className="search-result-book-card-left">
        <div className="book-image-conatiner">
          <img src={book.imageURL} alt="Book image" className="book-card-image" />
        </div>

        <div className="book-card-content" >
          <h3 className="book-card-title">{book.title}</h3>
          <p className="book-card-author"><span>By: </span>{book.author}</p>
          <p className="book-card-author"><span>Language: </span>{book.language}</p>
          <p className="book-card-author"><span>Publisher: </span>{book.publisher}</p>
          <p className="book-card-author"><span>Category: </span>{book.category}</p>
          <p className="book-card-author"><span>Pages: </span>{book.pages}</p>
        </div>
      </div>
      <div className="search-result-book-card-right">
          <div className="book-card-price">₹{book.price}</div>
          <div className="book-card-buttons">
            <button
              className='book-card-button'
              onClick={isBookInCart ? goToCart : handleAddToCart}>      
              {isBookInCart ? 'Go To Cart' : 'Add to Cart'}
            </button>
            <button
              className='book-card-button book-card-button-buy'
              onClick={HandleBuyBook} >    
              Buy Now
            </button>
          </div>
      </div>

    </div>
  );
};

export default SearchResultItem;
