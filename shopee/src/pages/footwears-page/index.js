import React, { Component } from 'react';
import { Products } from '../../products';
import { Link } from 'react-router-dom';
import '../index.css';
import { determineDiscount, FormatMoney, server_database_url, showToast } from '../../config';
import axios from 'axios';


export default class FootWearCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount = async () => {
        try {
            const url = `${server_database_url}/footWearProducts`;
            const body = {}
            const getProducts = await axios.post(url, body);
            const products = getProducts.data.products;
            this.setState({ products });
        }
        catch (e) {
            console.log(e.message);
            return;
        }

    }
    render() {
        const { products } = this.state;
        return (
            <div style={{ marginTop: '1%' }}>
                <div className="col-12">
                    {
                        products.length > 0
                            ?
                            <div className="row">
                                {products.map(product => (
                                    <div className="col-md-2 col-6">
                                        <Link to="">
                                            <div>
                                                <div class="uk-animation-toggle" tabindex="0">
                                                    <div class="uk-card uk-card-default uk-card-body uk-animation-slide-top-small" id="product__box">
                                                        <div style={{ textAlign: 'center' }}>
                                                            <img src={product.imageURL} className="img-fluid" id="product__image" />
                                                        </div>
                                                        <div className="product__name">{product.productName}</div>
                                                        <span class="slashed__price">
                                                            <strike >{FormatMoney.format(product.productPrice)}</strike>
                                                        </span>
                                                        <span className="product__price"> {FormatMoney.format(determineDiscount(product.productPrice).toFixed(2))}</span>
                                                        <button className="cart__button">Add to Cart </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            :
                            <div style={{ padding: '7rem' }}>
                                <center>
                                    <img src="./img/footswear__no__product__image.jpg" style={{ opacity: '0.2', width: '10rem' }} />
                                    <p className="no__products__message" style={{ marginTop: '1rem' }}> There are no products in this collection. </p>
                                </center>

                            </div>
                    }
                </div>
                <div id="toast"></div>
            </div >
        )
    }
}