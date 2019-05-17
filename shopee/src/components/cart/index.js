import React, { Component } from 'react';

export default class Cart extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-3"><img src="/img/products/shoes/shoe-3.png" className="img-fluid" id="prod-image" /></div>
                    <div className="col-4" id="prod-price">
                        <span>
                            <b><p>Addidas Black Shoe</p></b>
                        </span>
                    </div>
                    <div className="col-2" id="prod-price">
                        <span><b><center>2</center></b></span></div>
                    <div className="col-3" id="prod-price">
                        <span><b>#1,250</b></span>
                    </div>
                </div>
                <hr />
                <div>
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3 total">
                            <i><b>Total</b></i>
                            <p><b>#30,000</b></p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}