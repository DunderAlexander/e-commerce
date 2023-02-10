import { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { RootState } from "../redux/store";

const CartPage = () => {
  const { items, cart } = useSelector((state: RootState) => state);
  const [discount, setDiscount] = useState(0);
  const [validPromo, setValidPromo] = useState(false);
  const [invalidPromo, setInvalidPromo] = useState(false);

  if (items.length === 0)
    return (
      <h3 className="text-xl font-medium text-center mt-10">
        Cart is loading...
      </h3>
    );

  const totalCost = cart.reduce((acc, curr) => {
    const item = items.find((i) => i.id === curr.id);
    console.log(item);
    return acc + item!.price * curr.quantity;
  }, 0);
  const totalQuantity = cart.map((i) => i.quantity).reduce((a, b) => a + b, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.promoCode;
    if (!input.value) return;
    const enteredCode = input.value.toUpperCase().trim();
    if (
      enteredCode === "PROMO" ||
      enteredCode === "LINA" ||
      enteredCode === "DISCOUNT"
    ) {
      setDiscount(0.2);
      setValidPromo(true);
      setInvalidPromo(false);
    } else {
      setDiscount(0);
      setValidPromo(false);
      setInvalidPromo(true);
    }
    input.value = "";
  };

  const discountedTotal = (1 - discount) * totalCost;
  const discountPercent = `-${(discount * 100).toFixed(0)}%`;

  return (
    <div className="py-4">
      <h1 className="px-12 font-bold text-xl">
        Cart{" "}
        <span className="text-sm translate-x-1 absolute">
          {cart.length !== 0 && totalQuantity}
        </span>
      </h1>

      {cart.length === 0 ? (
        <h3 className="text-center text-xl font-medium text-gray-500 pb-4">
          Your cart is empty.
        </h3>
      ) : (
        <div className="py-2 px-12">
          {cart.map((cartItem) => (
            <div className="bg-white rounded-md my-2 p-2">
              <CartItem key={cartItem.id} showCategory={true} {...cartItem} />
            </div>
          ))}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Promocode</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="promoCode"
                className="border-2 rounded-xl p-2 w-full"
              />
            </form>
            {validPromo && (
              <p className="text-green-500 absolute translate-y-6">
                Promocode Applied!
              </p>
            )}
            {invalidPromo && (
              <p className="text-red-500 absolute translate-y-6">
                Promocode is not valid or expired.
              </p>
            )}
          </div>
          <div className="w-full grid grid-cols-2 gap-y-4 my-4 py-4 ">
            <h3 className="text-xl font-medium ">Total:</h3>
            <h3 className="text-xl text-right">${discountedTotal}</h3>
            {discount !== 0 && (
              <p className="text-green-500 text-right absolute translate-y-6">
                {discountPercent}
              </p>
            )}
            <h3 className="text-xl font-medium ">Items:</h3>
            <h3 className="text-xl text-right">{totalQuantity}</h3>
          </div>
          <div className="flex justify-end">
            <button className="text-white text-lg font-bold bg-blue-500 p-2 rounded-lg">
              Buy now!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
