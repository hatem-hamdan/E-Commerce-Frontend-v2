import "./Hero2.css";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";

function Hero() {
  return (
    <>
      <Banner />
      <section className="hero">
        <div className="hero-container">
          {/* Product */}
          <div className="hero-image-wrapper">
            <div className="hero-glow"></div>

            <div className="hero-light left"></div>
            <div className="hero-light right"></div>

            <div className="hero-platform"></div>

            <div className="hero-image">
              <img src="/45.png" alt="Power Bank" className="product-image" />
            </div>
          </div>




          {/* Content */}
          <div className="hero-content">
            <div className="hero-badge">🔥 الأكثر مبيعًا</div>

            <h1 className="hero-title">
              شاحن طوارئ
              <span> بحجم ميدالية مفاتيح</span>
            </h1>

            <p className="hero-description">
              شاحن طوارئ صغير بحجم ميدالية مفاتيح، يكون معك دائمًا ويمنح هاتفك
              شحنة سريعة وقت الحاجة.
            </p>

            <Link to="/MainProdect" className="hero-btn">
              اطلب الآن
            </Link>

            <div className="hero-features">
              <div className="feature-card">
                ⚡<span>1500mAh</span>
              </div>

              <div className="feature-card">
                🔌
                <span>Type-C + iPhone</span>
              </div>

              <div className="feature-card">
                🛡️
                <span>حماية ذكية</span>
              </div>

              <div className="feature-card">
                🔑
                <span>صغير وخفيف</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
