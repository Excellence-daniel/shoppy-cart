import React from "react";
import "./spinbox.scss";
export default function spinBox(props) {
  const { itemNumber, addToCart, removeFromCart } = props;
  return (
    <div className="spinBox">
      <div className="minus-sign">
        {" "}
        <button className="signBtn" onClick={() => removeFromCart()}>
          <i class="fas fa-minus" />
        </button>
      </div>
      <div className="cartItemNumber"> {itemNumber} </div>
      <div className="plus-sign">
        <button className="signBtn" onClick={() => addToCart()}>
          <i class="fas fa-plus" />
        </button>
      </div>
    </div>
  );
}
