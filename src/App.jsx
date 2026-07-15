// import { useState } from "react";
import "./App.css";
import { Checkout } from "./Pages/Checkout";
import { MyOrders } from "./Pages/Order";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { Header } from "./Header/Header";

import { Routes, Route } from "react-router";
import { CartProvider } from "./Compontes/CartContext";
import { WhatsAppButton } from "./icons/FaWhatsap";
import Footer from "./Footer/Footer";
import Hero from "./Hero/Hero";

function App() {
  // const [count, setCount] = useState(0);

  return (
    // 👈 2. تغليف الـ Routes بالكامل داخل البروفايدر
    <CartProvider>
      <WhatsAppButton />

      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Order" element={<MyOrders />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </CartProvider>
  );
}

export default App;
