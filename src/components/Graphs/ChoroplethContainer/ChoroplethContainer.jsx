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
        .range(d3.schemeGreens[9]);

      const edEnrollColor = d3
        .scaleThreshold()
        .domain([0.5, 1.5, 2.8, 3.6, 5.5, 8.7, 12, 29, 56])
        .range(d3.schemeGreens[9]);

      const waterColor = d3
        .scaleThreshold()
        .domain([2.1, 7.6, 11.2, 13, 18.4, 26, 37, 60, 83])
        .range(d3.schemePurples[9]);

      const sanitation = d3
        .scaleThreshold()
        .domain([1.1, 3.5, 9.7, 12.7, 20, 29, 43, 66, 88])
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

  createLegend = (color) => {
    const svg = d3.select('.ChoroplethV2Eap-svg');

    const x = d3
      .scaleLinear()
      .domain(d3.extent(color.domain()))
      .rangeRound([600, 860]);

    const g = svg.append('g').attr('transform', 'translate(-537, 600)');

    g.selectAll('rect')
      .data(color.range().map((d) => color.invertExtent(d)))
      .enter()
      .append('rect')
      .attr('height', 15)
      .attr('x', (d) => x(d[0]))
      .attr('width', (d) => x(d[1]) - x(d[0]))
      .attr('fill', (d) => color(d[0]));

    g.append('text')
      .attr('class', 'caption')
      .attr('x', x.range()[0])
      .attr('y', -6)
      .attr('fill', '#000')
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold')
      .text('hi');

    g.call(
      d3
        .axisBottom(x)
        .tickSize(13)
        .tickFormat(d3.format(''))
        .tickValues(
          color
            .range()
            .slice(1)
            .map((d) => color.invertExtent(d)[0])
        )
    )
      .select('.domain')
      .remove();
  };

  updateGraph = (type, i) => {
    const { colors, choroplethDataObj } = this.state;
    const color = colors[type];
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

    this.createLegend(color);
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
