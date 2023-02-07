import { useDispatch } from "react-redux";
import { setIsSearchOpen } from "../redux/slices/utilitySlice";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

const MobileSearch = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900/75 z-40"
      onClick={(e) => {
        dispatch(setIsSearchOpen(false));
      }}
    >
      <div
        className="p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SearchBar onSmallScreen={true} />
        <SearchDropdown />
      </div>
    </div>
  );
};

export default MobileSearch;
