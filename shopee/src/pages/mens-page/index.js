import React, { Component } from "react";
// import { Products } from "../../products";
import "../index.css";
import {
  server_database_url
  //   showToast
} from "../../config";
import axios from "axios";
import OrderProducts from "../order-products";

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
    return <OrderProducts products={products} />;
  }
}
