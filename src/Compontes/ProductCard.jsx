import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";

import "./Compontes-css/ProductCard.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://storebackend-2-wbm1.onrender.com/api/MyStore/GetProducts",
        );
        setProducts(response.data);
      } catch (error) {
        console.error("في مشكلة بجلب المنتجات:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <>
      <section className="products py-5">
        <div className="container">
          <div className="row g-4">
            {products.map((product) => (
              <div className="col-md-4" key={product.productId}>
                <div className="card shadow-sm h-100">
                  <img
                    src={product.productImage}
                    className="card-img-top"
                    alt={product.productName}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold">
                        {product.productName}
                      </h5>
                      <p className="card-text text-muted">
                        سماعة أو شاحن بجودة عالية
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="fw-bold text-success fs-5">
                        Price: ${product.productPrice}
                      </p>

                      <button
                        className="btn btn-dark w-100"
                        onClick={() =>
                          addToCart({
                            id: product.productId,
                            title: product.productName,
                            price: product.productPrice,
                            image: "https://picsum.photos/400/300?1",
                          })
                        }
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
