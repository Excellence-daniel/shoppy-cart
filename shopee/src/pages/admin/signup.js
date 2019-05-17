import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import TextInput from './textField';
import { server_database_url } from '../../../../config';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            agreed: false
        }
    }
    handleNameInput = (e) => {
        this.setState({ fullname: e.target.value.trim() });
    }

    handleEmailInput = (e) => {
        console.log(e.target.value, 'email');
        this.setState({ email: e.target.value.trim() });
    }

    handlePasswordInput = (e) => {
        console.log(e.target.value, 'password');
        this.setState({ password: e.target.value.trim() });
    }

    agreeFunc = () => {
        const { agreed } = this.state;
        console.log(!agreed)
        this.setState({ agreed: !agreed });
        // console.log(this.state.agreed)
    }

    handleAdminSignUp = async () => {
        const { email, fullname, password, agreed } = this.state;
        if (email !== '' && fullname !== '' && password !== '' && agreed === true) {
            const url = `${server_database_url}/signup`;
            const body = { fullname, email, password };
            const signAdminUp = await axios.post(url, body);
            console.log(signAdminUp, 'signup');
        } else {
            alert('Fill in all fields');
        }
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
                            <TextInput label={'Email Address'} icon={'fas fa-at'} function={this.handleEmailInput} />
                        </p>

                        <p className="password">
                            <TextInput label={'Password'} icon={'fas fa-key'} function={this.handlePasswordInput} />
                        </p>
                        <p style={{ marginLeft: '3%' }}>
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={this.agreeFunc} />
                            <label class="form-check-label" for="exampleCheck1">I agree with all <Link>Terms and Conditions</Link></label>
                        </p>
                        <p>
                            <Button variant="contained" color="secondary" className="btn-block" onClick={this.handleAdminSignUp}>
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