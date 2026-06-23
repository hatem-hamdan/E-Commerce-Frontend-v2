import { useEffect } from "react";

export function ActionAlert({ message, type = "success", onClose }) {
  useEffect(() => {
    // يختفي التنبيه تلقائياً بعد 3 ثوانٍ
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`alert alert-${type} text-center shadow-sm position-fixed top-0 start-50 translate-middle-x mt-4`}
      style={{ zIndex: 9999, minWidth: "300px", direction: "rtl" }}
    >
      {type === "success" ? "✅ " : "❌ "}
      {message}
    </div>
  );
}
