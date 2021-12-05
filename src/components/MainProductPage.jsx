import React, { useState } from "react";
import "./Desktop6.css";


import { getUserId } from "../auth";
import { addToCart } from "../api/cart";
import { useHistory } from "react-router";

export default function MainProductPage(props) {
  const { products, productId, setProductId } = props;
  const [quantity, setQuantity] = useState(0);
  let history = useHistory();

  return (
    <>
      {products && products.length && productId
        ? products.map((product, indx) => {
            const { name, price, id, description, main_product_photo } =
              product;

            if (id === productId) {
              return (
                <div
                  className="container-center-horizontal"
                  key={`product-${indx}`}
                >
                  <div className="desktop-6 screen">
                    <div className="overlap-group4">
                      <h1
                        className="title montserrat-semi-bold-white-36px"
                        style={{}}
                      >
                        {name}
                      </h1>
                      <div className="group-container">
                        <div className="group-21">
                          <div className="burger-kit montserrat-semi-bold-white-14px">
                            {name}
                          </div>
                          <p className="text-2 montserrat-light-white-14px">
                            {description}
                          </p>
                          <div className="group-5 montserrat-semi-bold-silver-14px">
                            <div className="price valign-text-middle">
                              {price}
                            </div>
                            <div className="overlap-group-container">
                              <div className="overlap-group1 border-2px-sonic-silver">
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
                              </div>
                              <div className="overlap-group border-2px-sonic-silver">
                                <button
                                  className="addToCart-button"
                                  onClick={async (event) => {
                                    event.preventDefault();
                                    try {
                                      const userId = getUserId();
                                      
                                      const ADDTOCART = await addToCart(
                                        id,
                                        userId,
                                        quantity
                                      );
                                      
                                      history.push("/cart");
                                    } catch (error) {}
                                  }}
                                >
                                  Add To Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="overlap-group2">
                          <img className="image-21" src={main_product_photo} />
                        </div>
                      </div>
                      <div className="group-23">
                        <div className="create-with-love montserrat-semi-bold-white-14px">
                          Create with love
                        </div>
                        <p className="text-3 montserrat-light-white-14px">
                          These state-of-the-art grills allow you to monitor
                          your food from your smart device so you can spend more
                          time enjoying company or watching the game
                        </p>
                      </div>
                    </div>
                    <img className="rectangle-4" src={main_product_photo} />
                  </div>
                </div>
              );
            }
          })
        : null}
    </>
  );
}

// export default mainProductPage;
