import { useState } from "react";
import { locations } from "../Compontes/locations"; // استيراد ملف المناطق
// import { Header } from "../Header/Header";
import { useCart } from "../Compontes/CartContext"; // استيراد الكونتيكست
import { Login } from "../Compontes/Login";
import "./Checkout.css";

import { Register } from "../Compontes/Register";
export function Checkout() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();
  const [showRegister, setShowRegister] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const [showLogin, setShowLogin] = useState(false);

  // 👈 1️⃣ حقيبة التنبيه الذكية للشيك أوت
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const shippingCost = 15;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedCity("");
  };

  // تعديل الدالة لتصبح جاهزة للـ API والباك إيند
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // لو المستخدم ما سجل دخول أصلاً، نمنعه يكمل الطلب ونحوله للوجين

    const finalOrder = {
      fullName: formData.fullName, // تم التصغير
      phoneNumber: formData.phone, // تم التصغير
      region: selectedRegion, // تم التصغير
      city: selectedCity, // تم التصغير
      addressLine: formData.address, // تم التصغير
      items: cartItems.map((item) => ({
        // تم التصغير
        productId: 1, // تم التصغير
        color: item.color, // تم التصغير
        quantity: item.quantity || 1, // تم التصغير
        price: item.price, // تم التصغير
        deviceType: item.device,
      })),
    };
    console.log(finalOrder);
    try {
      // 2. إرسال الطلب مع تمرير الـ Authorization Header
      const response = await fetch(
        "https://jythg.onrender.com/api/MyStore/CreateOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(finalOrder),
        },
      );
      if (response.status === 401) {
        setAlertInfo({
          show: true,
          message: "يجب تسجيل الدخول أولاً لإتمام الطلب 🔒",
          type: "danger",
        });

        setTimeout(() => {
          setShowLogin(true);
        }, 2000);

        if (cartItems.length === 0) {
          return (
            <>
              <div className="container text-center my-5">
                <h3>🛒 السلة فارغة</h3>
              </div>
            </>
          );
        }

        return;
      }

      const data = await response.json();

      if (response.ok) {
        // 👈 4️⃣ تنبيه النجاح لإتمام الطلب

        clearCart();
        setAlertInfo({
          show: true,
          message: `تم تسجيل طلبك بنجاح في ${selectedCity}! رقم الطلب: #${data.orderId}`,
          type: "success",
        });
      } else {
        // 👈 5️⃣ تنبيه الفشل من السيرفر
        setAlertInfo({
          show: true,
          message: data.message || "فشل في إرسال الطلب، تأكد من البيانات.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("خطأ في الاتصال بالباك إيند:", error);
      // 👈 6️⃣ تنبيه انقطاع السيرفر
      setAlertInfo({
        show: true,
        message: "السيرفر لا يستجيب حالياً. ❌",
        type: "danger",
      });
    }
  };

  if (showLogin) {
    return (
      <>
        <div className="container my-5 py-5 text-center d-flex flex-column align-items-center">
          <Login
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />

          <button
            className="btn btn-dark mt-4"
            onClick={() => setShowLogin(false)}
          >
            ← تراجع والتحق بصفحة الشحن
          </button>
        </div>
      </>
    );
  }

  if (showRegister) {
    return (
      <>
        <div className="container my-5 py-5 text-center d-flex flex-column align-items-center">
          <Register
            onClose={() => setShowRegister(false)}
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="checkout-page position-relative">
        {/* Alert */}

        {alertInfo.show && (
          <div className={`alert alert-${alertInfo.type} checkout-alert`}>
            {alertInfo.type === "success" ? "✅ " : "❌ "}
            {alertInfo.message}
          </div>
        )}

        <div className="container">
          {/* Hero */}

          <section className="checkout-hero">
            <span className="checkout-badge">🔒 عملية شراء آمنة</span>

            <h1>
              إتمام <span>الطلب</span>
            </h1>

            <p>
              أكمل بيانات الشحن الخاصة بك، وسيتم التواصل معك لتأكيد الطلب قبل
              الشحن.
            </p>
          </section>

          <div className="checkout-wrapper" style={{ direction: "rtl" }}>
            {/* =========================
            RIGHT SIDE
      ========================= */}

            <div className="checkout-form">
              <form onSubmit={handleOrderSubmit} className="checkout-card">
                <h3 className="section-title">📦 عنوان الشحن</h3>

                <div className="checkout-grid">
                  {/* الاسم */}

                  <div className="input-group">
                    <label>الاسم الكامل</label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="اكتب اسمك الكامل"
                      required
                    />
                  </div>

                  {/* الجوال */}

                  <div className="input-group">
                    <label>رقم الجوال</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05xxxxxxxx"
                      required
                    />
                  </div>

                  {/* المنطقة */}

                  <div className="input-group">
                    <label>المنطقة</label>

                    <select
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      required
                    >
                      <option value="">اختر المنطقة</option>

                      {Object.keys(locations).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* المدينة */}

                  <div className="input-group">
                    <label>المدينة</label>

                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedRegion}
                      required
                    >
                      <option value="">اختر المدينة</option>

                      {(locations[selectedRegion] || []).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* العنوان */}

                  <div className="input-group full-width">
                    <label>العنوان بالتفصيل</label>

                    <textarea
                      rows="4"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="الحي - الشارع - رقم المبنى"
                      required
                    />
                  </div>
                </div>

                <div className="section-divider"></div>

                <h3 className="section-title">💳 طريقة الدفع</h3>

                <div className="payment-card">
                  <label className="payment-option active">
                    <input type="radio" checked readOnly />

                    <div>
                      <h4>الدفع عند الاستلام</h4>

                      <p>سيتم الدفع نقدًا عند استلام الطلب.</p>
                    </div>
                  </label>
                </div>

                <button type="submit" className="checkout-btn">
                  تأكيد الطلب
                </button>
              </form>
            </div>
          </div>

          {/* =========================
      ORDER SUMMARY
========================= */}

          <div className="checkout-summary">
            <div className="summary-card">
              <h3>ملخص الطلب</h3>

              {cartItems.map((item, index) => (
                <div className="summary-product" key={index}>
                  <img src={item.image} alt={item.title} />

                  <div className="product-info">
                    <h5>{item.title}</h5>

                    <p>اللون: {item.color}</p>

                    <p>نوع الجهاز: {item.device}</p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id, item.color, item.device)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id, item.color, item.device)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.device)
                      }
                    >
                      حذف
                    </button>
                  </div>

                  <strong>{item.price * item.quantity} ر.س</strong>
                </div>
              ))}

              <div className="summary-row">
                <span>الشحن</span>

                <span>{shippingCost} ر.س</span>
              </div>

              <div className="summary-row">
                <span>المجموع</span>
                <strong>{cartTotal + shippingCost} ر.س</strong>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
