import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link, useHistory } from "react-router-dom";
import { addToCart } from "../api/cart";
import { getProducts } from "../api/products";
import { storeToken, storeUserName, storeUserId, getUserId } from "../auth";

export default function Products(props) {
  const { products, setProducts, setProductId } = props;
  const [quantity, setQuantity] = useState(0);
  let history = useHistory();

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
                          placeholder="1"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={(event) => {
                            setQuantity(event.target.value);
                          }}
                        ></input>

                        <button
                          className="addToCart-button"
                          onClick={async (event) => {
                            event.preventDefault();
                            try {
                              const userId = getUserId();
                              console.log(quantity)
                              const ADDTOCART = await addToCart(
                                id,
                                userId,
                                quantity
                              );
                              console.log(ADDTOCART, "front end ");
                              history.push("/cart");
                            } catch (error) {}
                          }}
                        >
                          Add To Cart
                        </button>
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
