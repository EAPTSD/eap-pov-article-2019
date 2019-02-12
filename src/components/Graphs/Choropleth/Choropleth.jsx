// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './Choropleth.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/eap_all_by_subnatid1_topojson.json';

class Choropleth extends Component {
  state = {
    eapCountryData: null,
    windowHeight: null,
    windowWidth: null,
  };

  componentDidMount() {
    console.log(eapCountryData);
    this.setState(
      {
        eapCountryData: eapCountryData,
        windowHeight: window.outerHeight,
        windowWidth: window.outerWidth,
      },
      () => {
        this.renderMap();
      }
    );
  }

  renderMap = () => {
    const { eapCountryData, windowHeight, windowWidth } = this.state;
    const eapCountries = topojson.feature(
      eapCountryData,
      eapCountryData.objects.eap_all_by_subnatid1_shapefile
    ).features;

    console.log(eapCountries);

    const projection = d3
      .geoMercator()
      .translate([windowWidth / 2, windowHeight / 2]);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select('.Choropleth-container')
      .append('svg')
      .style('height', windowHeight + 'px')
      .style('width', windowWidth + 'px')
      .append('g');

    svg
      .selectAll('.country')
      .data(eapCountries)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path);
  };

  render() {
    return <div className="Choropleth-container" />;
  }
}

export default Choropleth;
