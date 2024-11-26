import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import ToggleTheme from "./ToggleTheme";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";

const Navbar = ({ webName }) => {
  const [linkList, setLinkList] = useState([
    { link: "/login", label: "Login" },
    { link: "/signup", label: "Sign Up" },
    { link: "/home", label: "Home" },
    // Add more links as needed
  ]);
  const user = useContext(UserContext).user;
  const cart = useContext(CartContext).cart;

  const renderLinks = useMemo(() => {
    return (list, name) => {
      if (!list) return null;
      return list.map((link, index) => {
        return (
          <li key={`${name}.${index}`}>
            <Link to={`${link.link}`}>{link.label}</Link>
          </li>
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user?.username) {
      setLinkList([
        { link: "/signup", label: "Sign Up" },
        { link: "/home", label: "Home" },
        {
          link: "/cart",
          is_cart: true,
          label: `Cart(${cart?.items?.length ? cart?.items?.length : 0})`,
        },
      ]);
    }
  }, [cart, user?.username]);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          {webName}
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal space-x-2">
          {renderLinks(linkList, "linkList")}
        </ul>

        <ToggleTheme />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  webName: PropTypes.string,
};

export default Navbar;
