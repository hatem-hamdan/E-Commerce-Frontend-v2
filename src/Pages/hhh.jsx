import { useState } from "react";
import "./MainProdect.css"; // تأكد من وجود ملف الـ CSS
import { CustomerReviews } from "../Compontes/Custmore/CustomerReviews";

import { useCart } from "../Compontes/CartContext";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { Login } from "../Compontes/Login";

const MainProdect = () => {
  // حالات التفاعل (States) للخيارات الجديدة

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const [selectedColor, setSelectedColor] = useState("أسود");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const images = ["image_0.png", "aa.png", "charger1.png", "Charger3.png"];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleBuyNow = async () => {
    try {
      const response = await fetch(
        "https://storebackend-2-wbm1.onrender.com/api/MyStore/GetCurrentUser",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        toast.error("يجب تسجيل الدخول أولاً");

        setTimeout(() => {
          setShowLogin(true);
        }, 1000);

        return;
      }

      if (!response.ok) {
        toast.error("حدث خطأ أثناء التحقق من تسجيل الدخول");
        return;
      }

      addToCart({
        id: 1,
        title: "شاحن محمول صغير",
        image: "white.png",
        price: 89,
        color: selectedColor,
        quantity: quantity,
      });

      navigate("/checkout");
    } catch {
      toast.error("تعذر الاتصال بالسيرفر");
    }
  };

  if (showLogin) {
    return (
      <div className="container my-5">
        <Login onClose={() => setShowLogin(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="main-product-container">
          {/* القسم الأيسر: المعلومات */}
          <div className="product-info-section">
            <div className="category-breadcrumb">Mini Power Bank</div>
            <h1 className="product-title">شاحن محمول صغير</h1>

            <a href="#reviews" className="rating-container">
              <span className="stars">★★★★★</span>
              <span className="rating-count">4.8 (2000+ تقييم)</span>
            </a>

            <p className="product-description">
              شاحن محمول صغير الحجم، سريع الشحن، متوافق مع أجهزة iPhone و
              Android. مثالي للاستخدام اليومي والتنقل.
            </p>

            <div className="price-section">
              <span className="final-price">89 ر.س</span>
              <span className="original-price">129 ر.س</span>
              <span className="discount-tag">خصم 31%</span>
            </div>

            {/* الأيقونات الأربعة الصغيرة */}
            <div className="features-icons">
              {[
                { icon: "⚡", text: "شحن سريع" },
                { icon: "🔌", text: "منفذ Type-C" },
                { icon: "🛡️", text: "حماية متعددة" },
                { icon: "🪶", text: "خفيف الوزن" },
              ].map((item, index) => (
                <div key={index} className="feature-item">
                  <span className="icon">{item.icon}</span>
                  <span className="text">{item.text}</span>
                </div>
              ))}
            </div>

            {/* ***** القسم الجديد: اختيار اللون (كما طلبت) ***** */}
            <div className="selection-container">
              <h3>اختر اللون:</h3>
              <div className="options-grid">
                {["أسود", "أبيض"].map((col) => (
                  <button
                    key={col}
                    className={`select-btn ${selectedColor === col ? "active" : ""}`}
                    onClick={() => setSelectedColor(col)}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-container">
              <h3>الكمية:</h3>

              <div className="quantity-box">
                <button
                  className="qty-btn"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>

                <span className="qty-number">{quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* أزرار الشراء */}
            <div className="action-buttons">
              <button
                className="btn-primary"
                onClick={() => {
                  addToCart({
                    id: 1,
                    title: "شاحن محمول صغير",
                    image: "white.png",
                    price: 89,
                    color: selectedColor,
                    quantity: quantity,
                  });

                  toast.success("تمت إضافة المنتج إلى السلة 🛒");
                }}
              >
                إضافة إلى السلة
              </button>

              <button className="btn-secondary" onClick={handleBuyNow}>
                اشتري الآن
              </button>
            </div>

            {/* معلومات إضافية */}
            <div className="extra-info-bar">
              <div>🌐 عالمي</div>
              <div>🚚 شحن خلال 3-5 أيام</div>
              <div>🛡️ ضمان 24/7</div>
            </div>
          </div>

          {/* القسم الأيمن: الصور */}
          <div className="product-gallery-section">
            <div className="badge-top-right">الأكثر مبيعاً 🔥</div>
            <div className="main-image-container">
              <img src={selectedImage} alt="شاحن محمول" />

              <div className="wattage-tag">20W</div>
            </div>
            <div className="thumbnails-container">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`صورة ${index + 1}`}
                  className={selectedImage === img ? "active" : ""}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className="gallery-footer-badges">
              <span>✓ تصميم أنيق ومتين</span>
              <span>✓ بطارية عالية الجودة</span>
              <span>✓ iPhone & Android</span>
            </div>
          </div>
        </div>

        {/* قسم المواصفات والوصف (الأسفل) */}
        <div className="details-footer-container">
          <div className="specs-column">
            <h2>المواصفات</h2>
            {[
              { label: "السعة", value: "4000mAh" }, // السعة تتغير حسب الاختيار
              { label: "نوع البطارية", value: "Lithium Polymer" },
              { label: "المدخل", value: "Type-C (5V/2A)" },
              { label: "المخرج", value: "Type-C (5V/2A)" },
              { label: "القدرة", value: "20W Max" },
              { label: "الوزن", value: "70 جرام" },
              { label: "الأبعاد", value: "7 × 5 × 1.8 سم" },
              { label: "الضمان", value: "12 شهر" },
            ].map((spec) => (
              <div key={spec.label} className="spec-row">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="description-column">
            <h2>الوصف</h2>
            <p>شاحن محمول صغير الحجم يمكنك حمله معك أينما ذهبت.</p>
            <p>يدعم الشحن السريع بقوة 20W لتجربة شحن فعالة وآمنة.</p>
            <p>مصمم بجودة عالية مع حماية متعددة ضد الشحن الزائد والحرارة.</p>
            <p>مثالي للاستخدام اليومي والسفر.</p>
            <div className="description-icons">
              <span>⏱️ شحن سريع 20W PD</span>
              <span>🛡️ حماية من الشحن الزائد</span>
              <span>⚡ حماية من القصر الكهربائي</span>
              <span>🌡️ درجة حرارة آمنة</span>
            </div>
          </div>
        </div>

        <CustomerReviews />
      </div>
    </>
  );
};

export default MainProdect;
