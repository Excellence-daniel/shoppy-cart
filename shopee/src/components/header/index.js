import React, { Component } from 'react';

import SearchBar from '../searchbar';
import Menu from './menu';

import './index.css';
export default class Header extends Component {
    render() {
        return <div>
            <header className="card card-body" id="header">
                <div className="row">
                    <div className="col-1">
                        <img src="img/logo.png" className="img-fluid" style={{ width: '90%', marginTop: '-10%' }} />
                    </div>

                    <div className="col-7">
                        <Menu />
                    </div>

                    <div className="col-4" style={{ marginTop: '0.7%' }}>
                        <SearchBar />
                    </div>
                </div>
            </header>
            <div>
                <img src="img/home-pic-1.jpg" className="img-fluid" />
            </div>
            <div style={{ marginTop: '3%' }}></div>
        </div >
    }
}
