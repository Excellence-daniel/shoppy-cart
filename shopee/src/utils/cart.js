import axios from "axios";
import { server_database_url } from "../config";

export const addToCart = async id => {
  await getProduct(id);
};

export const getProduct = async id => {
  try {
    const url = `${server_database_url}/getAProduct`;
    const body = { id };
    const products = await axios.post(url, body);
    console.log("productsResults", products);
  } catch (e) {
    console.log(e);
  }
};
