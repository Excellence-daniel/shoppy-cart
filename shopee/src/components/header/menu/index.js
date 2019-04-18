import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link>
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
                    <li>
                        <i class="fab fa-opencart"></i>
                    </li>
                </ul>
            </div>
        )
    }
}