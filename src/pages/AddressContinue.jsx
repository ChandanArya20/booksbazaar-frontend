import '../css/address_continue.css';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressItem from '../components/AddressItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {toast} from 'react-toastify';
import Navbar from '../components/Navbar';


const AddressContinue=()=>{

    const location=useLocation();
    const user=location.state.user;
    const book=location.state.book;
    const navigate=useNavigate();
    const {cart, placeCartOrder}=useContext(CartContext);

    const handleProceedBtn=async()=>{
        
        if(!book){
            const cartOrderData=cart.map(item=>{
            return {book:item.book, quantity:item.quantity, deliveryAddress: user.address[0], user:user}
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
            }
            
        } else{

            const orderData=[{book:book, quantity:1, deliveryAddress: user.address[0], user:user }];

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

    const handleChangeAddress=()=>{
        navigate("/addressSelector", {state:{book,user}});
    }

    return(
        <>
        <Navbar backButton={true}/>   
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
        </>
    )

}

export default AddressContinue