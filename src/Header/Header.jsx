import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import "./Header.css";

import { Login } from "../Compontes/Login";
import { Register } from "../Compontes/Register";
import { AccountMenu } from "../Compontes/Logout";
import { useCart } from "../Compontes/CartContext";
import { FaBars, FaTimes } from "react-icons/fa";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState(null);

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7078/api/MyStore/GetCurrentUser",
          {
            withCredentials: true,
          },
        );

        setUser(response.data);
      } catch {
        setUser(null);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <>
      {/*========================
              TOP BAR
      ========================*/}
      <div className="top-bar">
        <div className="container">
          🚚 شحن سريع لجميع مناطق المملكة العربية السعودية
        </div>
      </div>
      {/*========================
              HEADER
      ========================*/}
      <header className="header">
        <div className="container navbar">
          {/* Logo */}
          <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/" className="logo">
            <br />
            <h2>NexuvoSaudi</h2>
          </Link>

          {/* Navigation */}

          <nav className={`nav-links ${showMenu ? "open" : ""}`}>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setShowMenu(false)}
            >
              الرئيسية
            </Link>

            <Link
              to="/Order"
              className="nav-link"
              onClick={() => setShowMenu(false)}
            >
              طلباتي
            </Link>
          </nav>
          {/* Actions */}

          <div className="header-actions">
            <Link to="/CheckOut" className="icon-btn cart-btn">
              <FaShoppingCart />
              <span className="badge">{cartCount}</span>
            </Link>

            <button
              className="login-btn"
              onClick={() => {
                if (user) {
                  setShowAccountMenu(!showAccountMenu);
                } else {
                  setShowLogin(true);
                }
              }}
            >
              <FaUser className="user-icon" />

              <span className="user-name">
                {user ? user.firstName || "حسابي" : "تسجيل الدخول"}
              </span>
            </button>
          </div>

          {showAccountMenu && (
            <AccountMenu
              setUser={setUser}
              onClose={() => setShowAccountMenu(false)}
            />
          )}
        </div>
      </header>

      {/*========================
              LOGIN
      ========================*/}
      {showLogin && (
        <Login
          setUser={setUser}
          setShowAccountMenu={setShowAccountMenu}
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {/*========================
              REGISTER
      ========================*/}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
