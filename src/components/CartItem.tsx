import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { AppDispatch, RootState } from "../redux/store";

type CartItemProps = {
  id: number;
  quantity: number;
  showCategory?: boolean;
};

const CartItem = ({ id, quantity, showCategory }: CartItemProps) => {
  const uid = useSelector((state: RootState) => state.userAccount.user?.uid);
  const storageItems = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch<AppDispatch>();
  const item = storageItems.find((i) => i.id === id);

  return (
    <>
      {showCategory && <hr />}
      <div className="flex items-center py-2 justify-between">
        <div className="flex items-center">
          <img
            src={item?.img}
            alt={item?.name}
            // className={`w-${showCategory ? 20 : 8} rounded-sm mr-2`} why is it buggy?
            className={
              showCategory ? "w-20 rounded-sm mr-2" : "w-8 rounded-sm mr-2"
            }
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg">{item?.name}</p>
            {showCategory && (
              <p className="text-sm text-gray-600">{item?.type}</p>
            )}
            <p className="text-sm text-gray-600 font-bold">
              ${item!.price * quantity}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            className="bg-blue-500 text-white p-2 w-10 rounded-md"
            onClick={() => dispatch(addToCart({ item, uid }))}
          >
            +
          </button>
          {quantity}
          <button
            className="bg-blue-500 text-white p-2 w-10 rounded-md"
            onClick={() => dispatch(removeFromCart({ item, uid }))}
          >
            -
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
