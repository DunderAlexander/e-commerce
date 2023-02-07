import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/utilitySlice";
import { RootState } from "../redux/store";
import SearchDropdown from "./SearchDropdown";

type SearchBarProps = {
  onSmallScreen?: boolean;
};

const SearchBar = ({ onSmallScreen }: SearchBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchDropdownOpened, setSearchDropdownOpened] = useState(false);
  const searchQuery = useSelector(
    (state: RootState) => state.utility.searchQuery
  );
  const dispatch = useDispatch();

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
      className={
        onSmallScreen ? "w-full relative" : "w-full relative hidden lg:block"
      }
      onFocus={() => {
        handleDropdownOpening();
      }}
      onBlur={(e) => {
        handleDropdownClosing(e);
      }}
    >
      {searchDropdownOpened && (
        <div className="absolute w-full top-10">
          <SearchDropdown />
        </div>
      )}
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
            dispatch(setSearchQuery(e.target.value));
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
