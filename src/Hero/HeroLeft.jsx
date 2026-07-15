import {
  FaBolt,
  FaBatteryHalf,
  FaFeatherAlt,
  FaShieldAlt,
  FaShoppingCart,
} from "react-icons/fa";

function HeroLeft() {
  return (
    <div className="hero-left">
      {/* Badge */}
      <div className="hero-badge">🔥 الأكثر مبيعًا</div>

      {/* Title */}
      <h1 className="hero-title">
        طاقة صغيرة...
        <br />
        <span>أداء كبير</span>
      </h1>

      {/* Description */}
      <p className="hero-description">
        شاحن محمول صغير الحجم مقدم لتجربة شحن سريعة، متوافق مع أجهزة iPhone و
        Android لتبقى أجهزتك جاهزة في أي وقت.
      </p>

      {/* Buttons */}
      <div className="hero-buttons">
        <button className="buy-btn">
          <FaShoppingCart />
          <span>اطلب الآن</span>
        </button>
      </div>

      {/* Features */}
      <div className="hero-features">
        <div className="feature-item">
          <FaBolt className="feature-icon" />

          <h4>شحن سريع</h4>

          <span>65W PD</span>
        </div>

        <div className="feature-item">
          <FaBatteryHalf className="feature-icon" />

          <h4>بطارية احترافية</h4>

          <span>سعة عالية</span>
        </div>

        <div className="feature-item">
          <FaFeatherAlt className="feature-icon" />

          <h4>خفيف الوزن</h4>

          <span>سهل الحمل</span>
        </div>

        <div className="feature-item">
          <FaShieldAlt className="feature-icon" />

          <h4>حماية ذكية</h4>

          <span>حماية متعددة</span>
        </div>
      </div>
    </div>
  );
}

export default HeroLeft;
