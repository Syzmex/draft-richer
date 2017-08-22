
import { CompositeDecorator } from 'draft-js';
import { TokenSpan, getTokenStrategy } from './token';
import { Link, findLinkEntities } from './link';


export const articleDecorator = new CompositeDecorator([{
  strategy: getTokenStrategy( 'IMMUTABLE' ),
  component: TokenSpan
}, {
  strategy: getTokenStrategy( 'MUTABLE' ),
  component: TokenSpan
}, {
  strategy: getTokenStrategy( 'SEGMENTED' ),
  component: TokenSpan
}, {
  strategy: findLinkEntities,
  component: Link
}]);

export const editorDecorator = new CompositeDecorator([{
  strategy: getTokenStrategy( 'IMMUTABLE' ),
  component: TokenSpan
}, {
  strategy: getTokenStrategy( 'MUTABLE' ),
  component: TokenSpan
}, {
  strategy: getTokenStrategy( 'SEGMENTED' ),
  component: TokenSpan
}, {
  strategy: findLinkEntities,
  component: Link
}]);
