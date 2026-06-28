import { Link } from "react-router";
import { Login } from "../Compontes/Login";
import { Register } from "../Compontes/Register";
import { useState, useEffect } from "react";
import { useCart } from "../Compontes/CartContext";
import { AccountMenu } from "../Compontes/Logout";
import axios from "axios";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  // 🟢 حالة إظهار كارد الحساب
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { cartItems } = useCart();

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid px-2 px-lg-3">
          <Link className="navbar-brand fw-bold" to="/">
            MyStore
          </Link>

          <div className="navbar-nav ms-auto align-items-center gap-3">
            {user?.role === "Admin" && (
              <Link className="nav-link text-white" to="/AdminDashboard">
                Admin
              </Link>
            )}

            <Link className="nav-link text-white" to="/Order">
              Orders
            </Link>

            <div className="position-relative d-inline-block mx-2">
              <img className="cart-icon" src="buy-again.png" alt="Cart" />

              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {cartItems.length}
              </span>
            </div>

            <Link className="nav-link text-white" to="/CheckOut">
              Checkout
            </Link>
            {/* 👤 الحساب */}
            <div className="position-relative">
              <img
                className="cart-icon"
                src="/icons/person.png"
                alt="Account"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (user) {
                    setShowAccountMenu(!showAccountMenu);
                  } else {
                    setShowLogin(true);
                  }
                }}
              />

              {/* 🟢 كارد الحساب */}
              {showAccountMenu && (
                <AccountMenu
                  setUser={setUser}
                  onClose={() => setShowAccountMenu(false)}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Login */}
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
      {/* Register */}
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
