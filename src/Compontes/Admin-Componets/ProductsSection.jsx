import { useState, useEffect } from "react";

export function ProductsSection() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "https://fafafaf-gydf.onrender.com/api/MyStore/GetProducts",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed To Load Products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (productId) => {
    console.log("DELETE PRODUCT:", productId);

    setProducts(products.filter((p) => p.productId !== productId));
  };

  const handleEdit = (product) => {
    console.log(product);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>

        {/* ADD PRODUCT */}
        <button className="btn btn-success">Add Product</button>
      </div>

      {/* SEARCH */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>

              <td>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  width="60"
                  height="60"
                  className="rounded"
                />
              </td>

              <td>{product.productName}</td>

              <td>{product.productPrice} SAR</td>

              <td>{product.stock}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.productId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
