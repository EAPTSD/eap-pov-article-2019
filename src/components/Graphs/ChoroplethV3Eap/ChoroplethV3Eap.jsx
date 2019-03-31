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
  }

  renderMap = () => {
    const {
      combinedData,
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    // marshall islands, palau ??
    // 1 -> china
    // 10, 242 -> timor-leste
    // 12, 262  -> vanuatu
    // 13, 225 -> solomon islands
    // 14, 83 -> fiji
    // 15, 163 -> federated states
    // 135 -> Kiribaiti
    // 212 -> Samoa
    // 245 -> Tonga
    // 252 -> Tuavalu

    const extractedCountries = [
      1,
      12,
      13,
      14,
      15,
      83,
      135,
      163,
      212,
      225,
      245,
      252,
      262,
    ];

    console.log(featureCollection.features);
    const filteredCollection = featureCollection.features.filter((country) => {
      return !extractedCountries.includes(country.properties.ADM0_CODE);
    });

    const svg = d3
      .select('.ChoroplethV3Eap-container')
      .append('svg')
      .attr('class', 'ChoroplethV3Eap-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    // const scale = 600;
    // const offset = [containerWidth / 2.5, containerHeight / 4.4];
    const scale = 400;
    const offset = [containerWidth / 4, containerHeight / 4.4];

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
