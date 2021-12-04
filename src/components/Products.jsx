import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";

export default function Products(props) {
  const { products, setProducts, setProductId } = props;

  const fetchAllProducts = async () => {
    const allProducts = await getProducts();
    console.log(allProducts);
    setProducts(allProducts);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  //   console.log(allProducts)
  console.log(products);
  return (
    <div>
      <h1 className="title montserrat-semi-bold-white-36px">Products</h1>
      <div className="products_page">
        <div className="card_positions">
          {products && products.length
            ? products.map((product) => {
                const { name, price, description, photo, id } = product;
                return (
                  <Card key={`${name}:${id}`} style={{ width: "20rem" }}>
                   <Link onClick={(event)=>{
                     setProductId(id);
                   }} to={`/product/${id}`}> <Card.Img src={photo} style={{ width: "17rem" }} /> </Link>
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                      <Card.Text>{price}</Card.Text>
                      {/* <Button variant="primary">Add to Cart</Button> */}
                      <form className="productButtons">
                        <input
                          type="number"
                        placeholder = "1"
                          min="1"
                          max="10"
                        ></input>
                        <Link to={`/cart`}>
                          <button className="addToCart-button"
                  onClick={(event) => {
                    setProductId("");
                    setProductId(id);
                  }}>Add To Cart</button>
                        </Link>
                      </form>
                    </Card.Body>
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
