import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import TextInput from './textField';

export default class SignUp extends Component {
    handleNameInput = () => {

    }
    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div style={{ marginTop: '10%' }}>
                        <p className="fullname">
                            <TextInput label={'FullName'} icon={'fas fa-user'} function={this.handleNameInput} />
                        </p>

                        <p className="email">
                            <TextInput label={'Email Address'} icon={'fas fa-at'} function={this.handleNameInput} />
                        </p>

                        <p className="password">
                            <TextInput label={'Password'} icon={'fas fa-key'} function={this.handleNameInput} />
                        </p>
                        <p style={{ marginLeft: '3%' }}>
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">I agree with all <Link>Terms and Conditions</Link></label>
                        </p>
                        <p>
                            <Button variant="contained" color="secondary" className="btn-block">
                                Admin SignUp
                        </Button>
                        </p>
                        <p>
                            <center> <Link to="/login">Already an Admin? Login</Link> </center>
                        </p>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}