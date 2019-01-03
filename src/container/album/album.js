import React, { Component } from 'react';
import {
  Upload, Button, Icon, message,
} from 'antd';
import axios from 'axios'
import * as qiniu from 'qiniu-js'

class Album extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        uploading: false,
        token: ''

      }
    
    componentDidMount(){
        axios.get('/getToken').then(res=>{
            if(res.status === 200 && res.data.code === 0) {
                this.setState({
                    token: res.data.token
                })
            }
        })
    }
    
    handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
        console.log(file)
        formData.append('files[]', file);
    });

    this.setState({
        uploading: true,
    });
    // axios.post('/uploadAlbum',formData).then(res=>{
    //     console.log(res)
    // })
    // console.log(formData.get('files[]'))
    console.log(fileList[0])
    let config = {
        useCdnDomain: true,
        region: qiniu.region.z0
    }
    var putExtra = {
        fname: "",
        params: {},
        mimeType: [] || null
      };
    var observer = {

    }
    var observable = qiniu.upload(fileList[0].thumbUrl, 'key', this.state.token, putExtra, config)
    var subscription = observable.subscribe(observer) 

      }
      handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    
      handleChange = ({ fileList }) => this.setState({ fileList })
      render() {
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
        return (
          <div>
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
          </div>
        );
      }
}

export default Album