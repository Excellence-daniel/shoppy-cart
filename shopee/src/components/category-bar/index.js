import React, { Component } from "react";
import { FormatMoney } from "../../config";

export default class CategorySideBar extends Component {
  render() {
    return (
      <div>
        <div className="classify_prices">
          <p className="__text__"> Prices </p>
          <p>
            <input type="checkbox" value="Above 300" />
            <span className="condition"> Above {FormatMoney.format(5000)}</span>
          </p>
          <p>
            <input type="checkbox" value="Above 300" />
            <span className="condition">
              {" "}
              Above {FormatMoney.format(10000)}
            </span>
          </p>
          <p>
            <input type="checkbox" value="Above 300" />
            <span className="condition">
              {" "}
              Above {FormatMoney.format(15000)}
            </span>
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
    );
  }
}
