import React, { useState, useEffect } from "react";
import { getProducts } from "../api/products";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const allProducts = await getProducts();
    setProducts(allProducts);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
//   console.log(allProducts)
  console.log(products)
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
