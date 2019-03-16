// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV3Eap.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/EAPMap_topojson.json';

class ChoroplethV3Eap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eapCountryData: null,
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV3EapRef = React.createRef();
  }

  componentDidMount() {
    const choroplethContainerHeight = this.ChoroplethV3EapRef.current
      .clientHeight;
    const choroplethContainerWidth = this.ChoroplethV3EapRef.current
      .clientWidth;

    const featureCollection = topojson.feature(
      eapCountryData,
      eapCountryData.objects.eap_all_by_subnatid1_shapefile
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        eapCountryData: eapCountryData,
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
      .select('.ChoroplethV3Eap-container')
      .append('svg')
      .attr('class', 'ChoroplethV3Eap-svg')
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
