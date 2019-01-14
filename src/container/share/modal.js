import React from 'react'
import { Modal, Form, Input  } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
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