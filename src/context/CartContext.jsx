import { createContext, useEffect, useState } from "react"
import { getCurrentUserDetails } from "../Auth/loginFunc"
import {toast} from 'react-toastify'

export const CartContext = createContext()

const CartContextProvider=({children})=>{
    
    const [cart, setCart]=useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartQuantity, setCartQuantity] = useState(0)

    useEffect(() => {      
        setCartQuantity(cart.length)     
        let totalPrice = 0;
        cart.forEach((cartItem) => {
          totalPrice += cartItem.book.price*cartItem.quantity;
        });
        setTotalCartPrice(totalPrice);
      }, [cart]);

    const getAllCartItems = async () => {   
      const currentUser=getCurrentUserDetails()
      console.log(currentUser);
      try {
        if(currentUser){
          const response = await fetch(`http://localhost:8080/api/cart/user/${currentUser.id}/allCartData`);
          if (response.ok) {
            const cartItems = await response.json();
            console.log("Cart data", cart);
            setCart(cartItems)
          }else{
            console.log("Not got cartData");           
          }
        }
      } catch (error) {
        console.error(error)
          toast.error("Server is down, try again later", {
            position: 'top-center',
            theme: 'dark'
          });
      }
    };

    useEffect(() => { 
        getAllCartItems();
    }, []);

    const addToCart = async (newCartItem) => {

      // Send the new cart item to the server using API
      try {
        const currentUser = getCurrentUserDetails();
        if (currentUser) {
          const response=await fetch(`http://localhost:8080/api/cart/addToCart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...newCartItem,user:getCurrentUserDetails()})
          });
          if(response.ok){
            // Update the local cart state
            setCart([...cart, newCartItem]);
            console.log("Cart item added to database...");             
            } else{
              console.log("Cart didn't added..., failed!");           
            }
        }
      } catch (error) {
        console.error("Error adding cart item to the server:", error);
      }
    };


    const updateCartItemQuantity = async (cartItem, itemQuantity) => {
      
      console.log("cart item",cartItem);
      console.log("item quantity",itemQuantity);  
  
      // Send the updated quantity to the server using API
      try {
            const response=await fetch(`http://localhost:8080/api/cart/updateCartQuantity`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...cartItem ,user:getCurrentUserDetails(),quantity:itemQuantity})
          });
          if(response.ok){
            console.log("Cart item quantity updated on the server!");
            // Update the cart item quantity locally in the cart state
            setCart(cart.map(item => item.id === cartItem.id ? 
              { ...cartItem, quantity:itemQuantity } : item) ); 
              
            } else{
              console.log("Cart item quantity updatedation failed!...");           
            }
      } catch (error) {
        console.error("Error updating cart item quantity on the server:", error);
      }
    };

    const deleteCartItems = async (cartItems) => {
      try {
        // Make the DELETE request to the server
        const response = await fetch(`http://localhost:8080/api/cart/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Include any other headers or authorization tokens if needed
          },
          body:JSON.stringify(cartItems)
        });

        // Check if the request was successful
        if (response.ok) {
          console.log('Cart item deleted successfully!');
          // update the local cart state 
          setCart(cart.filter(item=>!cartItems.some((cartItem) => cartItem.id === item.id)))
        } else {
          console.error('Failed to delete cart item.');
        }
      } catch (error) {
        console.error('An error occurred while deleting the cart item:', error);
      }
    };

    const placeOrder=async(orderData)=>{

      try {
        const response=await fetch(`http://localhost:8080/api/order/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
        });
        if(response.ok){
          deleteCartItems(cart)
          setCart([])
          return true
        }
        else{
          console.log(await response.text())
          return false;
        }
      } catch (error) {
        console.error(error)
        return false;
      }
      
    }

    return(
        <CartContext.Provider value={{
          cart,
          setCart,
          totalCartPrice,
          setTotalCartPrice,
          cartQuantity,
          setCartQuantity,
          getAllCartItems,
          addToCart,
          updateCartItemQuantity,
          deleteCartItems,
          placeOrder }}>

            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider