

import React from 'react';
import itis from 'whatitis';
import Upload from 'rc-upload';
import PropTypes from 'prop-types';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import Icon from '../icons';
import Button from '../button';
import { prefixCls } from '../../config';


class PictureControls extends React.Component {

  static propsTypes = {
    url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]),
    getPost: PropTypes.func,
    beforeResponse: PropTypes.func,
    onToggle: PropTypes.func.isRequired,
    editorState: PropTypes.instanceOf( EditorState ).isRequired
  };

  state = {
    file: null,
    entityKey: '',
    uploaderProps: {
      multiple: false,
      supportServerRender: true,
      action: itis.Function( this.props.url ) ? this.props.url() : this.props.url,
      data: itis.Function( this.props.data ) ? this.props.data() : this.props.data,
      onStart: ( file ) => this.handleStart( file ),
      onSuccess: ( response ) => this.handleSuccess( response ),
      onProgress: ( step ) => {
        this.handleProgess( Math.round( step.percent ));
      },
      onError: ( error ) => this.handleError( error )
    }
  };

  componentDidMount() {
    if ( this.props.getPost ) {
      this.props.getPost(( files ) => {
        files.forEach(( file ) => {
          this.uploader.refs.inner.post( file );
        });
      });
    }
  }

  componentWillUnmount() {
    const { file } = this.state;
    if ( file ) {
      this.uploader.abort( file );
    }
  }

  handleStart = ( file ) => {
    const { editorState, onToggle } = this.props;
    const editorStateWithFocus = this.getFocus( editorState );
    const contentState = editorStateWithFocus.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity( 'PICTURE', 'MUTABLE', {
      name: file.name, abort: () => { this.uploader.abort( file ); }
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set( editorStateWithFocus, { currentContent: contentStateWithEntity });
    onToggle( AtomicBlockUtils.insertAtomicBlock( newEditorState, entityKey, ' ' ));
    this.state.entityKey = entityKey;
    this.state.file = file;
  };

  handleProgess = ( percent ) => {
    const { entityKey } = this.state;
    const { editorState, onToggle } = this.props;
    const contentState = editorState.getCurrentContent().mergeEntityData( entityKey, { percent });
    const newEditorState = EditorState.set( editorState, { currentContent: contentState });
    onToggle( newEditorState );
  };

  handleSuccess = ( response ) => {
    const { entityKey } = this.state;
    const { editorState, beforeResponse, onToggle } = this.props;
    const success = ({ hashname }) => {
      const contentState = editorState.getCurrentContent().mergeEntityData( entityKey, {
        hashname, abort() {}
      });
      const newEditorState = EditorState.set( editorState, { currentContent: contentState });
      onToggle( newEditorState );
    };
    if ( beforeResponse ) {
      beforeResponse( response, success, this.handleError );
    } else {
      success( response );
    }
    this.state.file = null;
  };

  handleError = ( e ) => {
    const { entityKey } = this.state;
    const { editorState, onToggle } = this.props;
    const contentState = editorState.getCurrentContent().mergeEntityData( entityKey, {
      error: itis.String( e ) ? e : 'network error', abort() {}
    });
    const newEditorState = EditorState.set( editorState, { currentContent: contentState });
    onToggle( newEditorState );
    this.state.file = null;
  };

  getFocus = ( editorState ) => {
    const selection = editorState.getSelection();
    if ( !selection.getHasFocus()) {
      return EditorState.moveFocusToEnd( editorState );
    }
    return editorState;
  };

  render() {

    const { uploaderProps } = this.state;
    return (
      <Upload
        key="1"
        component="div"
        className={`${prefixCls}-toolbar`}
        ref={( c ) => { if ( c ) this.uploader = c; }}
        {...uploaderProps}>
        <Button
          id="picture"
          title="插入图片"
          label={<Icon type="picture" />} />
      </Upload>
    );
  }
}


export default PictureControls;

