import React, { Component } from 'react';
import axios from 'axios'
import './login.scss'
import { message } from 'antd';
import { getToken } from '../../redux/user.redux'
import { connect } from 'react-redux'


@connect(
    state=>state.user,
    {getToken}
)


class Login extends Component {
    state ={
        account: '',
        password: ''
    }
    constructor(props){
        super(props)
        this.handelLogin = this.handelLogin.bind(this)
        this.handleSetAccount = this.handleSetAccount.bind(this)
        this.handleSetPassword = this.handleSetPassword.bind(this)

        
    }
    handelLogin(){
     axios.post('/login',this.state).then(res=>{
         if(res.status === 200 && res.data.code ===0) {
            this.props.history.push('./articleList')
         }else {
             message.error('错误')
         }
     })
     this.props.getToken()
    }
    handleSetAccount(e){
        this.setState({
            account: e.target.value
        })
    }
    handleSetPassword(e){
        this.setState({
            password: e.target.value
        })
    }
    render(){
        return (
           
                <div className="container">
                        <form>
                        <h1>welcome back!<br/> wwt</h1>
                        <input placeholder="Username" type="text" onChange={this.handleSetAccount} />
                        <input placeholder="Password" type="password" onChange = {this.handleSetPassword} />
                        <button type="button" onClick={this.handelLogin}>Submit</button>
                        </form> 
                </div>
              
        )
    }
}
export default Login