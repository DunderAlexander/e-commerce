import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex items-center py-4 px-12">
      <div className="flex gap-20 items-center flex-1">
        <img src="QuickCart.svg" alt="logo" />
        <form className="relative w-full">
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

      <ul className="flex justify-between gap-[5rem] ml-20">
        <li>
          <FontAwesomeIcon
            icon={faUser}
            size={"2xl"}
            className="mr-2"
            color="#EC8814"
          />
          My account
        </li>
        <li>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size={"2xl"}
            className="mr-2"
            color="#EC8814"
          />
          My cart
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
