import React from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

@withRouter

class AuthRoute extends React.Component {
    componentDidMount(){
        // this.props.history.push('/articleList')
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname //获取当前页面url后缀
        console.log(pathname)
        if(publicList.indexOf(pathname)>-1){
            //如果处于登录页 或者 注册页 
            return null
        }
        // this.props.history.push('/login')
        if(pathname === '/'){
            this.props.history.push('/articleList')
        }
        axios.get('/info').then(res=>{
            if(res.status === 200) {
                // console.log(res)
                if(res.data.code === 0) {
                    // this.props.loadData(res.data.data)
                }else {
                    // console.log(this.props.history);
                    
                    this.props.history.push('/login')
                    
                }
                
            }
        })
        
        
    }
    render(){return null}
}
export default AuthRoute