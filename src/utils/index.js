
import itis from 'whatitis';
import invariant from 'invariant';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { articleDecorator, editorDecorator } from '../components/decorator';


// 对象类型判断
export const isEditorState = itis.isItClass( EditorState );
export const isContentState = itis.isItClass( ContentState );
export const isES = isEditorState;
export const isCS = isContentState;

const createEditorStateFromContent = ( isArticle ) => ( content ) => {

  if ( isES( content )) {
    return content;
  }

  invariant(
    itis.String( content ) || itis.Number( content ) || itis.PlainObject( content ),
    'Draft-Richer: Expecting content of createEditorState is a string or number or raw.'
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
    ? EditorState.createWithContent( contentState, isArticle ? articleDecorator : editorDecorator )
    : EditorState.createEmpty( isArticle ? articleDecorator : editorDecorator );
};

// 创建 editorState 浏览用
export const createArticleState = createEditorStateFromContent( true );

// 创建 editorState 编辑用
export const createEditorState = createEditorStateFromContent( false );

// 通过 editorState 获取 Raw
export const getRaw = ( editorState ) => {
  invariant(
    isEditorState( editorState ),
    'Draft-Richer: Expecting editorState of getRaw is EditorState in instanceof check.'
  );
  return convertToRaw( editorState.getCurrentContent());
};

// 浏览器判断 for ssr and csr
export const browser = ( function() {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const makeArray = ( some ) => {
      return !Array.isArray( some ) ? [some] : some;
    };
    const regexps = {
      ie: [ /rv:([\d.]+)\) like gecko/, /msie ([\d.]+)/ ],
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return Object.entries( regexps ).reduce(( env, [ key, regexps ]) => {
      makeArray( regexps )
        .map(( regexp ) => userAgent.match( regexp ))
        .filter(( s ) => s )
        .forEach(( s ) => {
          env[key] = s[1];
        });
      return env;
    }, {});
  } catch ( e ) {
    return {};
  }
}());

// rAF-shim for ssr and csr
export const requestAnimationFrame = ( function() {
  try {
    let lastTime = 0;
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function( callback ) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max( 0, 16.7 - ( currTime - lastTime ));
        const id = window.setTimeout(() => {
          callback( currTime + timeToCall );
        }, timeToCall );
        lastTime = currTime + timeToCall;
        return id;
      };
    return window.requestAnimationFrame;
  } catch ( e ) {
    return () => { return 0; };
  }
}());

export const cancelAnimationFrame = ( function() {
  try {
    window.cancelAnimationFrame =
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      function( id ) {
        clearTimeout( id );
      };
    return window.cancelAnimationFrame;
  } catch ( e ) {
    return () => {};
  }
}());

export const cancelAnimFrame = ( id ) => {

  invariant(
    itis.Number( id ),
    'Draft-Richer: Expecting id of cancelAnimFrame is a number.'
  );

  return cancelAnimationFrame( id );
};

export const requestAnimFrame = ( callback ) => {

  invariant(
    itis.Function( callback ),
    'Draft-Richer: Expecting callback of requestAnimFrame is a function.'
  );

  let id;
  const cancel = () => cancelAnimFrame( id );
  id = requestAnimationFrame( function frameCallback( time ) { // eslint-disable-line
    callback( time, cancel );
    id = requestAnimationFrame( frameCallback );
  });

  return { cancel };
};
