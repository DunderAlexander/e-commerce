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
    <div className="bg-gray-200">
      <div className="px-4 py-2">
        <h2 className="text-3xl font-medium text-center pt-4">My Cart</h2>
      </div>
      {cart.length === 0 ? (
        <h3 className="text-center text-xl font-medium text-gray-500 pb-4">
          Your cart is empty.
        </h3>
      ) : (
        <div className="px-4 py-2">
          {cart.map((cartItem) => (
            <div className="bg-white rounded-md my-2 p-2">
              <CartItem key={cartItem.id} showCategory={true} {...cartItem} />
            </div>
          ))}
          <div className="w-full flex justify-between items-center py-2">
            <h3 className="text-xl font-medium">Total: ${totalCost}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
