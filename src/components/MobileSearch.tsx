import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

const MobileSearch = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900/75 z-40">
      <div className="">
        <SearchBar onSmallScreen={true} />
        <SearchDropdown />
      </div>
    </div>
  );
};

export default MobileSearch;
