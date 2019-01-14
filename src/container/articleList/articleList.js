import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import axios from 'axios'
class ArticleList extends Component {
    state = {list:[]}
    constructor(props){
      super(props)
    }
    async componentDidMount(){
      const {status,data:{list}} = await axios.get('/getAllArticle')
      this.setState({
        list: list
      })
    }
    handleEdit(record){
      console.log(record)
    }
    render(){
        const columns = [{
            title: '文章名字',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            render: text => <span>{text.substr(0,10)}</span>,
          }, {
            title: '概括内容',
            dataIndex: 'content',
            key: 'content',
            render: text => <span>{text.substr(0,10)}</span>,
          }, {
            title: '点赞数',
            key: 'favor',
            dataIndex: 'favor'
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={()=>this.handleEdit(record)}>编辑 {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
              </span>
            ),
          }];

        return (
            <Table rowKey="_id"  columns={columns} dataSource={this.state.list} />
        )
    }
}
export default ArticleList