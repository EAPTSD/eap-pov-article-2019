// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV2Eap from '../ChoroplethV2Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import choroplethDataToObj from '../../../utilities/choroplethDataToObj';
import './ChoroplethContainer.css';

// Data
import choroplethData from '../../../data/ChoroplethData/choropleth_data.csv';

class ChoroplethContainer extends Component {
  state = {
    color: null,
    choroplethDataObj: null,
    index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  };

  componentDidMount() {
    Promise.all([d3.csv(choroplethData)]).then((files) => {
      const choroplethDataObj = choroplethDataToObj(files[0]);
      const color = d3
        .scaleQuantize()
        .domain([0, 55])
        .range(d3.schemeBlues[9]);
      console.log(choroplethDataObj);
      this.setState({
        color: color,
        choroplethDataObj: choroplethDataObj,
      });
    });
    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (i) => {
    const { color, choroplethDataObj } = this.state;
    const subNation = d3.selectAll('path.sub-nation');
    if (i === 0) {
      subNation.attr('fill', 'lightgrey');
      return;
    }
    subNation.attr('fill', (d) => {
      console.log(d);
      const colorValue = choroplethDataObj[d.properties.ADM1_CODE].pov190;
      console.log(d.properties.ADM0_NAME);
      console.log(colorValue);
      if (colorValue === '-1') return 'lightgrey';
      return color(colorValue);
    });
  };

  render() {
    const { index } = this.state;
    return (
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          <ChoroplethV2Mongolia />
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
