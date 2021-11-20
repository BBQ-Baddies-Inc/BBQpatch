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
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          const {name, price, description, photos } = product;
          return (
            <li key={product.id}>
              <h2>{name}</h2>
              <p>{price}</p>
              <p>{description}</p>
              <a href={photos}></a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
