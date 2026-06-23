import { useState } from "react";

export default function ResetPassword({ onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("كلمات المرور غير متطابقة!");
      return;
    }
    setError("");
    alert("تم تحديث كلمة المرور بنجاح! 🎉");
    if (onClose) onClose(); // يقفل الشاشة
  };

  return (
    <div
      className="card p-4 shadow-sm"
      style={{ maxWidth: "400px", margin: "20px auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">تعيين كلمة مرور جديدة</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>

      {error && (
        <div className="alert alert-danger text-center p-2 small">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small">كلمة المرور الجديدة</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label small">تأكيد كلمة المرور</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          حفظ وتغيير
        </button>
      </form>
    </div>
  );
}
