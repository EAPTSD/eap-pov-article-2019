// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV3Eap.css';

// Data
import eapSubNatData from '../../../data/ChoroplethData/EAP_subnat_topojson.json';
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
    // console.log(combinedData);

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

    const svg = d3
      .select('.ChoroplethV3Eap-container')
      .append('svg')
      .attr('class', 'ChoroplethV3Eap-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const scale = 400;
    const offset = [containerWidth / 3, containerHeight / 2.4];

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
