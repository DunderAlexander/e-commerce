import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../redux/slices/utilitySlice";
import { RootState } from "../redux/store";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const totalCost = cart.reduce((acc, curr) => {
    const item = items.find((i) => i.id === curr.id);
    return acc + item!.price * curr.quantity;
  }, 0);
  return (
    <div className="fixed top-1/2 right-1/2 w-[80%] lg:h-[60%] h-[70%] lg:w-[30%] translate-x-1/2 -translate-y-1/2 bg-white drop-shadow-2xl rounded-lg p-4 pb-8 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">My Cart</h2>
        <button
          className="font-bold"
          onClick={() => dispatch(setIsCartOpen(false))}
        >
          X
        </button>
      </div>
      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar-hide">
          <ul className="flex flex-col gap-2 pb-3">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} {...cartItem} />
            ))}
          </ul>
          <div className="w-full flex justify-between items-center py-2">
            <h3 className="text-lg font-medium">Total: ${totalCost}</h3>
            <Link
              to={"/cart"}
              onClick={() => {
                dispatch(setIsCartOpen(false));
              }}
            >
              <button className="bg-blue-500 text-white p-2 rounded-sm">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
