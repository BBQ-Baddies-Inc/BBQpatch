import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { getCart } from "../api/cart";
import { getUserId } from "../auth";


export default function Cart(props) {
  const { setProductId } = props;
  const [cart, setCart] = useState([]);
  console.log("5");

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();
      const cart = await getCart(userId);

      const itemsSeen = {}
      for(let i=0; i < cart.length; i++){
          
if (itemsSeen[cart[i].productId]){
    itemsSeen[cart[i].productId].quantity += cart[i].quantity
} else {
    itemsSeen[cart[i].productId] = cart[i]
}
      }
      setCart(Object.values(itemsSeen));
      
    }
    fetchData();
  }, []);
  console.log(cart, "cart");
  return (
    <div className="container-center-horizontal">
      <div className="cart screen">
        <h1 className="title montserrat-semi-bold-white-36px">Cart</h1>
        <Link className="buyNow-button" onClick={(event) => {}}
                      to={`/checkout`}
                    > Buy Now </Link>
        <div className="flex-row">
          <div className="overlap-group">
            <img
              className="vector"
              src="https://anima-uploads.s3.amazonaws.com/projects/61a27368a28b3fe153421fed/releases/61a5930edd0b318d6e94a1bf/img/vector@1x.svg"
              alt="mustard"
            />
            <img
              className="vector-1"
              src="https://anima-uploads.s3.amazonaws.com/projects/61a27368a28b3fe153421fed/releases/61a5930edd0b318d6e94a1bf/img/vector-1@1x.svg"
              alt="ketchup"
            />
            <div className="group-26">
              {cart.map((item) => {
                  const {name, productId, photo, description, price, quantity} = item
                return (
                    <div className="cart-product" key={`${name}:${productId}`} style={{ width: "18rem" }}>
                    <Link
                      onClick={(event) => {
                        setProductId(productId);
                      }}
                      to={`/product/${productId}`}
                    >
                      {" "}
                      <img src={photo} />{" "}
                    </Link>
                    <div>
                      <h2 className="cart-name">{name}</h2>
                      <p className="cart-description">{description}</p>
                      <p className="cart-price">{price}</p>
                      <p className="cart-quanity">Quantity: {quantity}</p>
                      <button
                          className="cart-button"
                          onClick={async (event) => {
                            event.preventDefault();
                            try {
                            //   const userId = getUserId();
                            //   console.log(quantity)
                            //   const ADDTOCART = await addToCart(
                            //     id,
                            //     userId,
                            //     quantity
                            //   );
                            //   console.log(ADDTOCART, "front end ");
                            //   history.push("/cart");
                            } catch (error) {
                                console.log(error)
                            }
                          }}
                        >
                          Remove Item
                        </button>
                    </div>
                  </div>
              )
              })}
            </div>
          </div>
          <img
            className="rectangle-4"
            src="https://anima-uploads.s3.amazonaws.com/projects/61a27368a28b3fe153421fed/releases/61a2736d28635064dc202580/img/rectangle-4@2x.svg"
            alt="blank"
          />
        </div>
      </div>
    </div>
  );
}
