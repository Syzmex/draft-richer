

import React from 'react';
import { Entity } from 'draft-js';


const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0'
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0'
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0'
  }
};


function getDecoratedStyle ( mutability ) {
  switch ( mutability ) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}


export function getTokenStrategy ( mutability ) {
  return function ( contentBlock, callback ) {
    contentBlock.findEntityRanges( character => {
      const
        entityKey = character.getEntity(),
        entity = entityKey && Entity.get( entityKey );
      return (
        entity &&
        entity.getType() === 'TOKEN' &&
        entity.getMutability() === mutability
      );
    }, callback );
  };
}


export const TokenSpan = props => {

  const style = getDecoratedStyle(
    Entity.get( props.entityKey ).getMutability()
  );

  return (
    <span {...props} style={style}>
      {props.children}
    </span>
  );

};

