
import React from 'react';
import omit from 'omit.js';
import { EditorPicture, ArticlePicture } from './picture';


export class EditorAtomic extends React.Component {

  render() {
    const { contentState, block, blockProps } = this.props;
    const newProps = omit( blockProps, ['component']);
    const entityKey = block.getEntityAt( 0 );
    const entity = contentState.getEntity( entityKey );
    const data = entity.getData();
    const type = entity.getType();
    let media = null;
    if ( type.toLowerCase() === 'audio' ) {
      media = <Audio src={src} />;
    } else if ( type.toLowerCase() === 'picture' ) {
      const picture = blockProps.component.picture;
      media = <EditorPicture {...data} {...newProps} {...picture} contentState={contentState} entityKey={entityKey} />;
    } else if ( type.toLowerCase() === 'video' ) {
      media = <Video src={src} />;
    }
    return media;
  }
}

export class ArticleAtomic extends React.Component {

  render() {
    const { contentState, block, blockProps } = this.props;
    const newProps = omit( blockProps, ['component']);
    const entityKey = block.getEntityAt( 0 );
    const entity = contentState.getEntity( entityKey );
    const data = entity.getData();
    const type = entity.getType();
    let media = null;
    if ( type.toLowerCase() === 'audio' ) {
      media = <Audio src={src} />;
    } else if ( type.toLowerCase() === 'picture' ) {
      media = <ArticlePicture {...data} {...newProps} />;
    } else if ( type.toLowerCase() === 'video' ) {
      media = <Video src={src} />;
    }
    return media;
  }
}
