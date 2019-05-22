import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Cart from '../../cart';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/men-collection">
                            <span> Men </span>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <span> Women </span>
                        </Link>
                    </li>

                    <li>
                        <Link>
                            <span> FootWear </span>
                        </Link>
                    </li>
                    <li data-toggle="modal" data-target="#openCart">
                        <i class="fab fa-opencart cart"></i>
                    </li>
                </ul>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="openCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content" style={{ width: '110%', marginTop: '6rem' }}>
                            <div class="modal-header">
                                <div class="modal-title" id="exampleModalLabel">
                                    <h5> Cart Items</h5>
                                    <br />
                                    <span className="cart__items__count">5 Item(s)</span>
                                </div>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="close__modal">close &times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Cart />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="checkout__button"> Proceed to CheckOut </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}