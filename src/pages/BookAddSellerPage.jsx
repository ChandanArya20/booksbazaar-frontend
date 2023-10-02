import '../css/book_seller_page.css';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentSellerDetails } from '../Auth/sellerLoginFunc';


const BookAddSellerPage = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitBookDetails = async (data) => {
    
    //Holds data as key value pair to transfer in backend 
    const formData = new FormData();
  
    const bookSeller=getCurrentSellerDetails();
    // Remove the coverImage property from the data object using destructuring
    const { coverImage, ...bookData } = data;

     // Create a new object containing bookData and the bookSeller field
    const newData = { ...bookData, bookSeller };
    
    // Convert the book data to a JSON string and append it to the FormData
    formData.append('bookInfo', JSON.stringify(newData));
  
    // Append the cover image file to the FormData
    formData.append('coverImage', data.coverImage[0]);
  
    // Fetch API POST request
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/book/seller/addBook`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const errorMessage=await response.text();
        toast.success(errorMessage, {
          position: 'top-center',
          theme: 'dark'
        });
      } else {
        const errorMsg=response.text();
        throw new Error(errorMsg);
        
      }
    } catch (error) {
      console.error(error);
      const errorObj={  errorMessage : error.message };
      navigate('/errorPage', {state:errorObj });
    }
  };
  
  
  

  
  return (
    <div className="book-selling-page-container" >
      <h1>Add a New Book</h1>
      <div className="book_selling-Page">
        <form onSubmit={handleSubmit(submitBookDetails)}>
          <div className="selling-form">
          <div className="first-half-selling-form">
            <label >
              Title:
              <input
                type="text"
                placeholder="Enter title"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.title?.message}</p>
            <label>
              Author:
              <input
                type="text"
                placeholder="Enter author"
                {...register('author', {
                  required: 'Author is required',
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.author?.message}</p>

            <label>
              Description:
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.description?.message}</p>

            <label>
              Price:
              <input
                type="number"
                placeholder="Enter price"
                {...register('price', {
                  required: 'Price is required',
                  min: {       
                    value: 29,
                    message: 'Price should not be less than 29'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.price?.message}</p>

            <label>
              Language:
              <select {...register('language', {
                required: 'Choose one language',
              })}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Urdu">French</option>
                <option value="Russian">Russian</option>
                <option value="German">German</option>
                <option value="Greek">Chinese</option>
                <option value="Other">Chinese</option>
              </select>
            </label>           
            <p className="error-message">{errors.language?.message}</p>

            <label>
              Category:
              <input
                type="text"
                placeholder="ex-Fiction, Self-Growth, Finance"
                {...register('category', {
                  required: 'Category is required',
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
              {/* <select
                {...register('category', {
                  required: 'Choose one category',
                })}
              >
                <option value="">Select a category</option>
                <option value="Sceince & Mathematics">Sceince & Mathematics</option>
                <option value="Computer & internet">Computer & internet</option>
                <option value="Technology & Engineering">Technology & Engineering</option>
                <option value="Society & Social Science">Society & Social Science</option>
                <option value="Bussiness & Economics">Bussiness & Economics</option>
                <option value="History & Humanities">History & Humanities</option>
                <option value="Arts & Photography">Arts & Photography</option>
                <option value="Boigrphy & Memories">Boigrphy & Memories</option>
                <option value="Exam Preparation">Exam Preparation</option>
                <option value="Mystery/Thriller">Mystery/Thriller</option>
                <option value="Cooking">Cooking</option>
                <option value="Dictionaries & Language">Dictionaries & Language</option>
                <option value="Religion/Spirituality">Religion/Spirituality</option>
                <option value="Health/Fitness">Health/Fitness</option>
                <option value="Family/Lifestyle & Parenting">Family/Lifestyle & Parenting</option>
                <option value="Medicine">Medicine</option>
                <option value="Fictional">Fictional</option>
                <option value="Non-Fictional">Non-Fictional</option>
                <option value="Literature">Literature</option>
                <option value="Children & Teens">Children & Teens</option>
                <option value="Others">Children & Teens</option>
              </select> */}
            </label>
            <p className="error-message">{errors.category?.message}</p>

            <label>
              Publication Year:
              <input
                type="text"
                placeholder="Enter Publication Year"
                {...register('publishingYear', {
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.PublishingYear?.message}</p>

          </div>

          <div className="second-half-selling-form">
            <label>
              ISBN No.:
              <input
                type="number"
                placeholder="Enter ISBN no."
                {...register('isbn', {
                  pattern: {
                    value: /^(?=(?:\D*\d){13}$)\d{1,5}(?:[-\ ]?(?:\d{1,5}(?:[-\ ]?(?:\d{1,5}(?:[-\ ]?(?:\d{1,5})?)?)?)?)?)?$/,
                    message: 'Invalid ISBN number'
                  }
                })}
              />
              </label>
              <p className="error-message">{errors.isbn?.message}</p>
            <label>
              Number of Pages:
              <input
                type="number"
                placeholder="Enter Pages"
                {...register('pages', {
                  required: 'Pages is required',
                  min: {
                    value: 2,
                    message: 'Pages should not be less than 2'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.pages?.message}</p>

            <label>
              Publisher:
              <input
                type="text"
                placeholder="Enter publisher"
                {...register('publisher', {
                  required: 'Publisher is required',
                  minLength: {
                    value: 3,
                    message: 'Length should not be less than 3'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.publisher?.message}</p>

            <label>
              Format:
              <select
                {...register('format', {
                  required: 'Choose one fomat',
                })}
              >
                <option value="">Select a format</option>
                <option value="hardcover">Hardcover</option>
                <option value="paperback">Paperback</option>
                <option value="ebook">Ebook</option>
                <option value="audiobook">Audiobook</option>
                <option value="pdf">PDF</option>
                <option value="kindle">Kindle</option>
                <option value="epub">ePub</option>
              </select>
            </label>
            <p className="error-message">{errors.format?.message}</p>

            <label>
              Stock Availability:
              <input
                type="number"
                placeholder="Enter stock"
                {...register('stockAvailability', {
                  required: 'Stock is required',
                  min: {
                    value: 1,
                    message: 'Stock should not be less than 1'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.stockAvailability?.message}</p>

            <label>
              Edition:
              <input
                type="text"
                placeholder="Enter edition"
                {...register('edition', {
                  min: {
                    value: 1,
                    message: 'Edition should not be less than 1'
                  }
                })}
              />
            </label>
            <p className="error-message">{errors.edition?.message}</p>

            <label>
              Delivery Time:
              <input
                type="number"
                placeholder="Enter delivery time (in days)"
                {...register('deliveryTime', {
                  required: 'Delivery time is required',
                  min: {
                    value: 1,
                    message: 'Delivery time should not be less than 1'
                  }
                })}
              />
              </label>
              <p className="error-message">{errors.deliveryTime?.message}</p>

              <label>
              Cover Image:
              <input
                type="file"
                accept="image/*"    
                // accept=".pdf"    
                // multiple
                {...register('coverImage', {
                  required: 'First upload Image',
                })}  
              />
            </label>
            <p className="error-message">{errors.coverImage?.message}</p>
           
            </div>
            </div>
            <div className="book-submit">
              <button type="submit" className="book-submit-button">
                Submit
              </button>
          </div>
        </form>      
      </div>
    </div>
  );
};

export default BookAddSellerPage;
