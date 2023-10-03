import '../css/address_form_page.css';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import {toast } from 'react-toastify';
import { getUserAddress } from '../Helper/helper';
import ClipLoader  from "react-spinners/ClipLoader";

const AddressFormPage = () => {

  const {cart, setCart, placeCartOrder}=useContext(CartContext)
  const navigate=useNavigate()
  const location=useLocation()
  const user=location.state.user;
  const book=location.state.book;
  const [loading, setLoading]=useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()



  const submitAddress = async(addressData) => {
    setLoading(true);
    try {
        const response=await fetch(`${process.env.REACT_APP_API_URL}/user/${user.id}/saveAddress`,{
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(addressData)
        });
        if(response.ok){
          await placeOrderItem(book);
        }else{
          console.log(await response.text());
          toast.error("There is some issues, try later...", {
            position: 'top-center',
            theme: 'dark'
          });
        }
    } catch (error) {
      console.log(error);
      const errorObj={  errorMessage : error.message };
      navigate('/errorPage', {state:errorObj });
    } finally{
      setLoading(false);
    }
  };

  const placeOrderItem=async(book)=>{

      const userAddress= await getUserAddress();
      if(!book){
        const cartOrderData=cart.map(item=>{
        return {book:item.book, quantity:item.quantity, deliveryAddress: userAddress[0], user:user}
        });
        try {
            const status = await placeCartOrder(cartOrderData);

            if(status===true){
                navigate("/orderSuccess");
            }else{
                toast.error("Placing order failed..., try again later", {
                    position: 'top-center',
                    theme: 'dark'
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj={  errorMessage : error.message };
            navigate('/errorPage', {state:errorObj });
        } finally{
          setLoading(false);
        }
        
    } else{
        const orderData=[{book:book, quantity:1, deliveryAddress: userAddress[0], user:user }];
        try {
            const response=await fetch(`${process.env.REACT_APP_API_URL}/order/placeOrder`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            });
            if(response.ok){
                navigate("/orderSuccessPage");
            }else{
                toast.error("Placing order failed..., try again later", {
                    position: 'top-center',
                    theme: 'dark'
                });
            }
        } catch (error) {
            console.error(error);
            const errorObj={  errorMessage : error.message };
            navigate('/errorPage', {state:errorObj });
        }     
      }
  }


  return (
    <div className="address-form-page">
    <div className="address-form-container">
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit(submitAddress)}>
        <div className="form-group">
          <label>Name</label>
          <input
          {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Length should not be less than 3"
              }
            })}
            />
        </div>
        <p className="error-message">{errors.name?.message}</p>

        <div className="form-group">
          <label>Phone</label>
          <input
          {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[6-9][0-9]*$/,
                message: 'Only digits 0-9 are allowed'
              },
              minLength: {
                value: 10,
                message: 'Number must be exactly 10 digits'
              },
              maxLength: {
                value: 10,
                message: 'Number must be exactly 10 digits'
              }
            })}
            />
        </div>
        <p className="error-message">{errors.phone?.message}</p>

        <div className="form-group">
          <label>Pincode</label>
          <input
          {...register('pincode', {
            required: 'Pincode is required',
            pattern: {
              value: /^[1-9][0-9]{5}$/,
              message: 'Invalid pincode'
            },
            minLength: {
              value: 6,
              message: 'Number must be exactly 6 digits'
            },
            maxLength: {
              value: 6,
              message: 'Number must be exactly 6 digits'
            }
          })}
          />
        </div>
        <p className="error-message">{errors.pincode?.message}</p>

        <div className="form-group">
          <label>Street Name</label>
          <input
          {...register("streetName", {
            required: "Street name is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })}
          />
        </div>
        <p className="error-message">{errors.streetName?.message}</p>

        <div className="form-group">
          <label>City</label>
          <input
          {...register("city", {
            required: "City is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })} 
          />        
        </div>
        <p className="error-message">{errors.city?.message}</p>

        <div className="form-group">
          <label>State</label>
          <input
          {...register("state", {
            required: "State is required",
            minLength: {
              value: 3,
              message: "Length should not be less than 3"
            },
          })}  
          />   
        </div>
        <p className="error-message">{errors.state?.message}</p>

        <div className="form-group">
          <label>Address Type</label>
          <select {...register('addressType', {
            required: 'Please choose one',
          })}>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
          </select>
        </div>
        <p className="error-message">{errors.addressType?.message}</p>

        <div className="form-group-buttons">
          <button onClick={()=>navigate(-1)} id='back'>Back</button>
          <button type="submit" disabled={loading ? true: false}>
          { loading ? 'Processing...' : 'Submit'}
          {loading && <div className="loading-overlay-btn">
                          <ClipLoader color="#620c88" />
                      </div>
          }
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddressFormPage;
