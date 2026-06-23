import { useState } from "react";

import { OrdersSection } from "../Compontes/Admin-Componets/OrdersSection";
import { ProductsSection } from "../Compontes/Admin-Componets/ProductsSection";
// import { UsersSection } from "../Compontes/Admin-Componets/UsersSection";

export function AdminDashboard() {
  const [section, setSection] = useState("orders");

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
        }}
      >
        <h3 className="mb-4">Admin Panel</h3>

        <button
          className="btn btn-dark w-100 text-start mb-2"
          onClick={() => setSection("orders")}
        >
          Orders
        </button>

        <button
          className="btn btn-dark w-100 text-start mb-2"
          onClick={() => setSection("products")}
        >
          Products
        </button>

        <button
          className="btn btn-dark w-100 text-start mb-2"
          onClick={() => setSection("users")}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {section === "orders" && <OrdersSection />}

        {section === "products" && <ProductsSection />}

        {/* {section === "users" && <UsersSection />} */}
      </div>
    </div>
  );
}
