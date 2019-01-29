import React, {
    Component
} from 'react';

import {
    Form,
    Input,
    Button,
    DatePicker,
    Row,
    Col,
    Upload,
    Icon,
    message,
    Select
} from 'antd';

import axios from 'axios'
import { getCookie } from '../../util'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import * as qiniu from 'qiniu-js'

@connect(
    state=>state.user

)

class ArticleForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            fileList: [],
            uploading: false,
        }
        this.handelContentChange = this.handelContentChange.bind(this)
    }
    componentDidMount(){
        // console.log(this.props)
        console.log(getCookie('token'))
    }

   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, formValues) => {
          if (!err) {
            const values = {
                ...formValues,
                'date': formValues['date'].format('YYYY-MM-DD'),
                'imgUrl': formValues['imgUrl'][0].name
            }
            console.log('Received values of form: ', values);
            axios.post('/uploadArticle',{...values}).then(res=>{
                if(res.status === 200 && res.data.code === 0){
                    message.success(res.data.msg)
                }else{
                    message.error('error')
                }
                
            })
          }
        });
      }
    
    
    handelContentChange(e){
        this.setState({
            content: e.target.value
        })
    }

    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
    handleChange = ({ fileList }) => this.setState({ fileList })

        
    handleUpload = () => {
        let self = this
        const { fileList } = self.state;
        self.setState({
            uploading: true,
        });
        let i = 0;
        fileList.forEach((file) => {  
            let config = {
                useCdnDomain: true,
                region: qiniu.region.z2
            }
            var putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };
            var observer = {
                error(){
                    message.error('上传出错了');
                    self.setState({
                        uploading: false
                    });
                },
                complete(res){
                    i++;
                    if(i === fileList.length){
                        console.log('上传结束')
                        self.setState({
                            uploading: false,
                            fileList: []
                        });
                    }
                    message.success('上传成功');
                }
            }
            var observable = qiniu.upload(file.originFileObj, file.name, getCookie('token'), putExtra, config)
            var subscription = observable.subscribe(observer) 
            });
          }

          normFile = (e) => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
              this.setState((state) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: (file) => {
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              return false;
            },
            fileList,
        };
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

        const Option = Select.Option
        return ( 
            <Row>
                <Col span={12}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item
                    {...formItemLayout}
                    label="标题"
                    >
                    {getFieldDecorator('title',{
                    rules: [
                        { required: true, message: '输入标题', type: 'string' },
                        ]
                    })(
                        <Input />
                    )}
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                    label="描述"
                    >
                    {getFieldDecorator('sub',{
                         rules: [
                            { required: true, message: '输入描述', type: 'string' },
                            ],
                    })(
                        <Input />
                    )}
                    </Form.Item>
                    <Form.Item
                    {...formItemLayout}
                    label="标签"
                    >
                    {getFieldDecorator('type', {
                        rules: [
                        { required: true, message: '选择一个标签', type: 'array' },
                        ]
                    })(
                        <Select mode="multiple" placeholder="选择一个标签">
                        <Option value="JavaScript">JavaScript</Option>
                        <Option value="css">css</Option>
                        <Option value="html">html</Option>
                        </Select>
                    )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="封面"
                    >
                    {
                        getFieldDecorator('imgUrl',{
                            // valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload {...props} 
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                        
                            {fileList.length >= 1 ? null :   <Button><Icon type="plus" /></Button>}
                            </Upload>
                        )
                    }
                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                        {uploading ? 'Uploading' : 'Start Upload' }
                    </Button>
                    </Form.Item>
                    {/* <Form.Item
                    {...formItemLayout}
                    label="Upload"
                    >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> Click to upload
                        </Button>
                        </Upload>
                    )}
                    </Form.Item> */}
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