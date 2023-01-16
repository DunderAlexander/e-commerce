import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { setIsCartOpen } from "../redux/slices/utilitySlice";
import { AppDispatch, RootState } from "../redux/store";

export type Items = {
  item: {
    id: number;
    name: string;
    type: string;
    price: number;
    img: string;
  };
};

const ItemCard: React.FC<Items> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const clickedItem = useMemo(
    () => cart.find((i) => i.id === item.id),
    [cart, item.id]
  );
  return (
    <div className={`w-64 h-full p-4 ${isHovered ? "shadow-lg" : ""}`}>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={item.img}
          alt={item.name}
          className={`w-full h-48 object-contain rounded-lg ${
            isHovered ? "blur-sm" : ""
          }`}
        />
        <button
          className={`py-2 px-4 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isHovered ? "" : "hidden"
          } ${
            clickedItem && "opacity-50 cursor-not-allowed hover:bg-indigo-500"
          }`}
          onClick={() => {
            dispatch(addToCart(item));
            dispatch(setIsCartOpen(true));
          }}
          disabled={!!clickedItem}
        >
          {clickedItem ? "Added to cart!" : "Add to cart"}
        </button>
      </div>
      <h4 className="text-lg font-medium mt-2">{item.name}</h4>
      <p className="text-sm text-gray-600 capitalize">{item.type}</p>
      <p className="text-sm font-medium">${item.price}</p>
    </div>
  );
};

export default ItemCard;
