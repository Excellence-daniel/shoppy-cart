import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import TextInput from './textField';
import { server_database_url, loader, showToast } from '../../config';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            agreed: false,
            signUpAdmin: false,
            redirect: false
        }
    }
    handleNameInput = (e) => {
        this.setState({ fullname: e.target.value.trim() });
    }

    handleEmailInput = (e) => {
        this.setState({ email: e.target.value.trim() });
    }

    handlePasswordInput = (e) => {
        this.setState({ password: e.target.value.trim() });
    }

    agreeFunc = () => {
        const { agreed } = this.state;
        this.setState({ agreed: !agreed });
    }

    handleAdminSignUp = async () => {
        this.setState({ signUpAdmin: true });
        try {
            const { email, fullname, password, agreed } = this.state;
            if (email !== '' && fullname !== '' && password !== '' && agreed === true) {
                const url = `${server_database_url}/signup`;
                const body = { fullname, email, password };
                const signAdminUp = await axios.post(url, body);
                if (signAdminUp.status === 200) {
                    showToast(signAdminUp.data.statusmessage);
                    setTimeout(() => { this.setState({ signUpAdmin: false, redirect: true }); }, 3000)
                } else {
                    showToast(signAdminUp.data.statusmessage);
                    this.setState({ signUpAdmin: false });
                }
            } else {
                this.setState({ signUpAdmin: false });
                showToast("Fill in all the fields.");
            }
        }
        catch (e) {
            this.setState({ signUpAdmin: false });
            showToast(e.message);
        }
    }

    render() {
        const { signUpAdmin, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/login" />
        }
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
                            <Button variant="outlined" color="secondary" className="btn-block" onClick={this.handleAdminSignUp} disabled={signUpAdmin}>
                                {signUpAdmin ? <img src={loader} width={20} /> : "Admin SignUp"}
                            </Button>
                        </p>
                        <p>
                            <center> <Link to="/login">Already an Admin? Login</Link> </center>
                        </p>
                    </div>
                </div>
                <div className="col-3"></div>
                <div id="toast"></div>
            </div>
        )
    }
}