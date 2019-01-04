import React, {
    Component
} from 'react';

import {
    Form,
    Input,
    Button,
    DatePicker,
    Row,
    Col
} from 'antd';

import axios from 'axios'

import ReactMarkdown from 'react-markdown'

class ArticleForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: ''
        }
        this.handelContentChange = this.handelContentChange.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, formValues) => {
          if (!err) {
            const values = {
                ...formValues,
                'date': formValues['date'].format('YYYY-MM-DD')
            }
            console.log('Received values of form: ', values);
            axios.post('/uploadArticle',{...values}).then(res=>{
                console.log(res)
            })
          }
        });
      }
    
    
    handelContentChange(e){
        this.setState({
            content: e.target.value
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const formItemLayout = {
            labelCol: {
              xs: { span: 1 },
              sm: { span: 2 },
            },
            wrapperCol: {
              xs: { span: 11 },
              sm: { span: 18 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 4,
              },
            },
          };

        
        return ( 
            <Row>
                <Col span={12}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                    {...formItemLayout}
                    label="标题"
                    >
                    {getFieldDecorator('title')(
                        <Input />
                    )}
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                    label="描述"
                    >
                    {getFieldDecorator('sub')(
                        <Input />
                    )}
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                    label="日期"
                    >
                    {getFieldDecorator('date')(
                        <DatePicker />
                    )}
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                    label="内容"
                    >
                    {getFieldDecorator('content')(
                        <TextArea autosize={true} onChange={e=>this.handelContentChange(e)} />
                    )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                    
                </Form>
                </Col>
                <Col span={12}><ReactMarkdown source={this.state.content} /></Col>
            </Row>
            
            
        )
    }
}
const Article = Form.create()(ArticleForm);

export default Article