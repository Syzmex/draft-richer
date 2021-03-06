
import React from 'react';
import itis from 'whatitis';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { EditorState } from 'draft-js';
import Resizable from 'react-resizable-box';
import { get } from 'rc-util/lib/Dom/css';
import Button from '../button';
import { prefixCls } from '../../config';
import imgLoader from '../../utils/img-loader';


export class EditorPicture extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    hashname: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    abort: PropTypes.func,
    align: PropTypes.string,
    percent: PropTypes.number,
    error: PropTypes.string,
    onDelete: PropTypes.func,
    onCreate: PropTypes.func
  };

  // static defaultProps = {
  //   url: '//img3.tbcdn.cn/tfscom/TB16AZoKpXXXXaTXFXXSutbFXXX.jpg_200x200.jpg'
  // }

  state = {
    unit: '%',
    showPanel: false,
    enable: {
      top: false,
      right: false,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }
  };

  componentDidMount() {
    const { name, hashname } = this.props;
    if ( name && hashname ) {
      this.preLoad( this.props );
    }
  }

  componentWillReceiveProps( nextProps ) {
    if ( !this.props.hashname && nextProps.hashname ) {
      this.preLoad( nextProps );
    }
  }

  componentWillUnmount() {
    const { name, hashname } = this.props;
    if ( this.props.onDelete ) {
      this.props.onDelete({ name, hashname });
    }
    if ( this.props.abort ) {
      this.props.abort();
    }
  }

  handleResize = ( event_, direction_, refToElement, delta_ ) => {
    const { unit } = this.state;
    const parentWidth = get( this.wrap, 'width' );
    if ( unit === '%' ) {
      this.updateData({
        width: `${Math.round( Math.min( 1, get( refToElement, 'width' ) / parentWidth ) * 100 )}%`,
        height: 'auto'
      });
    } else {
      this.updateData({
        width: Math.min( get( refToElement, 'width' ), parentWidth ),
        height: get( refToElement, 'height' )
      });
    }
  };

  handleUnitChange = () => {
    // const { unit } = this.state;
    // const { width } = this.props;
    // const parentWidth = get( this.wrap, 'width' );
    // if ( unit === '%' ) {
    //   this.updateData({
    //     width: Math.round( parseFloat( width.replace( /%$/, '' )) / 100 * parentWidth )
    //   });
    //   this.setState({ unit: 'px' });
    // } else {
    //   this.updateData({
    //     width: `${Math.round( Math.min( 1, width / parentWidth ) * 100 )}%`
    //   });
    //   this.setState({ unit: '%' });
    // }
  };

  handleAlignChange = ( align ) => {
    const { unit } = this.props;
    const { align: alignProp } = this.props;
    if ( alignProp === align ) {
      this.updateData({ align: '' });
    } else {
      this.updateData({ align });
      if ( unit === '%' && ( align === 'left' || align === 'right' )) {
        this.handleUnitChange();
      }
    }
  };

  getSize = ( img, width ) => {
    const { unit } = this.state;
    const rate = img.height / img.width;
    const parentWidth = get( this.wrap, 'width' );
    // width = '%'
    if ( itis.String( width ) && /%$/.test( width )) {
      if ( unit === '%' ) {
        return {
          width,
          height: 'auto'
        };
      }
      return {
        width: Math.round( parseFloat( width.replace( /%$/, '' )) / 100 * parentWidth ),
        height: 'auto'
      };

    // width = 'px'
    } else if ( itis.Number( width ) || itis.String( width ) && /px$/.test( width )) {
      let nWidth;
      if ( itis.String( width ) && /px$/.test( width )) {
        nWidth = parseFloat( width.replace( /px$/, '' ));
      } else {
        nWidth = width;
      }
      if ( unit === '%' ) {
        return {
          width: `${Math.round( Math.min( 1, nWidth / parentWidth ) * 100 )}%`,
          height: 'auto'
        };
      }
      return {
        width: Math.min( nWidth, parentWidth ),
        height: Math.min( rate * nWidth, rate * parentWidth )
      };
    }

    // width = ''
    if ( unit === '%' ) {
      return {
        width: `${Math.round( Math.min( 1, img.width / parentWidth ) * 100 )}%`,
        height: 'auto'
      };
    }
    return {
      width: Math.min( img.width, parentWidth ),
      height: Math.min( img.height, rate * parentWidth )
    };
  };

  updateData = ( data ) => {
    const { contentState, entityKey, setEditorState, getEditorState } = this.props;
    const newContentState = contentState.mergeEntityData( entityKey, data );
    const newEditorState = EditorState.set( getEditorState(), { currentContent: newContentState });
    setEditorState( newEditorState );
  };

  preLoad = ( props ) => {
    let size;
    const { name, hashname, width, onCreate, fileurl } = props;
    const url = fileurl({ hashname });
    imgLoader( url, ( img ) => {
      size = this.getSize( img, width );
      this.resizable.updateSize({
        width: size.width,
        height: size.height
      });
      this.updateData({
        width: size.width,
        height: size.height
      });
    }, () => {
      if ( onCreate ) {
        onCreate({ name, hashname });
      }
      this.resizable.updateSize({
        width: size.width,
        height: 'auto'
      });
      this.updateData({
        width: size.width,
        height: size.height
      });
      this.setState({
        showPanel: true,
        enable: {
          top: false,
          right: true,
          bottom: true,
          left: true,
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false
        }
      });
    });
  };

  render() {
    const { enable, showPanel } = this.state;
    const { fileurl, name, hashname, width, align, percent, error } = this.props;
    const url = hashname ? fileurl({ hashname }) : '';
    const clsname = classnames( `${prefixCls}-picture`, {
      [`${prefixCls}-picture-left`]: align === 'left',
      [`${prefixCls}-picture-center`]: align === 'center',
      [`${prefixCls}-picture-right`]: align === 'right',
      [`${prefixCls}-picture-inline`]: align === 'inline',
      [`${prefixCls}-picture-uploading`]: !hashname && !error,
      [`${prefixCls}-picture-error`]: !!error
    });
    const editpanel = (
      <div className={`${prefixCls}-picture-panel`}>
        <Button
          id="width"
          title="宽度"
          label={itis.Number( width ) ? `${width}px` : width}
          onToggle={this.handleUnitChange} />
{/*        <Button
          id="left"
          title="左对齐"
          label="L"
          active={align === 'left'}
          onToggle={() => this.handleAlignChange( 'left' )} />
        <Button
          id="center"
          title="居中对齐"
          label="C"
          active={align === 'center'}
          onToggle={() => this.handleAlignChange( 'center' )} />
        <Button
          id="right"
          title="居右对齐"
          label="R"
          active={align === 'right'}
          onToggle={() => this.handleAlignChange( 'right' )} />*/}
      </div>
    );
    return (
      <div className={clsname} ref={( c ) => { if ( c ) this.wrap = c; }}>
        {hashname && !error ? (
          <Resizable
            height="auto"
            width={width}
            enable={enable}
            style={{ maxWidth: '100%' }}
            onResizeStop={this.handleResize}
            ref={( c ) => { if ( c ) this.resizable = c; }}>
            <img alt={name} src={url} style={{ width: '100%', height: 'auto' }} />
            {showPanel ? editpanel : null}
          </Resizable>
        ) : null}
        {!hashname && !error ? <div className={`${prefixCls}-picture-text`}>正在上传...{percent}%</div> : null}
        {!hashname && !error ? <div className={`${prefixCls}-picture-progress`} style={{ width: `${percent}%` }} /> : null}
        {!!error ? <div className={`${prefixCls}-picture-text`}>{error}</div> : null}
        {!!error ? <div className={`${prefixCls}-picture-progress`} /> : null}
      </div>
    );
  }
}

export class ArticlePicture extends React.Component {

  static propTypes = {
    fileurl: PropTypes.func
  };

  state = {
    url: ''
  };

  componentWillMount() {
    const { fileurl, hashname } = this.props;
    if ( hashname ) {
      const url = fileurl({ hashname });
      this.state.url = url;
    }
  }

  componentWillReceiveProps( nextProps ) {
    const { fileurl, hashname } = nextProps;
    if ( hashname && !this.props.hashname ) {
      const url = fileurl({ hashname });
      this.setState({ url });
    }
  }

  render() {
    const { url } = this.state;
    const { name, width, align } = this.props;
    const clsname = classnames( `${prefixCls}-picture`, {
      [`${prefixCls}-picture-left`]: align === 'left',
      [`${prefixCls}-picture-center`]: align === 'center',
      [`${prefixCls}-picture-right`]: align === 'right',
      [`${prefixCls}-picture-inline`]: align === 'inline'
    });
    return (
      <div className={clsname} style={{ width, height: 'auto', maxWidth: '100%' }}>
        {url ? <img alt={name} src={url} style={{ width: '100%', height: 'auto' }} /> : null}
      </div>
    );
  }
}
