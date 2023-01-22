import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ItemDetails = () => {
  const { id } = useParams();
  const itemId = typeof id === "string" ? parseInt(id) : undefined;
  const selectedItem = useSelector((state: RootState) =>
    state.items.find((i) => i.id === itemId)
  );

  if (!selectedItem) {
    return <h3 className="text-xl font-medium text-center">Item not found</h3>;
  }

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
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
