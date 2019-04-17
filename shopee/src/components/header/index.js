import React, { Component } from 'react';

import SearchBar from '../searchbar';

import './index.css';
export default class Header extends Component {
    render() {
        return <div>
            <header className="card card-body" id="header">
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-5">
                        <SearchBar />
                    </div>
                    <div className="col-4">
                    </div>
                </div>
            </header>
            <div style={{ marginTop: '3%' }}></div>
        </div >
    }
}
