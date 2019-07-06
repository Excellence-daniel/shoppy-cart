import React, { Component } from "react";
import {
  server_database_url,
  determineDiscount,
  FormatMoney
} from "../../config";
import axios from "axios";
import "./productsPage.scss";
import SpinBox from "../../components/spinbox";

export default class ProductsPage extends Component {
  state = {
    productData: [],
    cartItemNumber: 0
  };
  componentDidMount = async () => {
    try {
      const {
        match: {
          params: { productId }
        }
      } = this.props;
      const url = `${server_database_url}/getAProduct`;
      const body = { id: productId };
      const loadProduct = await axios.post(url, body);
      this.setState({ productData: loadProduct.data.product });
      console.log(loadProduct.data.product, "productLoaded");
    } catch (error) {
      //   handleError(error);
      return;
    }
  };

  addToCart = () => {
    let { cartItemNumber } = this.state;
    this.setState({ cartItemNumber: cartItemNumber + 1 });
  };

  removeFromCart = () => {
    let { cartItemNumber } = this.state;
    if (cartItemNumber > 0) {
      this.setState({ cartItemNumber: cartItemNumber - 1 });
    }
  };
  render() {
    const { productData, cartItemNumber } = this.state;
    console.log(productData);
    return productData.map(product => {
      return (
        <div className="productsPage">
          <div className="container-fluid">
            <div className="row">
              <div className="col-1" />
              <div className="col-3 ">
                <div className="product_image">
                  <img src={product.imageURL} alt={product.imageURL} />
                </div>
              </div>
              <div className="col-1" />
              <div className="col-7 product_details">
                <div className="product_name">{product.productName}</div>
                <div className="product_tags">{product.tags}</div>
                <div className="product_prices">
                  <p className="original_price">
                    {FormatMoney.format(product.productPrice)}
                  </p>
                  <p className="slashed_price">
                    {FormatMoney.format(
                      determineDiscount(product.productPrice)
                    )}
                  </p>
                </div>
                <div className="addToCartBtn">
                  <button class="cartBtn " onClick={this.addToCart}>
                    <i
                      class="fab fa-opencart"
                      style={{ marginRight: ".5rem" }}
                    />
                    Add to cart
                  </button>
                  <div>
                    <SpinBox
                      itemNumber={cartItemNumber}
                      addToCart={this.addToCart}
                      removeFromCart={this.removeFromCart}
                    />
                  </div>
                </div>
                <div className="description__block">
                  <p>Description</p>
                  <div className="product_category">{product.productBrand}</div>
                  <div className="product_description">
                    {product.productDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
