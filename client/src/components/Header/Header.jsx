import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";

import Search from "./Search/Search";
import Cart from "./../Cart/Cart";
import { Context } from "../../utils/Context";

const Header = () => {
  const {cartCount } = useContext(Context);

  const [showSearch , setShowSearch] = useState(false)
  const [showCart , setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  const navigate = useNavigate();
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""} `}>
        <div className="header-content">
          <ul className="left">
            <li onClick={()=>navigate(`/`)}> HOME</li>
            <li > ABOUT </li>
            <li> CATEGORIES </li>
          </ul>
          <div className="center" onClick={()=>navigate(`/`)} > Trendz </div>
          <div className="right">
            <FaSearch onClick={()=> setShowSearch(true)} />
            <FaRegHeart />
            <span className="cart-icon" onClick={()=>{ setShowCart(true)} } >
              <CgShoppingCart />
              {!!cartCount && <span> { cartCount }</span>}
            </span>
          </div>
        </div>
      </header>
     {showCart  && <Cart visibleCart={setShowCart} />}
     {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
