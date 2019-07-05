import React, { Component } from "react";
// import { Products } from "../../products";
// import { Link } from "react-router-dom";
import "../index.css";
import { addToCart } from "../../utils/cart";
import {
  determineDiscount,
  FormatMoney,
  server_database_url
  //   showToast
} from "../../config";
import axios from "axios";

export default class MenCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount = async () => {
    try {
      const url = `${server_database_url}/mensProducts`;
      const body = {};
      const getProducts = await axios.post(url, body);
      const products = getProducts.data.products;
      this.setState({ products });
    } catch (e) {
      console.log(e.message);
      return;
    }
  };
  render() {
    const { products } = this.state;
    return (
      <div style={{ marginTop: "1%" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 series__board ">
              <div className="classify_prices">
                <p className="__text__"> Prices </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Above 300</span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Above 300</span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Above 300</span>
                </p>
              </div>
              <div className="classify_colors">
                <p className="__text__"> Colors </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Red </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Black </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> Blue </span>
                </p>
              </div>
              <div className="classify_colors">
                <p className="__text__"> Sizes </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> S </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> M </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> L </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> XL </span>
                </p>
                <p>
                  <input type="checkbox" value="Above 300" />
                  <span className="condition"> XXL </span>
                </p>
              </div>
            </div>
            <div className="col-10">
              {products.length > 0 ? (
                <div className="row">
                  {products.map(product => {
                    console.log(product);
                    return (
                      <div className="col-md-2 col-6">
                        {/* <Link to=""> */}
                        <div>
                          <div class="uk-animation-toggle" tabindex="0">
                            <div
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
                        {/* </Link> */}
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
