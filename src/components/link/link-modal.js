

import React from 'react';
import { Modal, Form, Input, Select } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

function LinkModal( props ) {

  function handleOk() {
    props.form.validateFields(( errors, values ) => {
      if ( !errors ) {
        props.onOk( values );
      }
    });
  }

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const selectBefore = getFieldDecorator( 'http', {
    initialValue: 'http://'
  })(
    <Select style={{ width: 80 }}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
      <Option value="ftp://">ftp://</Option>
      <Option value="<other>">other</Option>
    </Select>
    );

  return (
    <Modal
      visible
      title="链接"
      onOk={handleOk}
      onCancel={props.onCancel}>
      <Form horizontal style={{ marginTop: '1.5em' }}>
        <FormItem
          {...formItemLayout}
          label="链接地址">
          {getFieldDecorator( 'url', {
            rules: [
              { required: true, whitespace: true, message: '此项必填' }
            ]
          })(
            <Input
              spellCheck={false}
              autoComplete="off"
              addonBefore={selectBefore} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Target">
          {getFieldDecorator( 'target', {
            initialValue: '_blank'
          })(
            <Select>
              <Option value="_blank">_blank</Option>
              <Option value="_top">_top</Option>
              <Option value="_self">_self</Option>
              <Option value="_parent">_parent</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
}


export default Form.create()( LinkModal );

