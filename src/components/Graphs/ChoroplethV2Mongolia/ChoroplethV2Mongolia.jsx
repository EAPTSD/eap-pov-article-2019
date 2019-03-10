// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import getRandomInt from '../../../utilities/getRandomInt';
import './ChoroplethV2Mongolia.css';

// Data
import mngData from '../../../data/ChoroplethData/MNG_topojson.json';

class ChoroplethV2Mongolia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      mngData: null,
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2MongoliaContainerRef = React.createRef();
  }

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);

    const ChoroplethV2MongoliaContainerHeight = this
      .ChoroplethV2MongoliaContainerRef.current.clientHeight;
    const ChoroplethV2MongoliaContainerWidth = this
      .ChoroplethV2MongoliaContainerRef.current.clientWidth;

    const featureCollection = topojson.feature(
      mngData,
      mngData.objects.mng_adm1_subnatid
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        color: color,
        mngData: mngData,
        containerHeight: ChoroplethV2MongoliaContainerHeight,
        containerWidth: ChoroplethV2MongoliaContainerWidth,
        mapCenter: center,
        featureCollection: featureCollection,
      },
      () => {
        this.renderMap();
      }
    );
  }

  renderMap = () => {
    const {
      color,
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.ChoroplethV2Mongolia-container')
      .append('svg')
      .attr('class', 'ChoroplethV2Mongolia-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const offset = [containerWidth / 2.1, containerHeight / 2];

    const projection = d3
      .geoMercator()
      .scale(550)
      .center(mapCenter)
      .translate(offset);

    const path = d3.geoPath().projection(projection);

    svg
      .append('g')
      .attr('class', 'country')
      .selectAll('path')
      .data(featureCollection.features)
      .enter()
      .append('path')
      .attr('class', 'sub-nation')
      .attr('fill', (d) => 'lightgrey')
      .attr('d', path);
  };

  render() {
    return (
      <div
        className="ChoroplethV2Mongolia-container"
        ref={this.ChoroplethV2MongoliaContainerRef}
      />
    );
  }
}

export default ChoroplethV2Mongolia;
