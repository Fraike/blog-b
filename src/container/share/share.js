import React, { Component,Fragment } from 'react';
import { Table, Divider,Row, Col,Button, Modal, Form, Input, message  } from 'antd';
import axios from 'axios'
import CollectionCreateForm from './modal'
class Share extends Component {
    state = {
        list:[],
        visible: false,
    }
    constructor(props){
      super(props)
    }
    async componentDidMount(){
    //   const {status,data:{list}} = await axios.get('/getAllArticle')
    //   this.setState({
    //     list: list
    //   })
    }
    showModal = () => {
        this.setState({ visible: true });
      }
    
    handleEdit(record){
      console.log(record)
    }
    handleCancel = () => {
        this.setState({ visible: false });
      }
    
    handleCreate = () => {
        let self =this;
        const form = this.formRef.props.form;
         form.validateFields((err, values) => {
            if (err) {
            return;
            }

            console.log('Received values of form: ', values);
            axios.post('/addShare',values).then(res=>{
               if(res.status === 200 && res.data.code === 0){
                   message.success(res.data.msg)
                   form.resetFields();
                   self.setState({ visible: false });
               }else{
                message.success(res.data.msg)
               }
            })
          
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
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
           <Fragment>
            <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            />
            <Row style={{marginBottom:20}}> 
                <Col span={8}>
                <Button onClick={this.showModal} icon="plus" type="primary">新建</Button>
                </Col>
            </Row>
            <Row>
                <Table rowKey="_id"  columns={columns} dataSource={this.state.list} />
            </Row>
           </Fragment>
        )
    }
}
export default Share