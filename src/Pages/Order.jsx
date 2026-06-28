import { useEffect, useState } from "react";
import { Header } from "../header/Header";
export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // استخراج التوكن المخزن عند تسجيل الدخول

        const response = await fetch(
          "https://storebackend-2-wbm1.onrender.com/api/MyStore/GetMyOrders",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("فشل في جلب الطلبات أو انتهت الجلسة");
        }

        const data = await response.json();
        setOrders(data);
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
      <div className="text-center my-5">
        <h4>جاري تحميل طلباتك...</h4>
      </div>
    );
  if (error)
    return <div className="alert alert-danger my-4 text-center">{error}</div>;
  if (orders.length === 0)
    return (
      <div className="alert alert-info my-4 text-center">
        ليس لديك أي طلبات سابقة حتى الآن.
      </div>
    );

  return (
    <>
      <Header />
      <div className="container my-5" dir="rtl">
        <h2 className="mb-4 text-primary fw-bold">طلباتي السابقة</h2>

        {orders.map((order) => (
          <div className="card mb-4 shadow-sm" key={order.orderId}>
            {/* رأس الكارد: بيانات الطلب الأساسية */}
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold">رقم الطلب: #{order.orderId}</span>
                <span className="mx-3 text-muted">|</span>
                <span>
                  التاريخ:{" "}
                  {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                </span>
              </div>
              <span
                className={`badge ${order.orderStatus === "Completed" ? "bg-success" : "bg-warning"} p-2`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* جسم الكارد: المنتجات داخل الطلب */}
            <div className="card-body">
              <p className="text-muted mb-3">
                <strong>العنوان:</strong> {order.city} - {order.addressLine}
              </p>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>المنتج</th>
                      <th>الاسم</th>
                      <th>الكمية</th>
                      <th>السعر الإفرادي</th>
                      <th>الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={
                              item.productImage ||
                              "https://via.placeholder.com/50"
                            }
                            alt={item.productName}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                            className="rounded"
                          />
                        </td>
                        <td className="fw-bold">{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.itemPrice} ر.س</td>
                        <td>{item.quantity * item.itemPrice} ر.س</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* أسفل الكارد: السعر الإجمالي الكلي للطلب */}
            <div className="card-footer bg-light text-end">
              <h5 className="mb-0 fw-bold text-success">
                الإجمالي الكلي: {order.orderTotalPrice} ر.س
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
