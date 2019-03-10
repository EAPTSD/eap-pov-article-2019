// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import BarGraphV2 from '../BarGraphV2';
import BarGraphPercentageV2 from '../BarGraphPercentageV2';
import './BarGraphContainer.css';

class BarGraphContainer extends Component {
  state = {
    data: [],
    displayText: '',
    formattedClassData: [],
    index: 0,
    percentageData: [],
  };

  componentDidMount() {
    const elements = document.querySelectorAll('.BarGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = () => {};

  render() {
    return (
      <div>
        <div className="BarGraphContainer-sequence-container BarGraphContainer-sticky container-fluid">
          <div className="BarGraphContainer-container row">
            <div className="col-sm">
              <BarGraphV2 />
            </div>
            <div className="col-sm">
              <BarGraphPercentageV2 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BarGraphContainer;
