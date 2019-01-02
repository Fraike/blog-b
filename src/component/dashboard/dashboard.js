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
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Article,
            },
            {
                path: '/album',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Album,
            },
            {
                path: '/share',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Share
            }

        ]
        return (
          <Layout className={Layout}>
           <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1" onClick={()=>{this.props.history.push('/article')}}>nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
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