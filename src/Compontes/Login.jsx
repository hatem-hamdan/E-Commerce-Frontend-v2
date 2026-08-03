import { useState, useEffect } from "react";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

export function Login({
  onClose,
  onSwitchToRegister,
  setUser,
  setShowAccountMenu,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForget, setShowForget] = useState(false);

  // 1️⃣ حقيبة التنبيهة
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // 2️⃣ مؤقت الإخفاء التلقائي بعد 3 ثوانٍ
  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertInfo.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7078/api/MyStore/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // 🟢 جلب بيانات المستخدم الحالي
        const currentUser = await axios.get(
          "https://localhost:7078/api/MyStore/GetCurrentUser",
          {
            withCredentials: true,
          },
        );

        // 🟢 تحديث user داخل Header
        setUser(currentUser.data);

        // 🟢 تنبيه النجاح
        setAlertInfo({
          show: true,
          message: "تم تسجيل الدخول بنجاح! 🔑",
          type: "success",
        });

        setTimeout(() => {
          // 🟢 إغلاق اللوقين
          if (onClose) onClose();

          // 🟢 فتح كارد الحساب
          setShowAccountMenu(true);
        }, 1000);
      } else {
        // 🔴 خطأ تسجيل الدخول
        setAlertInfo({
          show: true,
          message: result.message || "خطأ في تسجيل الدخول ❌",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الاتصال بالسيرفر:", error);

      // 🔴 السيرفر طافي
      setAlertInfo({
        show: true,
        message: "السيرفر طافي أو غير قادر على الاتصال! ❌",
        type: "danger",
      });
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="card shadow p-4 position-relative"
        style={{ width: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* التنبيه */}
        {alertInfo.show && (
          <div
            className={`alert alert-${alertInfo.type} text-center shadow-sm position-absolute top-0 start-50 translate-middle-x w-100`}
            style={{ zIndex: 1100, borderRadius: "0 0 8px 8px" }}
          >
            {alertInfo.type === "success" ? "✅ " : "❌ "}
            {alertInfo.message}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0 fw-bold">تسجيل الدخول</h4>

          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-end" style={{ direction: "rtl" }}>
            <label className="form-label">البريد الإلكتروني</label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 text-end" style={{ direction: "rtl" }}>
            <label className="form-label">كلمة المرور</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2">
            دخول
          </button>
        </form>

        <p className="text-center mt-3 small text-muted">
          ليس لديك حساب؟{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={onSwitchToRegister}
          >
            أنشئ حساباً الآن
          </span>
        </p>

        <p className="text-center mt-3 small text-muted">
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => setShowForget(true)}
          >
            نسيت كلمة السر
          </span>
        </p>
      </div>

      {showForget && <ForgotPassword onClose={() => setShowForget(false)} />}
    </div>
  );
}
