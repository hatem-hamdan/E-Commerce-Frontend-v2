import { useState } from "react";
import ResetPassword from "./ResetPassword.jsx";

export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showReset, setShowReset] = useState(false); //

  const handleFirstSubmit = (e) => {
    e.preventDefault();
    if (!email || !newPassword) return alert("الرجاء تعبئة جميع الحقول");

    console.log("تم إرسال الكود إلى:", email);

    setShowReset(true);
  };

  const handleFinalSubmit = (code) => {
    const dataToSend = {
      email: email,
      newPassword: newPassword,
      otpCode: code,
    };

    console.log("جاري إرسال البيانات كاملة للسيرفر:", dataToSend);
    alert("تم تغيير كلمة السر بنجاح!");
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
      onClick={onClose} // يضغط برا يقفل كل شيء
    >
      <div
        className="card p-4"
        style={{ width: "400px" }}
        onClick={(e) => e.stopPropagation()} // يمنع الإغلاق لو ضغط داخل الكارد
      >
        <h3 className="text-center mb-4">استعادة كلمة السر</h3>

        <form onSubmit={handleFirstSubmit}>
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

          <div className="mb-3">
            <label className="form-label">كلمة السر الجديدة</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            إرسال كود التحقق
          </button>
        </form>
      </div>

      {showReset && (
        <ResetPassword
          onClose={() => setShowReset(false)}
          onConfirm={handleFinalSubmit} //
        />
      )}
    </div>
  );
}
