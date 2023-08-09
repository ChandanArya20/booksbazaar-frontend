import '../css/address_continue.css'
import { useLocation, useNavigate } from 'react-router-dom';
import AddressItem from '../components/AddressItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {toast} from 'react-toastify'


const AddressContinue=()=>{

    const location=useLocation()
    const user=location.state
    const navigate=useNavigate()
    const {cart, placeOrder}=useContext(CartContext)


    const handleProceedBtn=async()=>{

        console.log(cart);
        const orderData=cart.map(item=>{
        return {book:item.book, quantity:item.quantity,deliveryAddress: user.address[0], user:user}
        })

        const status = await placeOrder(orderData) 

        if(status===true){
            navigate("/orderSuccessPage")
        }else{
            toast.error("Placing order failed..., try again later", {
                position: 'top-center',
                theme: 'dark'
            })
        }
    }

    const handleChangeAddress=()=>{
        navigate("/addressSelectorPage", {state:user})
    }

    return(
        <div className="address-continue">
        <h4>Deliver to: </h4>
        <div className='address-continue-item'>
            <AddressItem address={user.address[0]}/>
            <div className="address_combo">           
                <button onClick={handleChangeAddress} className='add-new-address-btn' id='see-all-orders-btn'>Change Address </button>
                <div className="seleted-next-btn">
                    <button onClick={handleProceedBtn}>Proceed</button>
                </div>
            </div>
        </div>
        </div>
    )

}

export default AddressContinue