import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/slices/cartSlice";
import { useMemo } from "react";

const ItemDetails = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const uid = useSelector((state: RootState) => state.userAccount.user?.uid);
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state: RootState) =>
    state.items.find((i) => i.id === id)
  );

  if (!item) {
    return (
      <h3 className="text-xl font-medium text-center">
        Item not found or loading...
      </h3>
    );
  }

  const clickedItem = cart.find((i) => i.id === item.id);

  return (
    <div className="flex flex-col gap-2 p-6">
      <img
        src={item.img}
        alt={item.name}
        className="object-contain max-w-[24rem]"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg">{item.name}</h1>
        <hr />
        <h1 className="font-bold text-lg">${item.price}</h1>
        <p className="font-light italic text-gray-400">{item.type}</p>
        <h1 className="font-bold text-lg">About the item</h1>
        <p>{item.description}</p>
        <button
          className={`bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg ${
            clickedItem && "opacity-50 cursor-not-allowed hover:bg-indigo-500"
          }`}
          onClick={() => {
            dispatch(addToCart({ item, uid }));
          }}
          disabled={!!clickedItem}
        >
          {clickedItem ? "Added to cart!" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
