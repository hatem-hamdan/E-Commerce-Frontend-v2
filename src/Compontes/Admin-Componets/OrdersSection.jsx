import { useEffect, useState } from "react";

export function OrdersSection() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(
          "https://fafafaf-gydf.onrender.com/api/MyStore/GetAllOrders",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed To Load Orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <h2 className="mb-4">Orders</h2>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>City</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>

              <td>{order.userName}</td>

              <td>{order.city}</td>

              <td>{order.totalPrice}</td>

              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
