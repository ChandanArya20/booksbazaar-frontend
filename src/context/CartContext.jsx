import { createContext, useEffect, useState } from "react";
import { getCurrentUserDetails } from "../Auth/loginFunc";
import { toast } from 'react-toastify';

//create cart context
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

	const [cart, setCart] = useState([]);
	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const [cartQuantity, setCartQuantity] = useState(0);

	//update local state if cart gets changes
	useEffect(() => {

		setCartQuantity(cart.length);
		let totalPrice = 0;

		//calculate the total price in cart
		cart.forEach((cartItem) => {
			totalPrice += cartItem.book.price * cartItem.quantity;
		});
		setTotalCartPrice(totalPrice);

	}, [cart]);


	//sets carts data at the time of mounting
	useEffect(() => {
		refreshAllCartItems();
	}, []);


	//gets updated cart data from db and refresh the local cart context with latest data
	const refreshAllCartItems = async () => {

		const currentUser = getCurrentUserDetails();
		try {
			if (currentUser) {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/user/${currentUser.id}/allCartData`);
				if (response.ok) {
					const cartItems = await response.json();
					setCart(cartItems);
				} else {
					console.log("Not got cartData");
				}
			}
		} catch (error) {
			console.error(error);
			toast.error("Server is down, try again later", {
				position: 'top-center',
				theme: 'dark'
			});
		}
	};


	// add items to the cart local and in db as well
	const addToCart = async (newCartItem) => {

		//create cart item object
		const cartItem = { id: newCartItem.book.id, ...newCartItem }

		const currentUser = getCurrentUserDetails();

		if (currentUser) {

			// Send the new cart item to the server using API  
			const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/addToCart`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...cartItem, user: getCurrentUserDetails() })
			});

			if (response.ok) {
				console.log("Cart item added to database...");
				// Update the local cart state
				setCart([...cart, cartItem]);
			} else {
				console.log("Cart didn't added..., failed!");
			}
		}
	};


	const updateCartItemQuantity = async (cartItem, itemQuantity) => {

		// Send the updated quantity to the server using API 
		const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/updateCartQuantity`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...cartItem, user: getCurrentUserDetails(), quantity: itemQuantity })
		});

		if (response.ok) {
			console.log("Cart item quantity updated on the server!");
			// Update the cart item quantity locally in the cart state
			setCart(cart.map(item => item.id === cartItem.id ? { ...cartItem, quantity: itemQuantity } : item));

		} else {
			console.log("Cart item quantity updatedation failed!...");
		}
	};

	const deleteCartItems = async (cartItems) => {

		//delete cart item from db
		const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems)
		});

		if (response.ok) {
			console.log('Cart item deleted successfully!');
			// update the local cart state 
			setCart(cart.filter(item => !cartItems.some((cartItem) => cartItem.id === item.id)));
		} else {
			console.error('Failed to delete cart item.');
		}
	};

	const placeCartOrder = async (orderData) => {

		//place order in db
		const response = await fetch(`${process.env.REACT_APP_API_URL}/order/placeOrder`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData)
		});
		if (response.ok) {
			deleteCartItems(cart);
			setCart([]);
			return true;
		}
		else {
			console.log(await response.text());
			return false;
		}
	};

	return (
		<CartContext.Provider value={{
			cart,
			setCart,
			refreshAllCartItems,
			totalCartPrice,
			setTotalCartPrice,
			cartQuantity,
			setCartQuantity,
			addToCart,
			updateCartItemQuantity,
			deleteCartItems,
			placeCartOrder
		}}>

			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider;