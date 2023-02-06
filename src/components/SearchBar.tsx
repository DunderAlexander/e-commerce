import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import SearchDropdown from "./SearchDropdown";

type SearchBarProps = {
  onSmallScreen?: boolean;
};

const SearchBar = ({ onSmallScreen }: SearchBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchDropdownOpened, setSearchDropdownOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDropdownOpening = () => {
    if (onSmallScreen) {
      return;
    }
    setSearchDropdownOpened(true);
  };
  const handleDropdownClosing = (e: React.FocusEvent) => {
    if (onSmallScreen) {
      return;
    }
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget)
    ) {
      setSearchDropdownOpened(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative hidden lg:block"
      onFocus={() => {
        handleDropdownOpening();
      }}
      onBlur={(e) => {
        handleDropdownClosing(e);
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
