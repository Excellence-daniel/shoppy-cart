import React, { Component } from 'react';
import './index.css';

export default class AdminProfile extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h3>
                        <p>
                            <i class="fas fa-user"> </i>
                            <span id="adminDets">User Full Name </span>
                        </p>

                        <p>
                            <i class="fas fa-at"> </i>
                            <span id="adminDets"> User Email </span>
                        </p>
                    </h3>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}