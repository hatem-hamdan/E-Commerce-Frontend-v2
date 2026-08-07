import "./Footer.css";

import {
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
  FaTiktok,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

function Footer() {
  return (
    <>
      <div className="footer-divider"></div>

      <footer className="footer">
        <div className="footer-container">
          {/* Left */}

          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">N</div>

              <div>
                <h2>NexuvoSaudi</h2>

                <p>
                  حلول ذكية وإكسسوارات عملية تجعل استخدام أجهزتك أسهل كل يوم.
                  <br />
                  جودة تستحق الثقة.
                </p>
              </div>
            </div>

            <div className="footer-social">
              <a href="https://wa.me/966562429556?text=السلام عليكم، أرغب بطلب الشاحن.">
                <FaWhatsapp />
              </a>

              <a href="https://www.tiktok.com/@noew.19">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Center */}

          <div className="footer-links">
            <h3>روابط سريعة</h3>

            <a href="#">الرئيسية</a>

            <a href="#">المنتجات</a>

            <a href="#">الأسئلة الشائعة</a>

            <a href="#">تواصل معنا</a>
          </div>

          {/* Right */}

          <div className="footer-contact">
            <h3>تواصل معنا</h3>

            <p>
              <FaPhone />

              <span>+966 56 295 6209</span>
            </p>

            <p>
              <FaEnvelope />

              <span>hatemhamdan392@gmail.com</span>
            </p>

            <p>
              <FaLocationDot />

              <span>المملكة العربية السعودية</span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 NexuvoSaudi. جميع الحقوق محفوظة.
        </div>
      </footer>
    </>
  );
}

export default Footer;
