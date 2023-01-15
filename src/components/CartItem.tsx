import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const storageItems = useSelector((state: RootState) => state.items);
  const item = storageItems.find((i) => i.id === id);
  return (
    <div className="flex items-center py-2">
      <img src={item?.img} alt={item?.name} className="w-8 rounded-sm mr-2" />
      <div className="flex flex-col">
        <p className="text-lg">{item?.name}</p>
        <p className="text-sm text-gray-600">
          x{quantity} ${item?.price}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
