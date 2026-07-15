import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedProductCard() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    GetFeaturedProducts();
  }, []);

  async function GetFeaturedProducts() {
    try {
      const response = await axios.get(
        "https://localhost:7158/api/FeaturedProducts",
      );

      setFeaturedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="featured-products">
      {featuredProducts.map((product) => (
        <div className="featured-card" key={product.id}>
          <div className="featured-badge">🔥 Best Seller</div>

          <button className="favorite-btn">🤍</button>

          <img src={product.imageUrl} alt={product.name} />

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <div className="featured-rating">
            ⭐⭐⭐⭐⭐
            <span>{product.rating}</span>
            <span>({product.reviewCount} Reviews)</span>
          </div>

          <div className="featured-price">
            <span className="old-price">{product.oldPrice} SAR</span>

            <span className="new-price">{product.price} SAR</span>
          </div>

          <button>Buy Now</button>
        </div>
      ))}
    </section>
  );
}
