
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { browser, requestAnimFrame } from '../utils';


function getScroll( w, top ) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if ( typeof ret !== 'number' ) {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if ( typeof ret !== 'number' ) {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset( element ) {
  const body = document.body;
  const rect = element.getBoundingClientRect();
  const clientTop = element.clientTop || body.clientTop || 0;
  const clientLeft = element.clientLeft || body.clientLeft || 0;
  const scrollTop = getScroll( window, true );
  const scrollLeft = getScroll( window );

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

class Affix extends React.Component {

  static propTypes = {
    target: PropTypes.element,
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number
  };

  constructor( props ) {
    super( props );
    this.state = {
      affixStyle: null,
      elemSize: null
    };
  }

  componentDidMount() {
    this.animFrame = requestAnimFrame( this.handleScroll );
  }

  componentWillUnmount() {
    if ( this.animFrame ) {
      this.animFrame.cancel();
      this.animFrame = null;
    }
  }

  handleScroll = e => {

    let { offsetTop, offsetBottom, offset } = this.props;
    const scrollTop = getScroll( window, true );
    const scrollLeft = getScroll( window );
    const elem = ReactDOM.findDOMNode( this );
    const elemOffset = getOffset( elem );
    const boxSize = {
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };
    const elemSize = {
      width: ReactDOM.findDOMNode( this.refs.fixedNode ).offsetWidth,
      height: ReactDOM.findDOMNode( this.refs.fixedNode ).offsetHeight
    };

    const offsetMode = {};
    if ( typeof offsetTop !== 'number' && typeof offsetBottom !== 'number' ) {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    if ( scrollTop > elemOffset.top - offsetTop && offsetMode.top ) {
      // Fixed Top
      // rainx 运行窗口变化改变 left 值
      if (( !this.state.affixStyle || elemOffset.left - scrollLeft !== this.state.affixStyle.left ) || e.type === 'resize' ) {
        this.setState({
          affixStyle: {
            position: 'fixed',
            top: offsetTop,
            left: elemOffset.left - scrollLeft,
            width: `${boxSize.width}px`
          },
          elemSize: {
            width: `${elemSize.width}px`,
            height: `${elemSize.height}px`
          }
        });
      }
    } else if ( scrollTop < elemOffset.top + elemSize.height + offsetBottom - window.innerHeight &&
               offsetMode.bottom ) {
      // Fixed Bottom
      // rainx 运行窗口变化改变 left 值
      if ( !this.state.affixStyle || e.type === 'resize' ) {
        this.setState({
          affixStyle: {
            position: 'fixed',
            bottom: offsetBottom,
            left: elemOffset.left - scrollLeft,
            width: `${boxSize.width}px`
          },
          elemSize: {
            width: `${elemSize.width}px`,
            height: `${elemSize.height}px`
          }
        });
      }
    } else if ( this.state.affixStyle ) {
      this.setState({
        affixStyle: null,
        elemSize: null
      });
    }
  }

  render() {

    const { offsetTop, offsetBottom, ...props } = this.props;
    const className = classNames({
      'ant-affix': this.state.affixStyle
    });
    // rainx 保持原有的占用高度
    const size = this.state.elemSize ? {
      // width: this.state.elemSize.width,
      height: this.state.elemSize.height
    } : {};

    return (
      <div {...props} style={size}>
        <div className={className} ref="fixedNode" style={this.state.affixStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Affix;
