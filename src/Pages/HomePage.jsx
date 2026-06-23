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
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome To My Store</h1>

          <p>Best Products With Best Prices</p>

          <button className="btn btn-light btn-lg mt-3">Shop Now</button>
        </div>
      </section>
      <Products />

      {/* Footrer */}
      <footer className="bg-dark text-white text-center p-4">
        MyStore © 2026
      </footer>
    </>
  );
}
