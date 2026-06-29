import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9665XXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
