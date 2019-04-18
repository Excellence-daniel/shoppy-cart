import React, { Component } from 'react';
import TextInput from './textField';

export default class AddProducts extends Component {
    searchProduct = async () => {

    }
    render() {
        return (
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <div style={{ marginTop: '5%' }}>
                        <TextInput label={"Product Name"} icon={'fas fa-search'} function={this.searchProduct} />
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        )
    }
}