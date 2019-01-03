import React from 'react';
import { withRouter } from 'react-router-dom'

@withRouter

class AuthRoute extends React.Component {
    componentDidMount(){
        this.props.history.push('/article')
    }
    render(){return null}
}
export default AuthRoute