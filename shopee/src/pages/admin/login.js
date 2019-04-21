import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false
        }
    }

    handleEmailInput = (e) => {
        const value = e.target.value;
        this.setState({ email: value });
    }

    handlePasswordInput = (e) => {
        const value = e.target.value;
        this.setState({ password: value });
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    };

    loginFunc = async () => {

    }
    render() {
        // const { classes } = this.props
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
                        <Button variant="contained" color="primary" className="btn-block">
                            Admin Login
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
            </div >
        )
    }
}