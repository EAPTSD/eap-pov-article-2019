// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV3Eap.css';

// Data
import combinedData from '../../../data/ChoroplethData/EAP_topojson.json';

class ChoroplethV3Eap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combinedData: null,
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV3EapRef = React.createRef();
  }

  componentDidMount() {
    // combinedData.objects.EAP_SubNations.geometries.map(country => console.log(country.properties));

    const choroplethContainerHeight = this.ChoroplethV3EapRef.current
      .clientHeight;
    const choroplethContainerWidth = this.ChoroplethV3EapRef.current
      .clientWidth;

    const featureCollection = topojson.feature(
      combinedData,
      combinedData.objects.EAP_SubNations
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        combinedData: combinedData,
        containerHeight: choroplethContainerHeight,
        containerWidth: choroplethContainerWidth,
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
      combinedData,
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    const extractedCountries = [
      1, // China
      12,
      262, // ^Vanuatu
      13,
      225, // ^Solomon Islands
      14,
      83, // ^Fiji
      15,
      163, // ^Federated States
      135, // Kiribaiti
      212, // Samoa
      245, // Tonga
      252, // Tuavalu
    ]; // marshall islands, palau ??

    const filteredCollection = featureCollection.features.filter((country) => {
      return !extractedCountries.includes(country.properties.ADM0_CODE);
    });

    const svg = d3
      .select('.ChoroplethV3Eap-container')
      .append('svg')
      .attr('class', 'ChoroplethV3Eap-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const offset = [containerWidth / 2.5, containerHeight / 20.89];
    const scale = this.getScale(containerWidth, containerHeight);
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
      .data(filteredCollection)
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
          (a) => !extractedCountries.includes(a.id)
        )
      )
      .attr('fill', 'none')
      .attr('stroke', 'white')
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
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
  };

  getScale = (width, height) => {
    const baseScale = 800;
    const scaleFactor = 2.5;
    const baseWidth = 470;
    const baseHeight = 270;

    const scale1 = (baseScale * width) / baseWidth;
    const scale2 = (baseScale * height) / baseHeight;
    return d3.min([scale1, scale2]) / scaleFactor;
  };

  onResize = () => {
    const { mapCenter } = this.state;

    const containerHeight = this.ChoroplethV3EapRef.current.clientHeight;
    const containerWidth = this.ChoroplethV3EapRef.current.clientWidth;
    const newScale = this.getScale(containerWidth, containerHeight);
    const newOffset = [containerWidth / 2.5, containerHeight / 20.89];

    const newProjection = d3
      .geoMercator()
      .scale(newScale)
      .center(mapCenter)
      .translate(newOffset);

    const newPath = d3.geoPath().projection(newProjection);

    const svg = d3
      .select('.ChoroplethV3Eap-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    svg.selectAll('path').attr('d', newPath);
  };

  render() {
    return (
      <div
        className="ChoroplethV3Eap-container"
        ref={this.ChoroplethV3EapRef}
      />
    );
  }
}

export default ChoroplethV3Eap;
