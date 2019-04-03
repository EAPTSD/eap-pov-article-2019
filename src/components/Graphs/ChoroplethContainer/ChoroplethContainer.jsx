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
    colors: {},
    choroplethDataObj: null,
    types: [
      'start',
      'pov190',
      'pov320',
      'pov550',
      'edAttain',
      'edEnroll',
      'water',
      'sanitation',
      'end',
    ],
  };

  componentDidMount() {
    Promise.all([d3.csv(choroplethData)]).then((files) => {
      const choroplethDataObj = choroplethDataToObj(files[0]);

      const pov190Color = d3
        .scaleQuantize()
        .domain([0, 45])
        .range(d3.schemeBlues[9]);

      const pov320Color = d3
        .scaleQuantize()
        .domain([0, 85])
        .range(d3.schemeBlues[9]);

      const pov550Color = d3
        .scaleQuantize()
        .domain([0, 97])
        .range(d3.schemeBlues[9]);

      const edAttainColor = d3
        .scaleQuantize()
        .domain([0, 39])
        .range(d3.schemeGreens[9]);

      const edEnrollColor = d3
        .scaleQuantize()
        .domain([0, 56])
        .range(d3.schemeGreens[9]);

      const waterColor = d3
        .scaleQuantize()
        .domain([0, 83])
        .range(d3.schemePurples[9]);

      const sanitation = d3
        .scaleQuantize()
        .domain([0, 88])
        .range(d3.schemeReds[9]);

      const colors = {
        pov190: pov190Color,
        pov320: pov320Color,
        pov550: pov550Color,
        edAttain: edAttainColor,
        edEnroll: edEnrollColor,
        water: waterColor,
        sanitation: sanitation,
      };

      this.setState({
        colors: colors,
        choroplethDataObj: choroplethDataObj,
      });
    });

    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (type, i) => {
    console.log(type);
    const { colors, choroplethDataObj } = this.state;
    const color = colors[type];
    console.log(color);
    const subNation = d3.selectAll('path.sub-nation');
    if (i === 0) {
      subNation.attr('fill', 'lightgrey');
      return;
    }
    subNation.attr('fill', (d) => {
      console.log(d.properties.ADM1_CODE);
      const colorValue = choroplethDataObj[d.properties.ADM1_CODE][type];
      console.log(colorValue);
      if (colorValue === '-1') return 'lightgrey';
      return color(colorValue);
    });
  };

  render() {
    const { types } = this.state;
    return (
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          <ChoroplethV2Mongolia />
        </div>
        {types.map((type, i) => {
          return (
            <>
              <div className="ChoroplethContainer-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(type, i)} />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChoroplethContainer;
