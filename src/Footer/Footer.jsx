import "./Footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-section">
          <h3>من نحن</h3>

          <img src="/logo.png" alt="MyStore Logo" width="80" />

          <p>
            MyStore متجر إلكتروني متخصص في بيع الإلكترونيات والإكسسوارات بأفضل
            الأسعار مع شحن سريع داخل المملكة.
          </p>
        </div>

        <div className="footer-section">
          <h3>روابط سريعة</h3>

          <ul>
            <li>الرئيسية</li>
            <li>المنتجات</li>
            <li>طلباتي</li>
            <li>سياسة الخصوصية</li>
            <li>الشروط والأحكام</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>خدمة العملاء</h3>

          <ul>
            <li>الأسئلة الشائعة</li>
            <li>سياسة الاسترجاع</li>
            <li>طرق الدفع</li>
            <li>تواصل معنا</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>معلومات المتجر</h3>

          <p>📍 الرياض - المملكة العربية السعودية</p>
          <p>📞 +966 56 242 9556</p>
          <p>✉️ support@mystore.com</p>

          <img
            src="/commercial-register.png"
            alt="Commercial Register"
            width="120"
          />

          <p>السجل التجاري: قريبا</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 MyStore. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
}
