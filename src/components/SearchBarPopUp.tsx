import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SearchBarPopUp = () => {
  const items = useSelector((state: RootState) => state.items);
  return (
    <div className="w-full absolute top-10 bg-white border-2 rounded-xl p-4 z-10 flex flex-col gap-4">
      {items.slice(0, 6).map((item) => (
        <div key={item.id} className="flex justify-between">
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-400">{item.type}</div>
          </div>
          <div>
            <img
              src={item.img}
              alt={item.name}
              className="h-12 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBarPopUp;
