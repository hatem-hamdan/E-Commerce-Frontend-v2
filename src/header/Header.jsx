import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import "./Header.css";

import { Login } from "../Compontes/Login";
import { Register } from "../Compontes/Register";
import { AccountMenu } from "../Compontes/Logout";
import { useCart } from "../Compontes/CartContext";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [user, setUser] = useState(null);

  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          "https://storebackend-2-wbm1.onrender.com/api/MyStore/GetCurrentUser",
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
          {/* User */}

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
            <FaUser />
            <span>{user ? user.firstName || "حسابي" : "تسجيل الدخول"}</span>
          </button>

          {/* Search */}

          {/* Cart */}

          <Link to="/CheckOut" className="icon-btn cart-btn">
            <FaShoppingCart />
            <span className="badge">{cartCount}</span>
          </Link>

          {/* Navigation */}

          <nav className="nav-links">
            <Link to="/" className="active">
              الرئيسية
            </Link>
          </nav>

          <nav className="nav-links">
            <Link to="/" className="active">
              طلباتي
            </Link>
          </nav>

          {/* Logo */}

          <Link to="/" className="logo">
            <div className="logo-icon">N</div>

            <div className="logo-info">
              <h2>NexuvoSaudi</h2>
            </div>
          </Link>

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
