

import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
const
  FormItem = Form.Item,
  Option = Select.Option;


class LinkModal extends React.Component {


  onOk = () => {
    this.props.form.validateFields( ( errors, values ) => {
      if ( !errors ) {
        this.props.onOk( values );
      }
    } );
  };


  render () {

    const

      { getFieldProps } = this.props.form,

      formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },

      urlProps = getFieldProps( 'url', {
        rules: [
          { required: true, whitespace: true, message: '此项必填' }
        ]
      } ),

      targetProps = getFieldProps( 'target', {
        initialValue: '_blank'
      } ),

      httpProps = getFieldProps( 'http', {
        initialValue: 'http://'
      } ),

      selectBefore = (
        <Select
          {...httpProps}
          style={{ width: 80 }}>
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
          <Option value="ftp://">ftp://</Option>
          <Option value="<other>">other</Option>
        </Select>
      );

    return (
      <Modal
        title="链接"
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        visible={this.props.visible}>
        <Form horizontal form={this.props.form} style={{ marginTop: '1.5em' }}>
          <FormItem
            {...formItemLayout}
            label="链接地址">
            <Input
              {...urlProps}
              spellCheck={false}
              autoComplete="off"
              addonBefore={selectBefore} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Target">
            <Select
              {...targetProps}>
              <Option value="_blank">_blank</Option>
              <Option value="_top">_top</Option>
              <Option value="_self">_self</Option>
              <Option value="_parent">_parent</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }

}


export default Form.create()( LinkModal );

