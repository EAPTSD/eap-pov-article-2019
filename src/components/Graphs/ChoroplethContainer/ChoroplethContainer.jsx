// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { legendColor, legendHelpers } from 'd3-svg-legend';
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
        .scaleThreshold()
        .domain([0.5, 1.2, 2.3, 6.8, 11.3, 15.6, 25.2, 44, 55])
        .range(d3.schemeBlues[9]);

      const pov320Color = d3
        .scaleThreshold()
        .domain([1, 6, 12, 22, 30, 36, 46, 63, 85])
        .range(d3.schemeBlues[9]);

      const pov550Color = d3
        .scaleThreshold()
        .domain([5, 28, 42, 56, 62, 70, 75, 87, 97])
        .range(d3.schemeBlues[9]);

      const edAttainColor = d3
        .scaleThreshold()
        .domain([0.8, 1.9, 3.6, 5.3, 7, 11, 15, 25, 39])
        .range(d3.schemeReds[9]);

      const edEnrollColor = d3
        .scaleThreshold()
        .domain([0.5, 1.5, 2.8, 3.6, 5.5, 8.7, 12, 29, 56])
        .range(d3.schemeReds[9]);

      const waterColor = d3
        .scaleThreshold()
        .domain([2.1, 7.6, 11.2, 13, 18.4, 26, 37, 60, 83])
        .range(d3.schemeGreens[9]);

      const sanitation = d3
        .scaleThreshold()
        .domain([1.1, 3.5, 9.7, 12.7, 20, 29, 43, 66, 88])
        .range(d3.schemePurples[9]);

      const colors = {
        pov190: pov190Color,
        pov320: pov320Color,
        pov550: pov550Color,
        edAttain: edAttainColor,
        edEnroll: edEnrollColor,
        water: waterColor,
        sanitation: sanitation,
      };

      this.createLegend(pov190Color);
      this.setState({
        colors: colors,
        choroplethDataObj: choroplethDataObj,
      });
    });

    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    Stickyfill.add(elements);
  }

  createLegend = (color) => {
    const svg = d3.select('.ChoroplethV2Eap-svg');

    const thresholdScale = d3
      .scaleThreshold()
      .domain(color.domain())
      .range(color.range());

    svg
      .append('g')
      .attr('class', 'Choropleth-legend')
      .attr('transform', 'translate(7, 450)')
      .attr('visibility', 'hidden');

    const legend = legendColor()
      .labelFormat(d3.format('.2f'))
      .labels(legendHelpers.thresholdLabels)
      .scale(thresholdScale);

    svg.select('.Choropleth-legend').call(legend);
  };

  // update
  updateLegend = (color, isVisible = false) => {
    const legend = d3.select('.Choropleth-legend');

    const visibility = isVisible ? 'visible' : 'hidden';

    legend.attr('visibility', visibility);

    if (!color) return;

    const thresholdScale = d3
      .scaleThreshold()
      .domain(color.domain())
      .range(color.range());

    const legendUpdate = legendColor()
      .labelFormat(d3.format('.2f'))
      .labels(legendHelpers.thresholdLabels)
      .scale(thresholdScale);

    legend.call(legendUpdate);
  };

  updateGraph = (type, i) => {
    const { colors, choroplethDataObj } = this.state;
    const color = colors[type];
    const isVisible = i === 0 ? false : true;

    this.updateLegend(color, isVisible);

    const subNation = d3.selectAll('path.sub-nation');
    if (i === 0) {
      subNation.attr('fill', 'lightgrey');
      return;
    }
    subNation.attr('fill', (d) => {
      const colorValue = choroplethDataObj[d.properties.ADM1_CODE][type];
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
