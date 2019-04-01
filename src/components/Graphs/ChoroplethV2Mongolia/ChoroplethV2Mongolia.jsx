// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV2Mongolia.css';

// Data
import combinedData from '../../../data/ChoroplethData/EAP_topojson.json';

class ChoroplethV2Mongolia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mngCollection: null,
      containerHeight: null,
      containerWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2MongoliaContainerRef = React.createRef();
  }

  componentDidMount() {
    const ChoroplethV2MongoliaContainerHeight = this
      .ChoroplethV2MongoliaContainerRef.current.clientHeight;
    const ChoroplethV2MongoliaContainerWidth = this
      .ChoroplethV2MongoliaContainerRef.current.clientWidth;

    const featureCollection = topojson.feature(
      combinedData,
      combinedData.objects.EAP_SubNations
    );
    const mngIsoloated = featureCollection.features.filter((country) => {
      return [167].includes(country.properties.ADM0_CODE);
    });

    console.log(mngIsoloated);

    const mngCollection = {
      features: mngIsoloated,
      type: 'FeatureCollection',
    };

    const center = d3.geoPath().centroid(mngCollection);

    this.setState(
      {
        mngCollection: mngCollection,
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
      mngCollection,
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
      .data(mngCollection.features)
      .enter()
      .append('path')
      .attr('class', 'sub-nation')
      .attr('fill', 'lightgrey')
      .attr('d', path);

    svg
      .append('path')
      .datum(
        topojson.mesh(
          combinedData,
          combinedData.objects.EAP_Countries,
          (a) => a
        )
      )
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '0.5px')
      .attr('stroke-linejoin', 'round')
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
