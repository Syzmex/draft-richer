
import React from 'react';
import { EditorPicture, ArticlePicture } from './picture';


export class EditorAtomic extends React.Component {

  render() {
    const { contentState, block, blockProps } = this.props;
    const entityKey = block.getEntityAt( 0 );
    const entity = contentState.getEntity( entityKey );
    const data = entity.getData();
    const type = entity.getType();
    let media = null;
    if ( type === 'audio' ) {
      media = <Audio src={src} />;
    } else if ( type === 'picture' ) {
      media = <EditorPicture {...data} {...blockProps} contentState={contentState} entityKey={entityKey} />;
    } else if ( type === 'video' ) {
      media = <Video src={src} />;
    }
    return media;
  }
}

export class ArticleAtomic extends React.Component {

  render() {
    const { contentState, block, blockProps } = this.props;
    const entityKey = block.getEntityAt( 0 );
    const entity = contentState.getEntity( entityKey );
    const data = entity.getData();
    const type = entity.getType();
    let media = null;
    if ( type === 'audio' ) {
      media = <Audio src={src} />;
    } else if ( type === 'PICTURE' ) {
      media = <ArticlePicture {...data} {...blockProps} />;
    } else if ( type === 'video' ) {
      media = <Video src={src} />;
    }
    return media;
  }
}
