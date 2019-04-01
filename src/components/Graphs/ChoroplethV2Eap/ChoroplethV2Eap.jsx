// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV2Eap.css';

// Data
import combinedData from '../../../data/ChoroplethData/EAP_topojson.json';

class ChoroplethV2Eap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2EapRef = React.createRef();
  }

  componentDidMount() {
    const choroplethContainerHeight = this.ChoroplethV2EapRef.current
      .clientHeight;
    const choroplethContainerWidth = this.ChoroplethV2EapRef.current
      .clientWidth;

    const featureCollection = topojson.feature(
      combinedData,
      combinedData.objects.EAP_SubNations
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        containerHeight: choroplethContainerHeight,
        containerWidth: choroplethContainerWidth,
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
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.ChoroplethV2Eap-container')
      .append('svg')
      .attr('class', 'ChoroplethV2Eap-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const scale = 555;
    const offset = [containerWidth / 6, containerHeight / 25];

    const projection = d3
      .geoMercator()
      .scale(scale)
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

    svg
      .append('path')
      .datum(
        topojson.mesh(
          combinedData,
          combinedData.objects.EAP_SubNations,
          (a) => a.properties.ADM0_CODE === 147295
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
        className="ChoroplethV2Eap-container"
        ref={this.ChoroplethV2EapRef}
      />
    );
  }
}

export default ChoroplethV2Eap;
