import { createContext, useEffect, useState } from "react"
import { getCurrentUserDetails } from "../Auth/loginFunc"

export const CartContext = createContext()

const CartContextProvider=({children})=>{
    
    const [cart, setCart]=useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartQuantity, setCartQuantity] = useState(0)
    const[currentUser, setCurrentUser]=useState(getCurrentUserDetails())

    useEffect(() => {      
        setCartQuantity(cart.length)     
        let totalPrice = 0;
        cart.forEach((cartItem) => {
          totalPrice += cartItem.book.price*cartItem.quantity;
        });
        setTotalCartPrice(totalPrice);
      }, [cart]);

    const getAllCartItems = async () => {    
      try {
        const response = await fetch(`http://localhost:8080/api/cart/user/${currentUser.id}/allCartData`);
        if (response.ok) {
          const cartItems = await response.json();
          setCart(cartItems)
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      if (currentUser) 
        getAllCartItems();
    }, []);

    useEffect(() => {
      if (currentUser) {
        getAllCartItems();
      } else {
        setCart([]);
      }
    }, [currentUser]);
    
    const updateCurrentUser = (user) => {
      setCurrentUser(user);
    };

    return(
        <CartContext.Provider value={{cart,setCart,totalCartPrice,setTotalCartPrice,cartQuantity,setCartQuantity}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider