import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsCartOpen } from "../redux/slices/utilitySlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isCartOpen = useSelector(
    (state: RootState) => state.utility.isCartOpen
  );
  const dispatch = useDispatch();
  return (
    <nav className="flex items-center py-4 px-12 relative shadow-md">
      <div className="flex gap-20 items-center flex-1">
        <Link to={"/"}>
          <img src="QuickCart.svg" alt="logo" />
        </Link>
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
          <Link to={"account"}>
            <FontAwesomeIcon icon={faUser} size={"2xl"} className="mr-2" />
            My account
          </Link>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size={"2xl"}
            className="mr-2 cursor-pointer"
            onClick={() => dispatch(setIsCartOpen(!isCartOpen))}
          />
          My cart
        </li>
      </ul>
      {isCartOpen && <Cart />}
    </nav>
  );
};

export default Navbar;
