// External Imports
import React, { Component } from 'react';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV2Eap from '../ChoroplethV2Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import './ChoroplethContainer.css';

class ChoroplethContainer extends Component {
  state = {};

  componentDidMount() {
    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    elements[0].setAttribute('style', 'width: 70%');
    Stickyfill.add(elements);
  }

  updateGraph = () => {};

  render() {
    return (
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          <ChoroplethV2Mongolia />
        </div>
      </div>
    );
  }
}

export default ChoroplethContainer;
