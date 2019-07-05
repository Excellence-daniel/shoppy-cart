import React, { Component } from "react";
import "./index.css";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <div>
              <img
                src="/img/products/shoes/shoe-3.png"
                alt="productImage"
                className="img-fluid product__image"
              />
            </div>
            <div>
              <p className="product__name">Addidas Black Shoe</p>
            </div>
          </div>

          <div className="col-4">
            <p className="product__count"> 2 </p>
          </div>

          <div className="col-4">
            <p className="product__price"> #1,250 </p>
          </div>

          <hr />

          <div className="col-4">
            <div>
              <img
                src="/img/products/shoes/shoe-2.png"
                alt="productImage2"
                className="img-fluid product__image"
              />
            </div>
            <div>
              <p className="product__name">Brogues Black Shoes</p>
            </div>
          </div>

          <div className="col-4">
            <p className="product__count"> 1 </p>
          </div>

          <div className="col-4">
            <p className="product__price"> #2,400 </p>
          </div>
        </div>

        <div className="cart__total">
          <span>Total</span>
          <span className="total__price">#20,302.93</span>
        </div>
      </div>
    );
  }
}
