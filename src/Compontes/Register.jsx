import { useState } from "react";

//  onSwitchToLogin هنا في الـ Props فوق 🎯
export function Register({ onClose, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. تجميع البيانات من الـ State
    const registerData = {
      Username: name,
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch(
        "https://fafafaf-gydf.onrender.com/api/MyStore/Users",
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
        alert("تم إنشاء الحساب بنجاح يا بطل! يمكنك تسجيل الدخول الآن.");

        onSwitchToLogin();
      } else {
        alert(
          "فشل إنشاء الحساب: " + (result.message || "تأكد من البيانات المدخلة"),
        );
      }
    } catch (error) {
      console.error("Error during register:", error);
      alert("حدث خطأ في الاتصال بالسيرفر، تأكد أن الباك إيند يعمل!");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0 fw-bold">إنشاء حساب جديد</h4>
          <button className="btn-close" onClick={onClose}></button>
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

          <button type="submit" className="btn btn-dark w-100 py-2">
            تسجيل الحساب
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
            onClick={onSwitchToLogin}
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </div>
  );
}
