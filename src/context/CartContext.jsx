import { createContext, useEffect, useState } from "react"

export const CartContext = createContext()

const CartContextProvider=({children})=>{
    
    const [cart, setCart]=useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    useEffect(() => {
        
        let totalPrice = 0;
        cart.forEach((item) => {
          totalPrice += item.totalPrice ? item.totalPrice : item.price;
        });
        setTotalCartPrice(totalPrice);
      }, [cart]);
    
    return(
        <CartContext.Provider value={{cart,setCart,totalCartPrice,setTotalCartPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider