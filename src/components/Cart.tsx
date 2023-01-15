import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const totalCost = cart.reduce((acc, curr) => {
    const item = items.find((i) => i.id === curr.id);
    return acc + item!.price * curr.quantity;
  }, 0);
  return (
    <div className="fixed top-20 right-0 w-64 h-64 bg-slate-400 rounded-lg p-4 pb-8 z-10">
      <h2 className="text-lg font-medium">My Cart</h2>
      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <div className="flex flex-col gap-2 h-full overflow-y-scroll">
          <ul className="flex flex-col gap-2 pb-3">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} {...cartItem} />
            ))}
          </ul>
          <div className="w-full flex justify-between items-center py-2">
            <h3 className="text-lg font-medium">Total: ${totalCost}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
