import { useState } from "react";
import "./MainProdect.css"; // تأكد من وجود ملف الـ CSS
import { CustomerReviews } from "../Compontes/Custmore/CustomerReviews";

import { useCart } from "../Compontes/CartContext";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { Login } from "../Compontes/Login";

import { useSwipeable } from "react-swipeable";

const MainProdect = () => {
  // حالات التفاعل (States) للخيارات الجديدة

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const [selectedColor, setSelectedColor] = useState("أسود");
  const [quantity, setQuantity] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState("iPhone");

  const { addToCart } = useCart();

  const media = [
    { type: "image", src: "t1.png" },
    { type: "image", src: "t2.png" },
    { type: "image", src: "t3.png" },
    { type: "image", src: "t4.png" },

    { type: "image", src: "Charger3.png" },
    { type: "video", src: "nq4y7v-h264-hd.mp4" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedMedia = media[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  // إعداد اللمس (Swipe)
  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleBuyNow = async () => {
    try {
      const response = await fetch(
        "https://localhost:7078/api/MyStore/GetCurrentUser",
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

        device: selectedDevice,

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
              لا تدع بطارية هاتفك تنفد في اللحظات المهمة. باور بانك صغير وخفيف
              بتصميم أنيق، سهل الحمل مع مفاتيحك أو حقيبتك، وجاهز لشحن هاتفك في
              أي وقت.
            </p>

            <div className="price-section">
              <span className="final-price">50 ر.س</span>
              <span className="original-price">99 ر.س</span>
              <span className="discount-tag">خصم 49%</span>
            </div>

            {/* الأيقونات الأربعة الصغيرة */}
            <div className="features-icons">
              {[
                { icon: "⚡", text: "جاهز وقت الحاجة" },
                { icon: "🔌", text: "يدعم iPhone و Android" },
                { icon: "🛡️", text: "حماية متعددة" },
                { icon: "🎒", text: "خفيف وسهل الحمل" },
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
                {["أسود", "زهري"].map((col) => (
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
              <h3>اختر نوع الجهاز:</h3>

              <div className="options-grid">
                {["iPhone", "Android"].map((device) => (
                  <button
                    key={device}
                    className={`select-btn ${
                      selectedDevice === device ? "active" : ""
                    }`}
                    onClick={() => setSelectedDevice(device)}
                  >
                    {device}
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
                    image: selectedColor === "أسود" ? "K1.png" : "K2.png",
                    price: 50,
                    color: selectedColor,

                    device: selectedDevice,
                    quantity: quantity,
                  });

                  toast.success("تمت إضافة المنتج إلى السلة 🛒");
                }}
              >
                إضافة إلى السلة
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/checkout")}
              >
                اذهب إلى السلة
              </button>
            </div>

            {/* معلومات إضافية */}
            <div className="extra-info-bar">
              <div>🌐 عالمي</div>
              <div>🚚 شحن خلال 3-5 أيام</div>
              <div>📱يدعم Type-C و Lightning </div>
            </div>
          </div>

          {/* القسم الأيمن: الصور */}
          <div className="product-gallery-section">
            <div className="badge-top-right">الأكثر مبيعاً 🔥</div>

            <div className="main-image-container" {...handlers}>
              <button className="nav-arrow left" onClick={prevImage}>
                ❮
              </button>

              {selectedMedia.type === "image" ? (
                <img src={selectedMedia.src} alt="شاحن محمول" />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}

              <button className="nav-arrow right" onClick={nextImage}>
                ❯
              </button>
            </div>

            <div className="thumbnails-container">
              {media.map((item, index) =>
                item.type === "image" ? (
                  <img
                    key={index}
                    src={item.src}
                    alt={`صورة ${index + 1}`}
                    className={selectedIndex === index ? "active" : ""}
                    onClick={() => setSelectedIndex(index)}
                  />
                ) : (
                  <video
                    key={index}
                    src={item.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className={selectedIndex === index ? "active" : ""}
                    onClick={() => setSelectedIndex(index)}
                  />
                ),
              )}
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
              { label: "السعة", value: "1500mAh" },
              { label: "نوع البطارية", value: "Lithium Polymer" },
              { label: "منفذ الشحن", value: "USB Type-C" },
              { label: "المنفذ", value: "Type-C أو Lightning (حسب الإصدار)" },
              { label: "الاستخدام", value: "شحن الطوارئ" },
              { label: "التصميم", value: "سلسلة مفاتيح محمولة" },
              { label: "اللون", value: "أسود / وردي" },
            ].map((spec) => (
              <div key={spec.label} className="spec-row">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="description-column">
            <h2>الوصف</h2>
            <p>
              باور بانك صغير الحجم بتصميم أنيق يمكن تعليقه مع مفاتيحك أو حقيبتك.
            </p>
            <p>
              مزود بكيبل مدمج ليمنحك شحنًا سريعًا وسهلًا دون الحاجة لحمل كيابل
              إضافية.
            </p>
            <p>
              مثالي للاستخدام اليومي والطوارئ والسفر، ليبقى هاتفك جاهزًا وقت
              الحاجة.
            </p>
            <p>متوفر بإصدارين لأجهزة iPhone وAndroid.</p>

            <div className="description-icons">
              <span>🔋 سعة 1500mAh</span>
              <span>🔌 كيبل مدمج</span>
              <span>🎒 صغير وخفيف</span>
              <span>📱 يدعم iPhone وAndroid</span>
            </div>
          </div>
        </div>

        <CustomerReviews />
      </div>
    </>
  );
};

export default MainProdect;
