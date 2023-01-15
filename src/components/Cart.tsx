import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import CartItem from "./CartItem";
import items from "../util/items";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="fixed top-20 right-0 w-64 h-64 bg-slate-400 rounded-lg p-4 z-10">
      <h2 className="text-lg font-medium">My Cart</h2>
      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <ul>
          {" "}
          {cart.map((cartItem) => (
            <CartItem key={cartItem.id} {...cartItem} />
          ))}{" "}
        </ul>
      )}
    </div>
  );
};

export default Cart;
