// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV2Eap from '../ChoroplethV2Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import getRandomInt from '../../../utilities/getRandomInt';
import './ChoroplethContainer.css';

class ChoroplethContainer extends Component {
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

    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
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
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          {/* <ChoroplethV2Mongolia /> */}
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="ChoroplethContainer-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(i)} />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChoroplethContainer;
