import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Cart from "./Cart";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <nav className="flex items-center py-4 px-12 relative">
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
          <FontAwesomeIcon icon={faUser} size={"2xl"} className="mr-2" />
          My account
        </li>
        <li>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size={"2xl"}
            className="mr-2 cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
          My cart
        </li>
      </ul>
      {isCartOpen && <Cart />}
    </nav>
  );
};

export default Navbar;
