import React, { Component } from 'react';
import { Products } from '../../products';
import { Link } from 'react-router-dom';

const calculateDiscount = (discount, price) => {
    console.log('Heeey');
    const getDiscount = (discount / 100) * price;
    const discountedPrice = price - getDiscount + 10;
    console.log(price, 'I got here')
    return discountedPrice;
}
export default class MenCollection extends Component {

    determineDiscount = price => {
        let discountPrice = 0;
        let discount = 0;
        console.log('price is ', price);
        if (price >= 5000) {
            discount = 10;
            discountPrice = calculateDiscount(discount, price);
            console.log(discountPrice, 'DS');
            return discountPrice;
        } else if (price >= 15000) {
            discount = 12;
            discountPrice = calculateDiscount(discount, price);
            console.log(discountPrice, 'DS');
            return discountPrice;
        } else if (price >= 20000 && price <= 25000) {
            discount = 15;
            discountPrice = calculateDiscount(discount, price);
            console.log(discountPrice, 'DS');
            return discountPrice;
        } else {
            console.log(discountPrice, 'DS');
            return 0;
        }
    }

    render() {
        return (
            <div className="row" style={{ marginTop: '1%' }}>
                <div className="col-2 card card-body"></div>
                <div className="col-10">
                    <div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-center" uk-grid="parallax: 150">
                        {Products.map(product => (
                            <Link to="">
                                <div>
                                    <div class="uk-animation-toggle" tabindex="0">
                                        <div class="uk-card uk-card-default uk-card-body uk-animation-slide-top-small">
                                            <center>
                                                <p>
                                                    <img src={`/img/products/${product.img}`} className="img-fluid" style={{ width: '40%' }} />
                                                </p>
                                                <p>{product.name}</p>
                                                <p>{() => { this.determineDiscount(product.price) }}</p>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}