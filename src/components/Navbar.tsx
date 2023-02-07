import Cart from "./Cart";
import User from "./User";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsCartOpen,
  setIsSearchOpen,
  setIsUserOpen,
} from "../redux/slices/utilitySlice";
import { setUser } from "../redux/slices/userAccountSlice";
import { getCart } from "../redux/slices/cartSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import MobileSearch from "./MobileSearch";

//TODO - make everything responsive

const Navbar = () => {
  const { isCartOpen, isUserOpen, isSearchOpen } = useSelector(
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
    } else {
      dispatch(getCart([]));
    }
  }, [uid]);

  return (
    <nav className="flex items-center justify-between py-4 px-12 relative shadow-md w-full lg:gap-10 gap-20">
      <div className="flex gap-20 items-center lg:flex-1">
        <Link to={"/"}>
          <img src="QuickCart.svg" alt="logo" />
        </Link>
        <SearchBar />
      </div>

      <ul className="flex justify-between lg:gap-20 gap-10">
        <li className="lg:hidden">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={"2xl"}
            className="mr-2 cursor-pointer"
            onClick={() => {
              dispatch(setIsSearchOpen(true));
            }}
          />
        </li>
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
          <span className="hidden lg:inline">My account</span>
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
          <span className="hidden lg:inline">My cart</span>
        </li>
      </ul>
      {isCartOpen && <Cart />}
      {isUserOpen && <User />}
      {isSearchOpen && <MobileSearch />}
    </nav>
  );
};

export default Navbar;
