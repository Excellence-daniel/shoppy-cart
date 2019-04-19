import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class SelectField extends Component {
    render() {
        return <FormControl fullWidth variant="outlined" >
            <InputLabel
                ref={ref => {
                    this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
            >
                {this.props.label}
            </InputLabel>
            <Select
                value={this.props.value}
                onChange={this.props.function}
                input={
                    <OutlinedInput
                        labelWidth={this.props.labelWidth}
                        name={this.props.label}
                        id="outlined-age-simple"
                    />
                }
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {this.props.categories.map(category => (
                    <MenuItem value={category}> {category} </MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
    }
}