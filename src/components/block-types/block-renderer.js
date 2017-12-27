
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import { EditorAtomic, ArticleAtomic } from './atomic';
import { prefixCls } from '../../config';


// blocktype 组件渲染函数
export const editorBlockRenderer = ( blockPorps ) => ( contentBlock ) => {
  const type = contentBlock.getType();
  if ( type === 'atomic' ) {
    return {
      component: EditorAtomic,
      editable: true,
      props: blockPorps
    };
  }
  return null;
};

export const articleBlockRenderer = ( blockPorps ) => ( contentBlock ) => {
  const type = contentBlock.getType();
  if ( type === 'atomic' ) {
    return {
      component: ArticleAtomic,
      editable: false,
      props: blockPorps
    };
  }
  return null;
};

export const blockRenderMap = DefaultDraftBlockRenderMap.merge( Map({
  'code-block': {
    element: 'pre'
  }
}));


// 设置 blocktype 的样式
export function blockClassName( block ) {
  switch ( block.getType()) {
    case 'blockquote':
      return `${prefixCls}-blockquote`;
    case 'code-block':
      return `${prefixCls}-code`;
    default:
      return null;
  }
}
