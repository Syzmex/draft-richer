
import React from 'react';
import { prefixCls } from '../../config';

export const linkFilter = ( contentState ) => ( character ) => {
  const entityKey = character.getEntity();
  const entity = entityKey && contentState.getEntity( entityKey );
  return entity && entity.getType() === 'link';
};

export function findLinkEntities( contentBlock, callback, contentState ) {
  contentBlock.findEntityRanges( linkFilter( contentState ), callback );
}

export const Link = ({ entityKey, contentState, children }) => {
  const { url, target } = contentState.getEntity( entityKey ).getData();
  return (
    <a href={url} target={target} className={`${prefixCls}-link`}>
      {children}
    </a>
  );
};
