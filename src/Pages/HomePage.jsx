// import "./HomePage.css";

// import { useState } from "react";
import { Header } from "../header/Header";
import Products from "../Compontes/ProductCard";
export function HomePage() {
  // const [showLogin, setShowLogin] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Header />

      <Products />
    </>
  );
}
