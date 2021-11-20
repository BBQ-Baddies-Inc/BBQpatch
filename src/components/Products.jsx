import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
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
    <div className="products_page">
      <h1>Products</h1>
      <div className="card_positions">
        {products.map((product) => {
          const { name, price, description, photos } = product;
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
                <form>
                  <input
                    type="number"
                    // placeholder=“quantity-of-products”
                    min="1"
                    max="10"
                  ></input>
                  <Link to={`/cart`}>
                    <button>Add To Cart</button>
                  </Link>
                </form>
              </Card.Body>
            </Card>
            // <div className="card" key={product.id}>
            //   <h2>{name}</h2>
            //   <p>{price}</p>
            //   <p>{description}</p>
            //   <a href={photos}></a>
            // </div>
          );
        })}
      </div>
    </div>
  );
}
