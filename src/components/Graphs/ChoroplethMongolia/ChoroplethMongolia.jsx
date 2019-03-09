// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import getRandomInt from '../../../utilities/getRandomInt';
import scaleByScreenSize from '../../../utilities/scaleByScreenSize';
import './ChoroplethMongolia.css';

// Data
import mngData from '../../../data/ChoroplethData/MNG_topojson.json';

class ChoroplethMongolia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      mngData: null,
      index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      windowHeight: null,
      windowWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethMongoliaContainerRef = React.createRef();
    this.ChoroplethMongoliaRef = React.createRef();
  }

  componentDidMount() {
    const color = d3
      .scaleQuantize()
      .domain([0, 10])
      .range(d3.schemeBlues[9]);

    const ChoroplethMongoliaContainerHeight = this
      .ChoroplethMongoliaContainerRef.current.clientHeight;
    const ChoroplethMongoliaContainerWidth = this.ChoroplethMongoliaContainerRef
      .current.clientWidth;

    console.log(mngData);

    const featureCollection = topojson.feature(
      mngData,
      mngData.objects.mng_adm1_subnatid
    );
    const center = d3.geoPath().centroid(featureCollection);

    this.setState(
      {
        color: color,
        mngData: mngData,
        containerHeight: ChoroplethMongoliaContainerHeight,
        containerWidth: ChoroplethMongoliaContainerWidth,
        mapCenter: center,
        featureCollection: featureCollection,
      },
      () => {
        this.renderMap();
      }
    );

    const elements = document.querySelectorAll('.ChoroplethMongolia-sticky');
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
      .select('.ChoroplethMongolia-container')
      .append('svg')
      .attr('class', 'ChoroplethMongolia-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const scale = scaleByScreenSize();
    const offset = [containerWidth / 3, containerHeight / 2.4];

    const projection = d3
      .geoMercator()
      .scale(800)
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

    const containerHeight = this.ChoroplethMongoliaContainerRef.current
      .clientHeight;
    const containerWidth = this.ChoroplethMongoliaContainerRef.current
      .clientWidth;

    const newScale = scaleByScreenSize();
    const newOffset = [containerWidth / 3, containerHeight / 2.4];

    const newProjection = d3
      .geoMercator()
      .scale(newScale)
      .center(mapCenter)
      .translate(newOffset);

    const newPath = d3.geoPath().projection(newProjection);

    const svg = d3
      .select('.ChoroplethMongolia-svg')
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
      <div className="ChoroplethMongolia-sequence-container">
        <div
          className="ChoroplethMongolia-container ChoroplethMongolia-sticky"
          ref={this.ChoroplethMongoliaContainerRef}
        />
        {index.map(() => {
          return (
            <>
              <div className="ChoroplethMongolia-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateMap()} />
            </>
          );
        })}
      </div>
    );
  }
}

export default ChoroplethMongolia;
