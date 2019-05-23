import React, { Component } from 'react';
import { Products } from '../../products';
import { Link } from 'react-router-dom';
import './index.css';
import { determineDiscount, FormatMoney } from '../../config';

export default class MenCollection extends Component {
    render() {
        return (
            <div className="row" style={{ marginTop: '1%' }}>
                <div className="col-2 card card-body"></div>
                <div className="col-10">
                    <div className="row">
                        {Products.map(product => (
                            <div className="col-md-2 col-6">
                                <Link to="">
                                    <div>
                                        <div class="uk-animation-toggle" tabindex="0">
                                            <div class="uk-card uk-card-default uk-card-body uk-animation-slide-top-small" id="product__box">
                                                <div style={{ textAlign: 'center' }}>
                                                    <img src={`/img/products/${product.img}`} className="img-fluid" id="product__image" />
                                                </div>
                                                <div className="product__name">{product.name}</div>
                                                <span class="slashed__price">
                                                    <strike >{FormatMoney.format(product.price)}</strike>
                                                </span>
                                                <span className="product__price"> {FormatMoney.format(determineDiscount(product.price).toFixed(2))}</span>
                                                <button className="cart__button">Add to Cart </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}