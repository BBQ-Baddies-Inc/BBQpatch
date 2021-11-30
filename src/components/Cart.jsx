import React from 'react'

export default function Cart(props) {
  const {productId, setProductId} = props

  return (
    <div className="container-center-horizontal">
      <div className="cart screen"> 
        <h1 className="title montserrat-semi-bold-white-36px">Cart</h1>
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
            <div className="group-26"></div>
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

