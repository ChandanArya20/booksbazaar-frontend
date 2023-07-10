import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line as CartDeleteButton } from "react-icons/ri";
import '../css/cart_item.css'
const CartItem = ({ item }) => {

  const { id, name, image, price, quantity }=item
  return (
    <>
      <div class="cart-item">
        <div class="product-image">
          <img src={image} alt="Product Image"/>
        </div>

        <div class="product-details">
          <h3 class="product-name">{name}</h3>
        </div>

        <div class="quantity-control">
          <button class="quantity-btn minus">-</button>
          <input type="number" class="quantity-input" value={quantity}/>
          <button class="quantity-btn plus">+</button>
        </div>

        <div class="price">{price} ₹</div>
        <CartDeleteButton class="remove-btn"/>
        {/* <button class="remove-btn">Remove</button> */}
    </div>

    </>
  );
};

export default CartItem;
