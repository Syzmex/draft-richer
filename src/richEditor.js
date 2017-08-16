

import React from 'react';
import omit from 'omit.js';
import itis from 'whatitis';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { BlockTypesControls, blockClassName, blockRenderer, blockRenderMap } from './components/block-types';
import { InlineStylesControls, customStyles } from './components/inline-style';
import { LinkControls } from './components/link';
import { createEditorState } from './utils';
import { prefixCls } from './config';


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
    'link'
  ]
};

const isES = itis.isItClass( EditorState );

class RichEditor extends React.Component {

  static propTypes = {
    value: PropTypes.instanceOf( EditorState ),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.instanceOf( EditorState )
    ]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    toolbar: PropTypes.shape({
      blockTypes: PropTypes.arrayOf( PropTypes.string ),
      inlineStyles: PropTypes.arrayOf( PropTypes.string ),
      entity: PropTypes.arrayOf( PropTypes.string )
    })
  };

  state = {
    editorState: null
  };

  componentWillMount() {
    const { value, defaultValue } = this.props;
    if ( isES( value )) {
      this.setEditorState( value );
    } else if ( defaultValue ) {
      this.setEditorState( defaultValue );
    } else {
      this.setEditorState( '' );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( isES( nextProps.value )) {
      this.setEditorState( nextProps.value );
    } else if ( isES( nextProps.defaultValue )) {
      this.setEditorState( nextProps.defaultValue );
    } else if ( !this.props.defaultValue && nextProps.defaultValue ) {
      this.setEditorState( nextProps.defaultValue );
    }
  }

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

  setEditorState( content ) {
    this.state.editorState = createEditorState( content );
  }

  focus = () => {
    // this.refs.editor.focus();
  };

  render() {

    const { editorState } = this.state;
    const { placeholder, toolbar = defaultToolbar, className } = this.props;
    const { blockTypes, inlineStyles, entity } = toolbar;
    const clsnames = classNames( `${prefixCls}-root`, className );
    const props = omit( this.props, [
      'value', 'defaultValue', 'onChange', 'placeholder', 'toolbar', 'className'
    ]);
    return (
      <div className={clsnames} {...props}>
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
            return entity && entity.includes( 'link' ) ? (
              <LinkControls
                key="link"
                editorState={editorState}
                onToggle={this.handleChange} />
            ) : null;
          }
          return null;
        }).filter(( elem ) => elem )}
        <div className={`${prefixCls}-editor`} onClick={this.focus}>
          <Editor
            editorState={editorState}
            placeholder={placeholder}
            onChange={this.handleChange}
            customStyleMap={customStyles}
            blockStyleFn={blockClassName}
            blockRenderMap={blockRenderMap}
            blockRendererFn={blockRenderer}
            handleKeyCommand={this.handleKeyCommand} />
        </div>
      </div>
    );
  }
}

export default RichEditor;
