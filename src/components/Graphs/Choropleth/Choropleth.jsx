// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Waypoint from 'react-waypoint';

// Internal Imports
import getRandomInt from '../../../utilities/getRandomInt';
import './Choropleth.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/EAPMap_topojson.json';

class Choropleth extends Component {
  state = {
    color: null,
    eapCountryData: null,
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    windowHeight: null,
    windowWidth: null,
  };

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);
    this.setState(
      {
        color: color,
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
    const { color, eapCountryData, windowHeight, windowWidth } = this.state;
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
      .attr('class', 'sub-nation')
      .attr('fill', (d) => color(getRandomInt(11)))
      .attr('d', path);
  };

  updateMap = () => {
    const { color } = this.state;
    d3.selectAll('path.sub-nation').attr('fill', (d) =>
      color(getRandomInt(11))
    );
  };

  render() {
    const { index } = this.state;
    return (
      <div className="Choropleth-sequence-container">
        <div className="Choropleth-container fixed" />
        {index.map((i) => {
          return (
            <>
              <div className="Choropleth-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateMap()} />
            </>
          );
        })}
      </div>
    );
  }
}

export default Choropleth;
