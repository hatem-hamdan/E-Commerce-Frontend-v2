import { useEffect, useState } from "react";
import "./Ordere.css"; // استيراد ملف التنسيقات

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://fafafaf-gydf.onrender.com/api/MyStore/GetMyOrders",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("ليس لديك أي طلبات سابقة حتى الآن.");
          }
          throw new Error("فشل في جلب البيانات. يرجى المحاولة لاحقاً.");
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center orders-page-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <h4 className="text-primary ms-3">جاري تحميل طلباتك...</h4>
      </div>
    );

  if (error)
    return (
      <div className="container d-flex justify-content-center align-items-center orders-page-container">
        <div
          className="alert alert-danger w-100 text-center shadow-lg"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill ms-2"></i>
          {error}
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div
        className="container my-5 text-center orders-page-container"
        dir="rtl"
      >
        <div className="card shadow-lg border-0 p-5 order-card">
          <i className="bi bi-box-seam display-1 text-muted mb-4"></i>
          <h3 className="text-light fw-bold">طلباتك فارغة!</h3>
          <p className="text-muted">لم تقم بأي طلبات سابقة حتى الآن.</p>
          <a
            href="/"
            className="btn btn-primary mt-3 w-auto mx-auto px-4 py-2 rounded-pill"
          >
            تسوق الآن
          </a>
        </div>
      </div>
    );

  return (
    <div
      className="container-fluid py-5 min-vh-100 orders-page-container"
      dir="rtl"
    >
      <div className="container">
        <h2 className="mb-5 fw-bold orders-title">
          <i className="bi bi-bag-check-fill ms-3"></i> طلباتي السابقة
        </h2>

        {orders.map((order) => (
          <div
            className="card mb-5 shadow-lg border-0 overflow-hidden order-card"
            key={order.orderId}
          >
            <div className="card-header order-header">
              <div>
                <span className="fw-bold fs-5 text-white">
                  رقم الطلب: #{order.orderId}
                </span>
                <span className="mx-3 text-muted">|</span>
                <span className="text-muted">
                  التاريخ:{" "}
                  {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                </span>
              </div>
              <span
                className={`badge ${order.orderStatus === "Completed" ? "bg-success" : "bg-warning"} rounded-pill`}
              >
                {order.orderStatus === "Completed" ? "مكتمل" : "قيد المراجعة"}
              </span>
            </div>

            <div className="card-body order-body">
              <div className="table-responsive">
                <table className="table table-borderless table-custom align-middle">
                  <thead>
                    <tr>
                      <th>المنتج</th>
                      <th>الاسم</th>
                      <th>الكمية</th>
                      <th>السعر</th>
                      <th>الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.productImage}
                            className="product-img"
                            alt={item.productName}
                          />
                        </td>
                        <td className="fw-bold">{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td className="price-text">{item.itemPrice} ر.س</td>
                        <td className="text-light">
                          {item.quantity * item.itemPrice} ر.س
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer order-footer">
              <h5 className="mb-0 text-muted ms-3">الإجمالي الكلي:</h5>
              <h3 className="mb-0 fw-bold price-text">
                {order.orderTotalPrice} ر.س
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
