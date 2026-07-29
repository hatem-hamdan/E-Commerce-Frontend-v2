import "./Hero.css";

import { Link } from "react-router-dom";

import {
  FaBolt,
  FaBatteryHalf,
  FaFeatherAlt,
  FaShieldAlt,
  FaShoppingCart,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        {/*==========================
              LEFT CONTENT
        ==========================*/}

        <div className="hero-content">
          <div className="hero-badge">🔥 الأكثر مبيعًا</div>

          <h1 className="hero-title">
            طاقة صغيرة...
            <br />
            <span>أداء كبير</span>
          </h1>

          <p className="hero-description">
            شاحن محمول صغير الحجم مقدم لتجربة شحن سريعة، متوافق مع أجهزة iPhone
            و Android ليبقى جهازك جاهزًا أينما كنت.
          </p>

          <button className="buy-btn">
            <FaShoppingCart />

            <Link to="/MainProdect" className="hero-btn">
              اطلب الآن
            </Link>
          </button>

          <div className="hero-features">
            <div className="feature-item">
              <FaBolt className="feature-icon" />
              <h4>شحن سريع</h4>
              <span>20W PD</span>
            </div>

            <div className="feature-item">
              <FaBatteryHalf className="feature-icon" />
              <h4>بطارية احترافية</h4>
              <span>2000 / 4000 mAh</span>
            </div>

            <div className="feature-item">
              <FaFeatherAlt className="feature-icon" />
              <h4>خفيف الوزن</h4>
              <span>70 جرام</span>
            </div>

            <div className="feature-item">
              <FaShieldAlt className="feature-icon" />
              <h4>حماية ذكية</h4>
              <span>شحن آمن</span>
            </div>
          </div>
        </div>

        {/*==========================
              PRODUCT IMAGE
        ==========================*/}

        <div className="hero-image">
          <div className="hero-circle"></div>

          <div className="hero-light left"></div>

          <div className="hero-light right"></div>

          <div className="hero-platform"></div>

          <img src="/aa.png" alt="Mini Power Bank" className="hero-product" />
        </div>

        {/*==========================
              RIGHT SPECS
        ==========================*/}

        <div className="hero-specs">
          <div className="spec-item">
            <div className="spec-icon">⚡</div>

            <div className="spec-info">
              <h4>20W PD</h4>
              <span>شحن سريع</span>
            </div>
          </div>

          <div className="spec-item">
            <div className="spec-icon">🔋</div>

            <div className="spec-info">
              <h4>2000 / 4000</h4>
              <span>سعة البطارية</span>
            </div>
          </div>

          <div className="spec-item">
            <div className="spec-icon">⚖️</div>

            <div className="spec-info">
              <h4>70g</h4>
              <span>خفيف الوزن</span>
            </div>
          </div>

          <div className="spec-item">
            <div className="spec-icon">🛡️</div>

            <div className="spec-info">
              <h4>حماية ذكية</h4>
              <span>حماية متعددة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
