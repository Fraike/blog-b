import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Switch,Route,withRouter } from 'react-router-dom'


import Article from '../../container/article/article';
import Album from '../../container/album/album';
import Share from '../../container/share/share';

const { Header, Content, Footer } = Layout;

@withRouter

class DashBoard extends Component {
    render(){
        const navList = [
            {
                path: '/article',
                text: '上传文章',
                icon: 'boss',
                title: '上传文章',
                component: Article,
            },
            {
                path: '/album',
                text: '上传相册',
                icon: 'job',
                title: '上传相册',
                component: Album,
            },
            {
                path: '/share',
                text: '管理分享',
                icon: 'msg',
                title: '管理分享',
                component: Share
            }

        ]
        let {pathname} = this.props.location.pathname !=='/'?this.props.location : {pathname:'/article'}
        return (
          <Layout className={Layout}>
           <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[pathname]}
                style={{ lineHeight: '64px' }}
            >
                {
                    navList.map(v=>(
                        <Menu.Item key={v.path} onClick={()=>{this.props.history.push(v.path)}}>{v.text}</Menu.Item>
                    ))
                }
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{navList.filter(v=>v.path===pathname)[0].text}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                </Switch>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        )
    }
}
export default DashBoard