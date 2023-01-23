import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/slices/cartSlice";
import { useMemo } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const itemId = typeof id === "string" ? parseInt(id) : undefined;
  const selectedItem = useSelector((state: RootState) =>
    state.items.find((i) => i.id === itemId)
  );
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  if (!selectedItem) {
    return <h3 className="text-xl font-medium text-center">Item not found</h3>;
  }
  const clickedItem = useMemo(
    () => cart.find((i) => i.id === selectedItem.id),
    [cart, selectedItem.id]
  );

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <img
        className="w-64 h-64 object-cover rounded-md"
        src={selectedItem.img}
        alt={selectedItem.name}
      />
      <div className="self-center">
        <h1 className="text-3xl font-medium">{selectedItem.name}</h1>
        <p className="text-gray-600">{selectedItem.description}</p>
        <h3 className="text-xl font-medium">${selectedItem.price}</h3>
        <button
          className={`bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg ${
            clickedItem && "opacity-50 cursor-not-allowed hover:bg-indigo-500"
          }`}
          onClick={() => {
            dispatch(addToCart(selectedItem));
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
