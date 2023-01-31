import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import SearchDropdown from "./SearchDropdown";

const SearchBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchDropdownOpened, setSearchDropdownOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      ref={containerRef}
      className="w-full relative"
      onFocus={() => {
        setSearchDropdownOpened(true);
      }}
      onBlur={(e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.relatedTarget)
        ) {
          setSearchDropdownOpened(false);
        }
      }}
    >
      {searchDropdownOpened && <SearchDropdown searchQuery={searchQuery} />}
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
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute top-[10px] right-3"
          onClick={() => {
            setSearchDropdownOpened(false);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
