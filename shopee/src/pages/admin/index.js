import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount = () => {
        this.setState({ redirect: true });
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/login" />
        }
        return <div></div>
    }
}