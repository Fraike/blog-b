import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

@withRouter

class AuthRoute extends Component {
    componentDidMount(){
        this.props.history.push('/home')
    }
    render(){return null}
}
export default AuthRoute