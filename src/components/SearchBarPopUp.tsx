import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

const SearchBarPopUp = ({ searchQuery }: any) => {
  const items = useSelector((state: RootState) => state.items);
  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;
  return filteredItems.length !== 0 ? (
    <div className="w-full absolute top-10 bg-white border-2 rounded-xl p-4 z-10 flex flex-col gap-4">
      {filteredItems.slice(0, 6).map((item) => (
        <div key={item.id} className="flex justify-between">
          <div>
            <Link to={`/items/${item.id}`}>
              <div className="font-medium hover:text-blue-300">{item.name}</div>
            </Link>
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
  ) : (
    <></>
  );
};

export default SearchBarPopUp;
