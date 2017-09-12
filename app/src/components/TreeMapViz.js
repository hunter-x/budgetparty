import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Translate    from 'react-translate-component';
const _t = Translate.translate;
import TreeMap from "react-d3-treemap";
// Include its styles in you build process as well
import "react-d3-treemap/dist/react.d3.treemap.css";
import data from "../data/treemap"

class TreeMapViz extends Component {

  render() {

    return (
      <div className="intro">
        <Link to="/dashboard" className="intro__skip">{_t('intro.skip')}</Link>
        <div className="intro__image-wrapper">
        <TreeMap
        height={400}
        width={400}
        data={data}
        valueUnit={"dt"}
    />
        </div>

        <div className="intro__button-flex-container">
             <Link to={this.props.nextUrl} className="intro__next-button">{_t('intro.next')}</Link>
        </div>
        
      </div>
    );
  }
}

export default TreeMapViz;