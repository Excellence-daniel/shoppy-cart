import React, { Component } from 'react';
import TextInput from './textField';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class UpdateProducts extends Component {
    searchProduct = async () => {

    }
    render() {
        if (sessionStorage.getItem('email')) {
            return (
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div style={{ marginTop: '5%' }}>
                            <p><TextInput label={"Search Product Name"} icon={'fas fa-search'} function={this.searchProduct} /></p>
                            <p>
                                <Button variant="contained" color="secondary">
                                    Search Product
                        </Button>
                            </p>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            )
        }
    }
}