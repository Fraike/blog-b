import React, { Component } from 'react';
import './login.css'
import {
    Form, Icon, Input, Button,
  } from 'antd';
  

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

class SignUpForm extends Component{
    componentDidMount() {
        this.props.form.validateFields();
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
      render() {
        const {
          getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
    
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
          <Form className={true ? "active-sx signUp":"inactive-sx signUp"} layout="horizontal" onSubmit={this.handleSubmit}>
            
          </Form>
        );
      }
}

const WrappedSignUp = Form.create({ name: 'signUp' })(SignUpForm);

class Login extends Component {
    state ={
        signUpStatus: false,
        user: {
            account: '',
            password: ''
        }
    }
    constructor(props){
        super(props)
        this.handleChangeToLogin = this.handleChangeToLogin.bind(this)
        this.handleChangeToSignUp = this.handleChangeToSignUp.bind(this)
        this.handelLogin = this.handelLogin.bind(this)
        
    }
    handleChangeToLogin(){
        this.setState({
            signUpStatus: !this.state.signUpStatus
        })
    }
    handleChangeToSignUp(){
        this.setState({
            signUpStatus: !this.state.signUpStatus
        })
    }
    handelLogin(){
     
    }
    render(){
        return (
              <div className="container">
                <form className={this.state.signUpStatus ? "active-sx signUp":"inactive-sx signUp"}>
                    <h3>注册</h3>
                    <input className="w100" type="email" placeholder="Insert eMail"  autoComplete='off' />
                    <input type="password" placeholder="Insert Password"  />
                    <input type="password" placeholder="Verify Password"  />
                    <button className="form-btn sx log-in" onClick={this.handleChangeToLogin} type="button">Log In</button>
                    <button className="form-btn dx" type="submit">Sign Up</button>
                </form>
                {/* <WrappedSignUp></WrappedSignUp> */}
                <form className={this.state.signUpStatus ? "inactive-dx signIn":"active-dx signIn"}>
                    <h3>Welcome <br/> Back !</h3>
                    <input type="text" onChange={this.handChange} placeholder="Insert eMail" autoComplete='off'  />
                    <input type="password" placeholder="Insert Password"  />
                    <button className="form-btn sx back" onClick={this.handleChangeToSignUp} type="button">Back</button>
                    <button className="form-btn dx" type="submit" onClick={this.handelLogin}>Log In</button>
                </form>
            </div>
        )
    }
}
export default Login