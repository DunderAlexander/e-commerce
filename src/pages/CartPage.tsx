import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { RootState } from "../redux/store";

const CartPage = () => {
  const { items, cart } = useSelector((state: RootState) => state);
  const totalCost = cart.reduce((acc, curr) => {
    const item = items.find((i) => i.id === curr.id);
    return acc + item!.price * curr.quantity;
  }, 0);
  return (
    <div className="py-4">
      <h1 className="px-12 font-bold text-xl">
        Cart <span className="text-sm translate-x-1 absolute">2</span>
      </h1>

      {cart.length === 0 ? (
        <h3 className="text-center text-xl font-medium text-gray-500 pb-4">
          Your cart is empty.
        </h3>
      ) : (
        <div className="py-2">
          {cart.map((cartItem) => (
            <div className="bg-white rounded-md my-2 p-2 px-12">
              <CartItem key={cartItem.id} showCategory={true} {...cartItem} />
            </div>
          ))}
          <div className="w-full flex justify-between items-center my-4 py-4 border-solid px-12">
            <h3 className="text-xl font-medium ">Total:</h3>
            <h3 className="text-xl font-medium">${totalCost}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
