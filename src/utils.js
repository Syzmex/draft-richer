
import itis from 'whatitis';
import invariant from 'invariant';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import decorator from './components/decorator';


const isES = itis.isItClass( EditorState );

export const getRaw = ( editorState ) => {
  invariant(
    isES( editorState ),
    'Draft-Richer: Expecting editorState of getRaw() is an EditorState in instanceof check.'
  );
  return convertToRaw( editorState.getCurrentContent());
};

export const createEditorState = ( content ) => {

  if ( isES( content )) {
    return content;
  }

  invariant(
    itis.String( content ) || itis.Number( content ) || itis.PlainObject( content ),
    'Draft-Richer: Expecting content of createEditorState is an String or Number or Raw in instanceof check.'
  );

  let contentState;

  if ( itis.PlainObject( content )) {
    try {
      contentState = convertFromRaw( content );
    } catch ( e ) {
      // eslint-disable-next-line
      console.error( 'Draft-Richer: A error has occurred when convert data from Raw.\n', e );
    }
  } else {
    contentState = ContentState.createFromText( `${content}` );
  }

  return contentState
    ? EditorState.createWithContent( contentState, decorator )
    : EditorState.createEmpty( decorator );
};
