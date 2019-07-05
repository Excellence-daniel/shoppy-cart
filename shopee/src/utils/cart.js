import axios from "axios";
import { server_database_url } from "../config";

export const addToCart = id => {
  console.log(id);
  getProduct(id);
};

export const getProduct = id => {
  const url = `${server_database_url}/getAProduct`;
  const body = { id };
  const products = axios.post(url, body);
  console.log("productsResults", products);
};
