// import { useState } from "react";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { Checkout } from "./Pages/Checkout";
import { MyOrders } from "./Pages/Order";
import { AdminDashboard } from "./Pages/AdminDashboard";

import { Routes, Route } from "react-router";
import { CartProvider } from "./Compontes/CartContext";
import { WhatsAppButton } from "./icons/FaWhatsap";
function App() {
  // const [count, setCount] = useState(0);

  return (
    // 👈 2. تغليف الـ Routes بالكامل داخل البروفايدر
    <CartProvider>
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Order" element={<MyOrders />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
