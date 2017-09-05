import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class TreeMapViz extends Component {
  render() {
    return (
      <div className="intro">
        <Link to="/dashboard" className="intro__skip">{_t('intro.skip')}</Link>
        <div className="intro__image-wrapper">
          hhhh
        </div>

        <div className="intro__button-flex-container">
             <Link to={this.props.nextUrl} className="intro__next-button">{_t('intro.next')}</Link>
        </div>
        
      </div>
    );
  }
}

export default TreeMapViz;