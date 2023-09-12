import '../css/address_continue.css';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressItem from '../components/AddressItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {toast} from 'react-toastify';


const AddressContinue=()=>{

    const location=useLocation();
    const user=location.state.user;
    const book=location.state.book;
    const navigate=useNavigate();
    const {cart, placeCartOrder}=useContext(CartContext);

    console.log(user);
    console.log(book);

    const handleProceedBtn=async()=>{
        
        if(!book){
            const cartOrderData=cart.map(item=>{
            return {book:item.book, quantity:item.quantity, deliveryAddress: user.address[0], user:user}
            });
            try {
                const status = await placeCartOrder(cartOrderData);
    
                if(status===true){
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
            
        } else{

            const orderData=[{book:book, quantity:1, deliveryAddress: user.address[0], user:user }];

            try {
                const response=await fetch(`http://localhost:8080/api/order/placeOrder`, {
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

    const handleChangeAddress=()=>{
        navigate("/addressSelectorPage", {state:{book,user}});
    }

    return(
        <div className="address-continue-page">
            <div className="address-continue-container">
                <h3>Deliver to: </h3>
                <div className='address-continue-item'>
                    <AddressItem address={user.address[0]}/>
                    <div className="address_combo">           
                        <button onClick={handleChangeAddress} className='add-new-address-btn' id='#change-address-btn'>Change Address </button>
                        <div className="seleted-next-btn">
                            <button onClick={ handleProceedBtn}>Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddressContinue