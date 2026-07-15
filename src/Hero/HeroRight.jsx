import { FaBatteryHalf, FaPlug, FaMobileAlt } from "react-icons/fa";

function HeroRight() {
  return (
    <div className="hero-right">
      {/* Battery */}
      <div className="spec-item">
        <div className="spec-icon">
          <FaBatteryHalf />
        </div>

        <div className="spec-info">
          <h4>2000 / 4000 mAh</h4>
          <span>السعة الفعلية</span>
        </div>
      </div>

      {/* Type-C */}
      <div className="spec-item">
        <div className="spec-icon">
          <FaPlug />
        </div>

        <div className="spec-info">
          <h4>Type-C</h4>
          <span>منفذ حديث</span>
        </div>
      </div>

      {/* Compatibility */}
      <div className="spec-item">
        <div className="spec-icon">
          <FaMobileAlt />
        </div>

        <div className="spec-info">
          <h4>iPhone & Android</h4>
          <span>متوافق مع جميع الأجهزة</span>
        </div>
      </div>
    </div>
  );
}

export default HeroRight;
