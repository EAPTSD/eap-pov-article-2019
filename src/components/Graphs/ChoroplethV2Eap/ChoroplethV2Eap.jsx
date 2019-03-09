// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import getRandomInt from '../../../utilities/getRandomInt';
import './ChoroplethV2Eap.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/EAPMap_topojson.json';

class ChoroplethV2Eap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      eapCountryData: null,
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2EapRef = React.createRef();
  }

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);

    const choroplethContainerHeight = this.ChoroplethV2EapRef.current
      .clientHeight;
    const choroplethContainerWidth = this.ChoroplethV2EapRef.current
      .clientWidth;

    const featureCollection = topojson.feature(
      eapCountryData,
      eapCountryData.objects.eap_all_by_subnatid1_shapefile
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        color: color,
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
      color,
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.ChoroplethV2Eap-container')
      .append('svg')
      .attr('class', 'Choropleth-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const scale = 480;
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
      .attr('fill', (d) => color(getRandomInt(11)))
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
