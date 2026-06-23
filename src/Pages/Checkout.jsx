import { useState } from "react";
import { locations } from "../Compontes/locations"; // استيراد ملف المناطق
import { Header } from "../header/Header";
import { useCart } from "../Compontes/CartContext"; // استيراد الكونتيكست
import { Login } from "../Compontes/Login";

export function Checkout() {
  const { cartItems } = useCart(); // سحب المنتجات الحقيقية من السلة

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
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
      FullName: formData.fullName,
      PhoneNumber: formData.phone,
      Region: selectedRegion,
      City: selectedCity,
      AddressLine: formData.address,
      Items: cartItems.map((item) => ({
        ProductId: item.id,
        Quantity: item.quantity || 1,
        Price: item.price,
      })),
    };

    try {
      // 2. إرسال الطلب مع تمرير الـ Authorization Header
      const response = await fetch(
        "https://hatemhamdan-001-site1.jtempurl.com/api/MyStore/CreateOrder",
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

        return;
      }

      const data = await response.json();

      if (response.ok) {
        // 👈 4️⃣ تنبيه النجاح لإتمام الطلب
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
        <Header />
        <div className="container my-5 py-5 text-center d-flex flex-column align-items-center">
          <Login onClose={() => setShowLogin(false)} />
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

  return (
    <>
      <Header />

      <div className="container my-5 py-5 position-relative">
        {/* 👈 7️⃣ عرض التنبيه الطائر في الشيك أوت فوق المحتوى مباشرة وتلاشيه تلقائي */}
        {alertInfo.show && (
          <div
            className={`alert alert-${alertInfo.type} text-center shadow position-fixed top-0 start-50 translate-middle-x mt-4`}
            style={{ zIndex: 9999, minWidth: "350px", direction: "rtl" }}
          >
            {alertInfo.type === "success" ? "✅ " : "❌ "}
            {alertInfo.message}
          </div>
        )}

        <h2 className="mb-4 fw-bold text-end">إتمام عملية الشراء</h2>

        <div className="row g-5 text-end" style={{ direction: "rtl" }}>
          {/* العمود الأيمن: بيانات الشحن والدفع */}
          <div className="col-lg-8">
            <form onSubmit={handleOrderSubmit} className="card shadow-sm p-4">
              <h4 className="mb-3 fw-bold text-secondary">1. عنوان الشحن</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label">الاسم الكامل</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">رقم الجوال</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">العنوان (الحي / الشارع)</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* كومبو المنطقة */}
                <div className="col-md-4">
                  <label className="form-label">المنطقة</label>
                  <select
                    className="form-select"
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    required
                  >
                    <option value="">اختر المنطقة...</option>
                    {Object.keys(locations).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* كومبو المدينة */}
                <div className="col-md-4">
                  <label className="form-label">المدينة / المحافظة</label>
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    required
                    disabled={!selectedRegion}
                  >
                    <option value="">اختر المدينة...</option>
                    {(locations[selectedRegion] || []).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <hr />

              <h4 className="my-3 fw-bold text-secondary">2. تفاصيل الدفع</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label">رقم البطاقة</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="form-control"
                    placeholder="1234 5678 9101 1121"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">تاريخ الانتهاء</label>
                  <input
                    type="text"
                    name="expiry"
                    className="form-control"
                    placeholder="MM/YY"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">رمز الـ CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    className="form-control"
                    placeholder="123"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-dark btn-lg w-100 mt-3">
                تأكيد الطلب والدفع
              </button>
            </form>
          </div>

          {/* العمود الأيسر: ملخص المنتجات */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-4 bg-light">
              <h4 className="mb-4 fw-bold text-secondary">ملخص السلة</h4>

              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-3 pb-3 border-bottom"
                >
                  <img
                    src={item.image}
                    className="rounded ms-3"
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1 text-start ms-2">
                    <h6 className="m-0 fw-bold">{item.title}</h6>
                    <small className="text-muted">الكمية: 1</small>
                  </div>
                  <span className="fw-bold">${item.price}</span>
                </div>
              ))}

              <div className="d-flex justify-content-between mb-2 mt-4">
                <span>المجموع الفرعي:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>الشحن:</span>
                <span className="text-success">مجاني</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2 fw-bold fs-5">
                <span>الإجمالي العام:</span>
                <span className="text-danger">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
