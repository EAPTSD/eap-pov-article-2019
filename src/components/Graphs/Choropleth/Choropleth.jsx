// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './Choropleth.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/EAPMap_topojson.json';
import geoJsonData from '../../../data/ChoroplethData/EAPMap_geojson.json';

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
    const featureCollection = topojson.feature(
      eapCountryData,
      eapCountryData.objects.eap_all_by_subnatid1_shapefile
    );

    const svg = d3
      .select('.Choropleth-container')
      .append('svg')
      .attr('height', windowHeight)
      .attr('width', windowWidth);

    const center = d3.geoPath().centroid(featureCollection);
    const scale = 500;
    const offset = [windowWidth / 2, windowHeight / 2];

    // THIS WORKS DON'T DELETE
    // const projection = d3.geoIdentity()
    // .fitExtent([[-2000, 300], [900, 900]], featureCollection)
    // .reflectY(true);

    const projection = d3
      .geoMercator()
      .scale(scale)
      .center(center)
      .translate(offset);

    const path = d3.geoPath().projection(projection);

    svg
      .append('g')
      .attr('class', 'country')
      .selectAll('path')
      .data(featureCollection.features)
      .enter()
      .append('path')
      .attr('d', path);
  };

  render() {
    return <div className="Choropleth-container" />;
  }
}

export default Choropleth;
