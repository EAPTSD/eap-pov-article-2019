// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import getRandomInt from '../../../utilities/getRandomInt';
import scaleByScreenSize from '../../../utilities/scaleByScreenSize';
import './Choropleth.css';

// Data
import eapCountryData from '../../../data/ChoroplethData/EAPMap_topojson.json';

class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      eapCountryData: null,
      index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.choroplethContainerRef = React.createRef();
    this.choroplethRef = React.createRef();
  }

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);

    const choroplethContainerHeight = this.choroplethContainerRef.current
      .clientHeight;
    const choroplethContainerWidth = this.choroplethContainerRef.current
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

    const elements = document.querySelectorAll('.Choropleth-sticky');
    Stickyfill.add(elements);

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  renderMap = () => {
    scaleByScreenSize();

    const {
      color,
      containerHeight,
      containerWidth,
      featureCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.Choropleth-container')
      .append('svg')
      .attr('class', 'Choropleth-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const scale = scaleByScreenSize();
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

  onResize = () => {
    const { mapCenter } = this.state;

    const containerHeight = this.choroplethContainerRef.current.clientHeight;
    const containerWidth = this.choroplethContainerRef.current.clientWidth;

    const newScale = scaleByScreenSize();
    const newOffset = [containerWidth / 3, containerHeight / 2.4];

    const newProjection = d3
      .geoMercator()
      .scale(newScale)
      .center(mapCenter)
      .translate(newOffset);

    const newPath = d3.geoPath().projection(newProjection);

    const svg = d3
      .select('.Choropleth-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    svg.selectAll('path').attr('d', newPath);
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
        <div
          className="Choropleth-container Choropleth-sticky"
          ref={this.choroplethContainerRef}
        />
        {index.map(() => {
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
