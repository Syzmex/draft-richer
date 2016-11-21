

import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { blockTypes } from './block-types';
import styles from './block-types.less';


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
    <div className={styles.wraper}>
      {( Array.isArray( props.types ) ? props.types : Object.keys( blockTypes ) ).map( style => {
        const
          type = blockTypes[ style ],
          Element = type.Element;
        return (
          <Element
            key={style}
            type={blockType}
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

