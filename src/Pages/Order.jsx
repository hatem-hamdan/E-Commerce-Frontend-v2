import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Ordere.css"; // تأكد من وجود ملف الـ CSS

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://jythg.onrender.com/api/MyStore/GetMyOrders",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.status === 401) {
          setError("LOGIN");
          return;
        }

        if (response.status === 404) {
          setOrders([]);
          return;
        }

        if (!response.ok) {
          throw new Error("حدث خطأ أثناء تحميل الطلبات.");
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setError("SERVER");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loader"></div>
        <h2>جاري تحميل طلباتك...</h2>
      </div>
    );
  }

  if (error === "LOGIN") {
    return (
      <div className="orders-empty-page">
        <div className="orders-empty-card">
          <div className="empty-icon">🔐</div>

          <h2>يجب تسجيل الدخول</h2>

          <p>سجل دخولك حتى تتمكن من مشاهدة جميع طلباتك السابقة.</p>

          <Link to="/login" className="shop-btn">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  if (error === "SERVER") {
    return (
      <div className="orders-empty-page">
        <div className="orders-empty-card">
          <div className="empty-icon">⚠️</div>

          <h2>حدث خطأ</h2>

          <p>تعذر تحميل الطلبات حالياً، حاول مرة أخرى لاحقاً.</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty-page">
        <div className="orders-empty-card">
          <div className="empty-icon">📦</div>

          <h2>ليس لديك طلبات حتى الآن</h2>

          <p>عندما تقوم بشراء أي منتج ستظهر جميع طلباتك هنا.</p>
          <Link to="/" className="shop-btn">
            ابدأ التسوق
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>طلباتي</h1>
        <p>يمكنك متابعة جميع طلباتك السابقة من هنا.</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.orderId}>
            <div className="order-top">
              <div>
                <h2>طلب #{order.orderId}</h2>

                <span>
                  {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                </span>
              </div>

              <div
                className={`status ${
                  order.orderStatus === "Completed" ? "completed" : "pending"
                }`}
              >
                {order.orderStatus === "Completed" ? "مكتمل" : "قيد المراجعة"}
              </div>
            </div>

            <div className="shipping-box">
              <div className="shipping-item">
                <span>📍</span>
                <div>
                  <small>المدينة</small>
                  <strong>{order.city}</strong>
                </div>
              </div>

              <div className="shipping-item">
                <span>🏠</span>
                <div>
                  <small>العنوان</small>
                  <strong>{order.addressLine}</strong>
                </div>
              </div>
            </div>

            <div className="products">
              {order.items.map((item, index) => (
                <div className="product-row" key={index}>
                  <img src="t3.png" alt={item.productName} />

                  <div className="product-info">
                    <h3>{item.productName}</h3>

                    <p>الكمية: {item.quantity}</p>

                    <p>اللون: {item.color}</p>
                    <p>نوع الجهاز: {item.deviceType}</p>
                  </div>

                  <div className="product-price">
                    <span>{item.itemPrice} ر.س</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div>
                <span>الإجمالي</span>

                <h2>{order.orderTotalPrice} ر.س</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
