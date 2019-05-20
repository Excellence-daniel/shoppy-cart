import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { server_database_url, loader, showToast } from '../../config';
import axios from 'axios';

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            logAdmin: false,
            redirect: false
        }
    }

    handleEmailInput = (e) => {
        this.setState({ email: e.target.value.trim() });
    }

    handlePasswordInput = (e) => {
        this.setState({ password: e.target.value.trim() });
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    };

    loginFunc = async () => {
        this.setState({ loginAdmin: true });
        try {
            const { email, password } = this.state;
            if (email !== '' && password !== '') {
                const url = `${server_database_url}/login`;
                const body = { email, password };
                const logAdmin = await axios.post(url, body);
                if (logAdmin.status === 200) {
                    showToast(logAdmin.data.statusmessage);
                    setTimeout(() => { this.setState({ loginAdmin: false, redirect: true }); }, 3000);
                } else {
                    showToast(logAdmin.data.statusmessage);
                    this.setState({ loginAdmin: false });
                }
            } else {
                showToast("Fill in all fields.");
                this.setState({ loginAdmin: false });
            }
        }
        catch (e) {
            this.setState({ loginAdmin: false });
            showToast(e);
        }
    }

    render() {
        const { loginAdmin, redirect } = this.state;
        if (redirect) {
            return <Redirect to="/admin/addProducts" />
        }
        return (
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4" style={{ marginTop: '5%' }}>
                    <p id="email">
                        <label></label>
                        <TextField
                            fullWidth
                            id="outlined-simple-start-adornment"
                            variant="outlined"
                            label="Email Address"
                            onChange={this.handleEmailInput}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> <i class="fas fa-at"></i> </InputAdornment>,
                            }}
                        />
                    </p>

                    <p id="password" >
                        <label></label>
                        <TextField
                            fullWidth
                            id="outlined-simple-start-adornment"
                            variant="outlined"
                            label="Password"
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handlePasswordInput}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> <i class="fas fa-key"></i> </InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </p>

                    <p>
                        <Button variant="contained" color="primary" className="btn-block" onClick={this.loginFunc} disabled={loginAdmin}>
                            {loginAdmin ? <img src={loader} width={20} /> : "Login"}
                        </Button>
                    </p>

                    <div className="row">
                        <div className="col-7">
                            <Link to="/signup"> Not An Admin? Create.</Link>
                        </div>

                        <div className="col-5">
                            <span style={{ float: 'right' }}><Link> Forgot Password? </Link></span>
                        </div>
                    </div>
                </div>


                <div className="col-4"></div>
                <div id="toast"></div>
            </div >
        )
    }
}