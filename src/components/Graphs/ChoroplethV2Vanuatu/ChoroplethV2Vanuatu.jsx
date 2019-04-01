// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal Imports
import './ChoroplethV2Vanuatu.css';

// Data
import combinedData from '../../../data/ChoroplethData/EAP_topojson.json';

class ChoroplethV2Vanuatu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vanuatuCollection: null,
      containerHeight: null,
      containerWidth: null,
      mapCenter: null,
      featureCollection: null,
    };
    this.ChoroplethV2VanuatuContainerRef = React.createRef();
  }

  componentDidMount() {
    const ChoroplethV2VanuatuContainerHeight = this
      .ChoroplethV2VanuatuContainerRef.current.clientHeight;
    const ChoroplethV2VanuatuContainerWidth = this
      .ChoroplethV2VanuatuContainerRef.current.clientWidth;

    const featureCollection = topojson.feature(
      combinedData,
      combinedData.objects.EAP_SubNations
    );

    const vanuatuIsoloated = featureCollection.features.filter((country) => {
      return [262].includes(country.properties.ADM0_CODE);
    });

    const vanuatuCollection = {
      features: vanuatuIsoloated,
      type: 'FeatureCollection',
    };

    const center = d3.geoPath().centroid(vanuatuCollection);

    this.setState(
      {
        vanuatuCollection: vanuatuCollection,
        containerHeight: ChoroplethV2VanuatuContainerHeight,
        containerWidth: ChoroplethV2VanuatuContainerWidth,
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
      containerHeight,
      containerWidth,
      vanuatuCollection,
      mapCenter,
    } = this.state;

    const svg = d3
      .select('.ChoroplethV2Vanuatu-container')
      .append('svg')
      .attr('class', 'ChoroplethV2Vanuatu-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    const offset = [containerWidth / 2, containerHeight / 2.25];
    const scale = this.getScale();
    const projection = d3
      .geoMercator()
      .scale(700)
      .center(mapCenter)
      .translate(offset);

    const path = d3.geoPath().projection(projection);

    svg
      .append('g')
      .attr('class', 'country')
      .selectAll('path')
      .data(vanuatuCollection.features)
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
          (a) => a
        )
      )
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '0.5px')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
  };

  getScale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const baseScale = 700;
    const scaleFactor = 4.6;
    const baseWidth = 300;
    const baseHeight = 150;

    const scale1 = (baseScale * windowWidth) / baseWidth;
    const scale2 = (baseScale * windowHeight) / baseHeight;

    return d3.min([scale1, scale2]) / scaleFactor;
  };

  onResize = () => {
    const { mapCenter } = this.state;

    const containerHeight = this.ChoroplethV2VanuatuContainerRef.current
      .clientHeight;
    const containerWidth = this.ChoroplethV2VanuatuContainerRef.current
      .clientWidth;
    const newScale = this.getScale();
    const newOffset = [containerWidth / 2, containerHeight / 2.25];

    const newProjection = d3
      .geoMercator()
      .scale(newScale)
      .center(mapCenter)
      .translate(newOffset);

    const newPath = d3.geoPath().projection(newProjection);

    const svg = d3
      .select('.ChoroplethV2Vanuatu-svg')
      .attr('height', containerHeight)
      .attr('width', containerWidth);

    svg.selectAll('path').attr('d', newPath);
  };

  render() {
    return (
      <div
        className="ChoroplethV2Vanuatu-container"
        ref={this.ChoroplethV2VanuatuContainerRef}
      />
    );
  }
}

export default ChoroplethV2Vanuatu;
