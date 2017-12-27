

import React from 'react';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { BlockTypesControls, blockClassName, editorBlockRenderer, blockRenderMap } from './components/block-types';
import { InlineStylesControls, customStyles } from './components/inline-style';
import { LinkControls } from './components/link';
import { PictureControls, AttachmentControls } from './components/upload';
import Affix from './components/affix';
import { createEditorState, isES } from './utils';
import { prefixCls } from './config';


const preventDefault = ( e ) => e.preventDefault();

const defaultToolbar = {
  blockTypes: [
    'header',
    'code-block',
    'blockquote',
    'unordered-list-item',
    'ordered-list-item'
  ],
  inlineStyles: [
    'BOLD',
    'ITALIC',
    'UNDERLINE',
    'STRIKETHROUGH',
    'FONTFAMILY',
    'FONTSIZE',
    'FONTCOLOR',
    'FONTBACKGROUNTCOLOR'
  ],
  entity: [
    'link',
    'picture',
    // 'attachment'
  ]
};


function getEntities({ entity, uploadConfig, getPost, ...props }) {
  return entity.map(( key ) => {
    if ( key === 'link' ) {
      return (
        <LinkControls key="link" {...props} />
      );
    } else if ( key === 'picture' ) {
      return (
        <PictureControls key="picture" {...uploadConfig} getPost={getPost} {...props} />
      );
    } else if ( key === 'attachment' ) {
      return (
        <AttachmentControls key="attachment" {...uploadConfig} {...props} />
      );
    }
    return null;
  }).filter(( entity ) => entity );
}


class RichEditor extends React.Component {

  static propTypes = {
    tabIndex: PropTypes.number,
    value: PropTypes.instanceOf( EditorState ),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object
    ]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    toolbar: PropTypes.shape({
      blockTypes: PropTypes.arrayOf( PropTypes.string ),
      inlineStyles: PropTypes.arrayOf( PropTypes.string ),
      entity: PropTypes.arrayOf( PropTypes.string )
    }),
    // picture {
    //  onDelete, onCreate
    // }
    component: PropTypes.object, // eslint-disable-line
    uploadConfig: PropTypes.shape({
      url: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ]).isRequired,
      data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
      ]),
      beforeResponse: PropTypes.func
    })
  };

  static defaultProps = {
    component: {},
    uploadConfig: {},
    toolbar: defaultToolbar
  };

  state = {
    editorState: null
  };

  componentWillMount() {
    const { value, defaultValue } = this.props;
    if ( value ) {
      this.setEditorState( value );
    } else if ( defaultValue ) {
      this.setEditorState( defaultValue );
    } else {
      this.setEditorState( '' );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.value ) {
      this.setEditorState( nextProps.value );
    } else if ( isES( nextProps.defaultValue )) {
      this.setEditorState( nextProps.defaultValue );
    } else if ( !this.props.defaultValue && nextProps.defaultValue ) {
      this.setEditorState( nextProps.defaultValue );
    }
  }

  onTab = ( e ) => {
    const maxDepth = 4;
    this.handleChange( RichUtils.onTab( e, this.state.editorState, maxDepth ));
  };

  handleChange = ( editorState ) => {
    if ( this.props.onChange ) {
      this.props.onChange( editorState );
    } else {
      this.setState({ editorState });
    }
  };

  handleKeyCommand = ( command ) => {
    const { editorState } = this.state;
    const nextState = RichUtils.handleKeyCommand( editorState, command );
    if ( nextState ) {
      this.handleChange( nextState );
      return true;
    }
    return false;
  };

  handleFocus = ( e ) => {
    if ( e.target === e.currentTarget ) {
      if ( e.type.toLowerCase() === 'mousedown' ) {
        preventDefault( e );
      } else {
        const { editorState } = this.state;
        this.handleChange( EditorState.moveFocusToEnd( editorState ));
      }
    }
  };

  setEditorState( content ) {
    this.state.editorState = createEditorState( content );
  }

  setDomEditorRef = ( editor ) => {
    this.domEditor = editor;
  };

  getPost = ( post ) => {
    this.postFiles = post;
  };

  render() {

    const { editorState } = this.state;
    const { placeholder, tabIndex, toolbar, uploadConfig,
      className, component } = this.props;
    const { blockTypes, inlineStyles, entity } = toolbar;
    const clsnames = classNames( `${prefixCls}-root ${prefixCls}-cf`, className );
    const props = omit( this.props, [
      'value', 'defaultValue', 'onChange', 'placeholder', 'toolbar',
      'className', 'uploadConfig', 'component'
    ]);
    const blockPorps = {
      getEditorState() {
        return editorState;
      },
      setEditorState: ( editorState ) => {
        this.handleChange( editorState );
      },
      fileurl: uploadConfig.fileurl,
      component
    };
    return (
      <div className={clsnames} {...props}>
        <Affix />
        <div className={`${prefixCls}-toolbar-wrap`}>
          {Object.keys( toolbar ).map(( key ) => {
            if ( key === 'blockTypes' ) {
              return blockTypes && blockTypes.length ? (
                <BlockTypesControls
                  key="blockTypes"
                  types={blockTypes}
                  editorState={editorState}
                  onToggle={this.handleChange} />
              ) : null;
            } else if ( key === 'inlineStyles' ) {
              return inlineStyles && inlineStyles.length ? (
                <InlineStylesControls
                  key="inlineStyles"
                  styles={inlineStyles}
                  editorState={editorState}
                  onToggle={this.handleChange} />
              ) : null;
            } else if ( key === 'entity' ) {
              return entity ? getEntities({
                entity, editorState, uploadConfig, getPost: this.getPost, onToggle: this.handleChange
              }) : null;
            }
            return null;
          }).filter(( elem ) => elem )}
        </div>
        <div
          className={`${prefixCls}-editor`}
          onMouseDown={this.handleFocus}
          onClick={this.handleFocus}>
          <div className={`${prefixCls}-stay-bar`} />
          <Editor
            // onBlur={() => {
            //   console.log('onBlur')
            // }}
            // onFocus={() => {
            //   console.log('onFocus')
            // }}
            onTab={this.onTab}
            tabIndex={tabIndex}
            editorState={editorState}
            placeholder={placeholder}
            ref={this.setDomEditorRef}
            onChange={this.handleChange}
            customStyleMap={customStyles}
            blockStyleFn={blockClassName}
            handleDrop={( selection_, dataTransfer_, isInternal_ ) => {
              return 'handled';
            }}
            handlePastedFiles={( files ) => {
              this.postFiles( files );
              return 'handled';
            }}
            handleDroppedFiles={( selection_, files ) => {
              this.postFiles( files );
              return 'handled';
            }}
            blockRenderMap={blockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
            blockRendererFn={editorBlockRenderer( blockPorps )} />
        </div>
      </div>
    );
  }
}

export default RichEditor;
