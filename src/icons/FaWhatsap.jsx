import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/966562956209?text=السلام عليكم، أرغب بطلب الشاحن."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
