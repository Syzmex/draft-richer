

import React from 'react';
import Upload from 'rc-upload';
import PropTypes from 'prop-types';
import { RichUtils, EditorState } from 'draft-js';
import Icon from '../icons';
import Button from '../button';
import { prefixCls } from '../../config';


class AttachmentControls extends React.Component {

  static propsTypes = {
    url: PropTypes.string.isRequired,
    getFile: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    editorState: PropTypes.instanceOf( EditorState ).isRequired
  };

  state = {
    uploaderProps: {
      multiple: true,
      supportServerRender: true,
      action: this.props.url,
      // data: { a: 1, b: 2 },
      // headers: {
      //   Authorization: 'xxxxxxx',
      // },
      // beforeUpload( file ) {
      //   console.log( 'beforeUpload', file.name );
      // },
      // onStart: ( file ) => {
      //   console.log('onStart', file.name);
      //   // this.refs.inner.abort(file);
      // },
      onSuccess( file ) {
        console.log( 'onSuccess', file );
      },
      onProgress( step, file ) {
        console.log( 'onProgress', Math.round( step.percent ), file.name );
      },
      onError( err ) {
        console.log( 'onError', err );
      }
    }
  };

  handleToggle = ( values ) => {

    const { editorState } = this.props;

    if ( values ) {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity( 'LINK', 'MUTABLE', {
        url: values.http + values.url, target: values.target
      });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
      this.props.onToggle(
        RichUtils.toggleLink( newEditorState, newEditorState.getSelection(), entityKey )
      );
      this.toggleLinkOption( false );
    } else {
      this.props.onToggle(
        RichUtils.toggleLink( editorState, editorState.getSelection(), null )
      );
    }
  };

  isNotCollapsed = () => {
    const selection = this.props.editorState.getSelection();
    return !selection.isCollapsed() && selection.getHasFocus();
  };

  render() {

    const { uploaderProps } = this.state;
    return (
      <Upload
        component="div"
        className={`${prefixCls}-toolbar`}
        ref={( c ) => { this.uploader = c; }}
        {...uploaderProps}>
        <Button
          id="attachment"
          title="上传附件"
          label={<Icon type="attachment" />} />
      </Upload>
    );
  }
}

export default AttachmentControls;
