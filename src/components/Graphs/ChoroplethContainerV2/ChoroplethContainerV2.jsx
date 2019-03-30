// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV3Eap from '../ChoroplethV3Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import getRandomInt from '../../../utilities/getRandomInt';
import './ChoroplethContainerV2.css';

class ChoroplethContainerV2 extends Component {
  state = {
    color: null,
    index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);

    this.setState({ color: color });

    const elements = document.querySelectorAll('.ChoroplethContainerV2-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (i) => {
    const { color } = this.state;
    const subNation = d3.selectAll('path.sub-nation');
    if (i === 0) {
      subNation.attr('fill', (d) => 'lightgrey');
      return;
    }
    subNation.attr('fill', (d) => color(getRandomInt(11)));
  };

  render() {
    const { index } = this.state;
    return (
      <div className="ChoroplethContainerV2-sequence-container">
        <div className="ChoroplethContainerV2-container ChoroplethContainerV2-sticky">
          <ChoroplethV3Eap />
          <ChoroplethV2Mongolia />
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="ChoroplethContainerV2-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(i)} />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChoroplethContainerV2;
