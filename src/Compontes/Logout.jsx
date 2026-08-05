import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Header } from "../header/Header";

export function AccountMenu({ user, setUser, onClose }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("https://jythg.onrender.com/api/MyStore/Logout", {
      method: "POST",
      credentials: "include",
    });

    onClose();

    navigate("/");

    setUser(null);
  };

  return (
    <div
      className="card shadow position-absolute p-3"
      style={{
        top: "50px",
        right: "0",
        width: "220px",
        zIndex: 9999,
      }}
    >
      <h6 className="fw-bold mb-3 text-center">{user?.username}</h6>

      <button
        className="btn btn-outline-dark mb-2 w-100"
        onClick={() => navigate("/Order")}
      >
        طلباتي
      </button>

      <button className="btn btn-danger w-100" onClick={handleLogout}>
        تسجيل الخروج
      </button>
    </div>
  );
}
