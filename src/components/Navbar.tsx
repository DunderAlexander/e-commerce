import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsCartOpen, setIsUserOpen } from "../redux/slices/utilitySlice";
import { Link } from "react-router-dom";
import User from "./User";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { setUser } from "../redux/slices/userAccountSlice";
import { getCart } from "../redux/slices/cartSlice";

const Navbar = () => {
  const { isCartOpen, isUserOpen } = useSelector(
    (state: RootState) => state.utility
  );

  const cart = useSelector((state: RootState) => state.cart);
  const totalQuantity = cart.map((i) => i.quantity).reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.userAccount.user?.uid);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let displayName = user.displayName;
        if (!displayName) {
          let email = user.email;
          if (email) {
            let name = email.split("@")[0];
            name = name[0].toUpperCase() + name.slice(1);
            displayName = name;
          }
        }
        dispatch(
          setUser({
            email: user.email,
            displayName: displayName,
            uid: user.uid,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  useEffect(() => {
    const cartStorage = localStorage.getItem(`cart_${uid}`);
    if (cartStorage) {
      dispatch(getCart(JSON.parse(cartStorage)));
      console.log(JSON.parse(cartStorage));
    } else {
      dispatch(getCart([]));
    }
  }, [uid]);

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
          <FontAwesomeIcon
            icon={faUser}
            size={"2xl"}
            className="mr-2 cursor-pointer"
            onClick={() => {
              dispatch(setIsUserOpen(!isUserOpen));
              dispatch(setIsCartOpen(false));
            }}
          />
          My account
        </li>
        <li>
          <FontAwesomeIcon
            icon={faShoppingCart}
            size={"2xl"}
            className="mr-2 cursor-pointer"
            onClick={() => {
              dispatch(setIsCartOpen(!isCartOpen));
              dispatch(setIsUserOpen(false));
            }}
          />
          {totalQuantity !== 0 && (
            <div className="absolute bg-rose-700 p-1 w-6 h-6 rounded-full text-center text-xs text-white translate-x-4 -translate-y-4 ">
              {totalQuantity}
            </div>
          )}
          My cart
        </li>
      </ul>
      {isCartOpen && <Cart />}
      {isUserOpen && <User />}
    </nav>
  );
};

export default Navbar;
