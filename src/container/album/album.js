import React, { Component } from 'react';
import {
  Upload, Button, Icon, message,Form, Input, Row, Col
} from 'antd';
import axios from 'axios'
import * as qiniu from 'qiniu-js'


class AlbumForm extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        uploading: false,
        token: ''

      }
    componentDidMount(){
       
    }
    
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
        var observable = qiniu.upload(file.originFileObj, file.name, self.state.token, putExtra, config)
        var subscription = observable.subscribe(observer) 
        });
      }
      handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
      handleChange = ({ fileList }) => this.setState({ fileList })

      handleSubmit = (e) => {
        let self = this;
        const { fileList } = self.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, formValues) => {
          if (!err) {
              let tmpArray = []
              fileList.forEach((v,i)=>{
                  let tmp = {
                      url: 'http://pjijycis2.bkt.clouddn.com/' + v.name,
                      date: v.lastModifiedDate.toLocaleDateString().replace(/[\/]/g,'.')
                  }
                  tmpArray.push(tmp)
              })
              formValues.list = tmpArray
            console.log('Received values of form: ', formValues);
            axios.post('/uploadAlbum',formValues).then(res=>{
                console.log(res)
            })
          }
        });
      }
    

      render() {
        const { uploading, fileList } = this.state;
        const { getFieldDecorator} = this.props.form;
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
        const FormLayout = {
            labelCol: {
                sm: {span:4}
            },
            wrapperCol: {
                sm:{span:16}
            }
        }
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
            }
          };

        return ( 
            <Form onSubmit={this.handleSubmit}>
                <Form.Item {...FormLayout}  label="title">
                    {getFieldDecorator('title')(
                        <Input/>
                    )}
                    
                </Form.Item>
                <Form.Item {...FormLayout} label="描述">
                    {getFieldDecorator('sub')(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item>
                <Row>
                <Col offset={4}>
                    <Upload {...props} 
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                    <Button>
                    <Icon type="plus" />
                    </Button>
                    </Upload>
                    <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                    >
                    {uploading ? 'Uploading' : 'Start Upload' }
                    </Button>
                </Col>
                </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
               
            </Form>
       
        );
      }
}

const Album = Form.create()(AlbumForm);

export default Album