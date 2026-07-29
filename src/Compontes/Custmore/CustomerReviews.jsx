import { useState } from "react";
import "./CustomerReviews.css";
import { reviews } from "./reviewsData";

import { FaStar, FaUserCircle, FaFemale } from "react-icons/fa";

import { HiMiniUserCircle } from "react-icons/hi2";

export function CustomerReviews() {
  const [visibleReviews, setVisibleReviews] = useState(6);

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 6);
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        {/* Header */}

        <div className="reviews-header">
          <span className="reviews-badge">⭐ أكثر من 2000 تقييم</span>

          <h2>آراء العملاء</h2>

          <p>تعرف على تجربة عملائنا مع المنتج.</p>
        </div>

        {/* Summary */}

        <div className="reviews-summary">
          <div className="summary-score">
            <h1>4.9</h1>

            <div className="summary-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <span>2048 تقييم</span>
          </div>
        </div>

        {/* Reviews */}

        <div className="reviews-grid">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-top">
                {review.gender === "male" ? (
                  <HiMiniUserCircle className="avatar" />
                ) : (
                  <HiMiniUserCircle className="avatar" />
                )}

                <div>
                  <h4>{review.name}</h4>

                  <span>✔ شراء موثق • {review.date}</span>
                </div>
              </div>

              <div className="review-stars">
                {[...Array(review.stars)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Button */}

        {visibleReviews < reviews.length && (
          <div className="reviews-btn-box">
            <button className="reviews-btn" onClick={loadMore}>
              عرض المزيد ({reviews.length - visibleReviews})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
