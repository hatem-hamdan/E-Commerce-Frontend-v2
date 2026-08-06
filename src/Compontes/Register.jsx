import { useState, useEffect } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
// onSwitchToLogin هنا في الـ Props فوق 🎯
export function Register({ onClose, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "success",
  });

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

    const registerData = {
      Username: name,
      Email: email,
      Password: password,
    };

    try {
      setLoading(true);

      await new Promise((resolve) => requestAnimationFrame(resolve));
      const response = await fetch(
        "https://jythg.onrender.com/api/MyStore/Users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setAlertInfo({
          show: true,
          message: "تم إنشاء حسابك بنجاح",
          type: "success",
        });

        setTimeout(() => {
          onSwitchToLogin();
        }, 1000);
      } else {
        setAlertInfo({
          show: true,
          message: result.message || "تأكد من البيانات المدخلة",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error during register:", error);

      setAlertInfo({
        show: true,
        message: "حدث خطأ في الاتصال بالسيرفر",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        onClick={() => {
          if (!loading) onClose();
        }}
      >
        <div
          className="card shadow-lg border-0 p-4 position-relative"
          style={{
            width: "430px",
            borderRadius: "18px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {alertInfo.show && (
            <div
              className={`alert alert-${alertInfo.type} text-center shadow-sm position-absolute top-0 start-50 translate-middle-x w-100`}
              style={{
                zIndex: 1100,
                borderRadius: "18px 18px 0 0",
              }}
            >
              {alertInfo.type === "success" ? "✅ " : "❌ "}
              {alertInfo.message}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="m-0 fw-bold">إنشاء حساب جديد</h4>

            <button
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">الاسم الكامل</label>

              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">البريد الإلكتروني</label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">كلمة المرور</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2"
              disabled={loading}
            >
              {loading ? "جاري التسجيل..." : "تسجيل الحساب"}
            </button>
          </form>

          <p className="text-center mt-3 small text-muted">
            لديك حساب بالفعل؟{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                if (!loading) onSwitchToLogin();
              }}
            >
              تسجيل الدخول
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
