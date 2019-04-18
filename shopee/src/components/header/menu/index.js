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
                        <div class="modal-content" style={{ width: '110%', marginTop: '20%' }}>
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"> Cart Items </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <Cart />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger btn-block"> Proceed to CheckOut </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}