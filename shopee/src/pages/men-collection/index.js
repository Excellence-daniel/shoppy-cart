import React, { Component } from 'react';
import { Products } from '../../products';
import { Link } from 'react-router-dom';

export default class MenCollection extends Component {
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