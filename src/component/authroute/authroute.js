import React from 'react';
import { withRouter } from 'react-router-dom'

@withRouter

class AuthRoute extends React.Component {
    componentDidMount(){
        // this.props.history.push('/articleList')
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname //获取当前页面url后缀
        if(publicList.indexOf(pathname)>-1){
            //如果处于登录页 或者 注册页 
            return null
        }
        this.props.history.push('/login')
        console.log(pathname);
        
    }
    render(){return null}
}
export default AuthRoute