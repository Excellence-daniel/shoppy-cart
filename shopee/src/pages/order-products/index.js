import React, { Component } from "react";
import { addToCart } from "../../utils/cart";
import CategorySideBar from "../../components/category-bar";
import {
  determineDiscount,
  FormatMoney,
  //   showToast
} from "../../config";
import { Link } from "react-router-dom";

export default class OrderProducts extends Component {
  render() {
    const { products } = this.props;
    return (
      <div style={{ marginTop: "1%" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 series__board ">
              {products.length > 0 ? <CategorySideBar /> : <div />}
            </div>
            <div className="col-10">
              {products.length > 0 ? (
                <div className="row">
                  {products.map(product => {
                    console.log(product);
                    return (
                      <div className="col-md-2 col-6">
                        <Link to={`/products/${product._id}`}>
                          <div>
                            <div class="uk-animation-toggle" tabindex="0">
                              <div
                                // onClick={getProducts(product._id)}
                                class="uk-card uk-card-default uk-card-body uk-animation-slide-top-small"
                                id="product__box"
                              >
                                <div style={{ textAlign: "center" }}>
                                  <img
                                    alt="productImage"
                                    src={product.imageURL}
                                    className="img-fluid"
                                    id="product__image"
                                  />
                                </div>
                                <div className="product__name">
                                  {product.productName}
                                </div>
                                <span class="slashed__price">
                                  <strike>
                                    {FormatMoney.format(product.productPrice)}
                                  </strike>
                                </span>
                                <span className="product__price">
                                  {" "}
                                  {FormatMoney.format(
                                    determineDiscount(
                                      product.productPrice
                                    ).toFixed(2)
                                  )}
                                </span>
                                <button
                                  className="cart__button"
                                  onClick={e => {
                                    addToCart(product._id);
                                  }}
                                >
                                  Add to Cart{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: "7rem" }}>
                  <center>
                    <img
                      alt="noProductImage"
                      src="./img/mens__no__product__image.png"
                      style={{ opacity: "0.2", width: "12rem" }}
                    />
                    <p className="no__products__message">
                      {" "}
                      There are no products in this collection.{" "}
                    </p>
                  </center>
                </div>
              )}
            </div>
            <div id="toast" />
          </div>
        </div>
      </div>
    );
  }
}
