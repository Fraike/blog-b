import React from 'react'
import { Modal, Form, Input,Select   } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        const Option = Select.Option;
        return (
          <Modal
            visible={visible}
            title="新建分享"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="标题">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '不能为空' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="描述">
                {getFieldDecorator('desc')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="类型">
              {getFieldDecorator('type')(
                <Select  style={{ width: 120 }}>
                <Option value="qianduan">前端</Option>
                <Option value="houduan">后端</Option>
                <Option value="desgin">设计</Option>
              </Select>
              )}
              </Form.Item>
              <Form.Item label="url地址">
                {getFieldDecorator('urlPath')(<Input type="textarea" />)}
              </Form.Item>
              
            </Form>
          </Modal>
        );
      }
    }
  );

  export default CollectionCreateForm