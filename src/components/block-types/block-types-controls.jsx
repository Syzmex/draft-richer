

import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { blockTypes } from './block-types';
import styles from '../toolbar.less';


// 块元素控制器
function BlockTypesControls ( props ) {

  const
    { editorState } = props,
    selection = editorState.getSelection(),
    blockType = editorState
      .getCurrentContent()
      .getBlockForKey( selection.getStartKey() )
      .getType(),

    // 点击回调
    handleToggle = ( type ) => {
      props.onToggle(
        RichUtils.toggleBlockType( editorState, type )
      );
    },

    // 激活状态判断
    isAvtive = ( blockType, type ) => {
      if ( Array.isArray( type ) ) {
        return (
          editorState.getSelection().getHasFocus() && type.includes( blockType )
        );
      }
      return (
        editorState.getSelection().getHasFocus() && type === blockType
      );
    };

  return (
    <div className={styles.wrapper}>
      {( Array.isArray( props.types ) ? props.types : Object.keys( blockTypes ) ).map( key => {
        const
          type = blockTypes[ key ],
          Element = type.Element,
          typeName = Array.isArray( type.type ) ? blockType : type.type
        return (
          <Element
            key={key}
            id={typeName}
            label={type.label}
            title={type.title}
            onToggle={handleToggle}
            active={isAvtive( blockType, type.type )} />
        );
      } )}
    </div>
  );
}


BlockTypesControls.propTypes = {
  types: React.PropTypes.array,
  onToggle: React.PropTypes.func.isRequired,
  editorState: React.PropTypes.instanceOf( EditorState ).isRequired
};


export default BlockTypesControls;

