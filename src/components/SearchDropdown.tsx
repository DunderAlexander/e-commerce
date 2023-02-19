import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsSearchOpen } from "../redux/slices/utilitySlice";
import { RootState } from "../redux/store";

const SearchDropdown = () => {
  const items = useSelector((state: RootState) => state.items);
  const searchQuery = useSelector(
    (state: RootState) => state.utility.searchQuery
  );
  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const dispatch = useDispatch();

  return filteredItems.length !== 0 ? (
    <div className="bg-white border-2 rounded-xl p-4 flex flex-col gap-4">
      {filteredItems.slice(0, 6).map((item) => (
        <div key={item.id} className="flex justify-between">
          <div>
            <Link
              to={`${item.id}`}
              onClick={() => {
                dispatch(setIsSearchOpen(false));
              }}
            >
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

export default SearchDropdown;
