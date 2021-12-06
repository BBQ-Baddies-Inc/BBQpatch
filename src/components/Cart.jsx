import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, deleteCartItem } from "../api/cart";
import { getUserId } from "../auth";
import { useHistory } from "react-router";

export default function Cart(props) {
  const { setProductId } = props;
  const [cart, setCart] = useState([]);
  let history = useHistory();
  

  useEffect(() => {
    async function fetchData() {
      const userId = getUserId();
      const cart = await getCart(userId);

      const itemsSeen = {};
      for (let i = 0; i < cart.length; i++) {
        if (itemsSeen[cart[i].productId]) {
          itemsSeen[cart[i].productId].quantity += cart[i].quantity;
        } else {
          itemsSeen[cart[i].productId] = cart[i];
        }
      }
      setCart(Object.values(itemsSeen));
    }
    fetchData();
  }, []);
 
  return (
    <div className="container-center-horizontal">
      <div className="cart screen">
      
      
        <div className="flex-row">
        <div className="cart-title">Cart
      <button
          className="buyNow-button"
          onClick={async (event) => {
            const course = window.confirm("Are you sure you wish to Purchase?");
            if (course) {
              event.preventDefault();
              
              history.push("./checkout");
            }
          }}
        >Buy Now</button></div>
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
                const { name, productId, photo, description, price, quantity } =
                  item;
                return (
                  <div
                    className="cart-product"
                    key={`${name}:${productId}`}
                    style={{ width: "18rem" }}
                  >
                    <Link
                      onClick={(event) => {
                        setProductId(productId);
                      }}
                      to={`/product/${productId}`}
                    >
                      {" "}
                      <img className="cart-photo" src={photo} />{" "}
                    </Link>
                    <div className="cart-info">
                      <h2 className="cart-name">{name}</h2>
                      <p className="cart-description">{description}</p>
                      <p className="cart-price">{price}</p>
                      <p className="cart-quanity">Quantity: {quantity}</p>
                      <button
                        className="cart-button"
                        onClick={async (event) => {
                          const course = window.confirm(
                            "Are you sure you wish to remove item?"
                          );
                          if (course) {
                            event.preventDefault();
                            try {
                              const removeitem = await deleteCartItem(
                                productId
                              );
                              

                              const newCart = cart.filter(
                                (item) =>
                                  item.productId !== removeitem.productId
                              );
                              setCart(newCart);
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        }}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
