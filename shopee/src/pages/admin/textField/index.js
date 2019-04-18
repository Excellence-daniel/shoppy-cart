import React, { Component } from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default class TextInput extends Component {
    render() {
        return <TextField
            fullWidth
            id="outlined-simple-start-adornment"
            variant="outlined"
            label={this.props.label}
            onChange={this.props.function}
            InputProps={{
                startAdornment: <InputAdornment position="start"> <i class={this.props.icon}></i> </InputAdornment>,
            }}
        />
    }
}