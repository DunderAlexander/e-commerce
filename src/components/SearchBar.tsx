import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchBarPopUp from "./SearchBarPopUp";

const SearchBar = () => {
  const [searchPopUpOpened, setSearchPopUpOpened] = useState(false);

  return (
    <div
      className="w-full relative"
      onFocus={() => {
        setSearchPopUpOpened(true);
      }}
      onBlur={() => {
        setSearchPopUpOpened(false);
      }}
    >
      {searchPopUpOpened && <SearchBarPopUp />}
      <form
        className="relative w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="border-2 rounded-xl p-2 w-full"
        />
        <button type="submit" className="absolute top-[10px] right-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
