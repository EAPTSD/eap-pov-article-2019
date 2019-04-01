// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV2Fiji.css';

// Data
import combinedData from '../../../data/ChoroplethData/EAP_topojson.json';

class ChoroplethV2Fiji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fijiCollection: null,
      containerHeight: null,
      containerWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2FijiContainerRef = React.createRef();
  }

  componentDidMount() {
    const ChoroplethV2FijiContainerHeight = this.ChoroplethV2FijiContainerRef
      .current.clientHeight;
    const ChoroplethV2FijiContainerWidth = this.ChoroplethV2FijiContainerRef
      .current.clientWidth;

    const featureCollection = topojson.feature(
      combinedData,
      combinedData.objects.EAP_SubNations
    );

    const fijiIsoloated = featureCollection.features.filter((country) => {
      return [3377, 3379, 3380].includes(country.properties.OBJECTID);
    });

    const fijiCollection = {
      features: fijiIsoloated,
      type: 'FeatureCollection',
    };

    const center = [177.7833794722082, -17.753291284397186];

    this.setState(
      {
        fijiCollection: fijiCollection,
        containerHeight: ChoroplethV2FijiContainerHeight,
        containerWidth: ChoroplethV2FijiContainerWidth,
        mapCenter: center,
        featureCollection: featureCollection,
      },
      () => {
        this.renderMap();
      }
    );

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  renderMap = () => {
    const {
      containerHeight,
      containerWidth,
      fijiCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.ChoroplethV2Fiji-container')
      .append('svg')
      .attr('class', 'ChoroplethV2Fiji-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const offset = [containerWidth / 3.75, containerHeight / 1.65];
    const scale = this.getScale();
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
      .data(fijiCollection.features)
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

  getScale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const baseScale = 1500;
    const scaleFactor = 4.6;
    const baseWidth = 300;
    const baseHeight = 150;

    const scale1 = (baseScale * windowWidth) / baseWidth;
    const scale2 = (baseScale * windowHeight) / baseHeight;

    return d3.min([scale1, scale2]) / scaleFactor;
  };

  onResize = () => {
    const { mapCenter } = this.state;

    const containerHeight = this.ChoroplethV2FijiContainerRef.current
      .clientHeight;
    const containerWidth = this.ChoroplethV2FijiContainerRef.current
      .clientWidth;
    const newScale = this.getScale();
    const newOffset = [containerWidth / 3.75, containerHeight / 1.65];

    const newProjection = d3
      .geoMercator()
      .scale(newScale)
      .center(mapCenter)
      .translate(newOffset);

    const newPath = d3.geoPath().projection(newProjection);

    const svg = d3
      .select('.ChoroplethV2Fiji-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    svg.selectAll('path').attr('d', newPath);
  };

  render() {
    return (
      <div
        className="ChoroplethV2Fiji-container"
        ref={this.ChoroplethV2FijiContainerRef}
      />
    );
  }
}

export default ChoroplethV2Fiji;
