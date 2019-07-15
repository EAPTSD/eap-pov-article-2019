// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { legendColor, legendHelpers } from 'd3-svg-legend';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV2Eap from '../ChoroplethV2Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import choroplethDataToObj from '../../../utilities/choroplethDataToObj';
import './ChoroplethContainer.css';

// Data
import choroplethData from '../../../data/ChoroplethData/choropleth_data.csv';
import choroplethTypes from './ChoroplethTypes';

class ChoroplethContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {},
      choroplethDataObj: null,
      legendWidth: null,
      legendHeight: null,
      types: choroplethTypes,
      labels: {
        pov190: 'Poverty $1.90',
        pov320: 'Poverty $3.20',
        pov550: 'Poverty $5.50',
        edAttain: 'Education Attainment',
        edEnroll: 'Education Enrollment',
        water: 'Water',
        sanitation: 'Sanitation',
      },
      subLabels: {
        pov190: 'Text Box #3',
        pov320: 'Text Box #4',
        pov550: 'Text Box #5',
        edAttain: 'Text Box #6',
        edEnroll: 'Text Box #7',
        water: 'Text Box #8',
        sanitation: 'Text Box #9',
      },
      headerText: '',
      subHeaderText: '',
    };

    this.ChoroplethLegendRef = React.createRef();
  }

  componentDidMount() {
    Promise.all([d3.csv(choroplethData)]).then((files) => {
      const choroplethDataObj = choroplethDataToObj(files[0]);

      const pov190Color = d3
        .scaleThreshold()
        .domain([0.5, 1.2, 2.3, 6.8, 11.3, 15.6, 25.2, 44, 55])
        .range(d3.schemeBlues[9]);

      const pov320Color = d3
        .scaleThreshold()
        .domain([1, 6, 12, 22, 30, 36, 46, 63, 85])
        .range(d3.schemeBlues[9]);

      const pov550Color = d3
        .scaleThreshold()
        .domain([5, 28, 42, 56, 62, 70, 75, 87, 97])
        .range(d3.schemeBlues[9]);

      const edAttainColor = d3
        .scaleThreshold()
        .domain([0.8, 1.9, 3.6, 5.3, 7, 11, 15, 25, 39])
        .range(d3.schemeReds[9]);

      const edEnrollColor = d3
        .scaleThreshold()
        .domain([0.5, 1.5, 2.8, 3.6, 5.5, 8.7, 12, 29, 56])
        .range(d3.schemeReds[9]);

      const waterColor = d3
        .scaleThreshold()
        .domain([2.1, 7.6, 11.2, 13, 18.4, 26, 37, 60, 83])
        .range(d3.schemeGreens[9]);

      const sanitation = d3
        .scaleThreshold()
        .domain([1.1, 3.5, 9.7, 12.7, 20, 29, 43, 66, 88])
        .range(d3.schemePurples[9]);

      const colors = {
        pov190: pov190Color,
        pov320: pov320Color,
        pov550: pov550Color,
        edAttain: edAttainColor,
        edEnroll: edEnrollColor,
        water: waterColor,
        sanitation: sanitation,
      };

      this.createLegend(pov190Color);
      this.setState({
        colors: colors,
        choroplethDataObj: choroplethDataObj,
      });
    });

    this.onResize();
    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    Stickyfill.add(elements);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    let legendWidth;
    let legendHeight;
    const windowWidth = window.innerWidth;

    switch (true) {
      case windowWidth < 500:
        legendWidth = '60px';
        legendHeight = '85px';
        break;
      case windowWidth < 576:
        legendWidth = '70px';
        legendHeight = '95px';
        break;
      case windowWidth < 648:
        legendWidth = '75px';
        legendHeight = '100px';
        break;
      case windowWidth < 720:
        legendWidth = '80px';
        legendHeight = '110px';
        break;
      case windowWidth < 960:
        legendWidth = '100px';
        legendHeight = '125px';
        break;
      case windowWidth < 1140:
        legendWidth = '120px';
        legendHeight = '160px';
        break;
      default:
        legendWidth = '150px';
        legendHeight = '200px';
        break;
    }

    this.setState({
      legendWidth: legendWidth,
      legendHeight: legendHeight,
    });
  };

  createLegend = (color) => {
    const svg = d3.select('.Choropleth-legend-container');

    const thresholdScale = d3
      .scaleThreshold()
      .domain([color.domain()])
      .range([color.range()]);

    svg
      .append('g')
      .attr('class', 'Choropleth-legend')
      .attr('visibility', 'hidden');

    const legend = legendColor()
      .labelFormat(d3.format('.2f'))
      .labels(legendHelpers.thresholdLabels)
      .scale(thresholdScale);

    svg.select('.Choropleth-legend').call(legend);
  };

  updateLegend = (color, isVisible = false) => {
    const legend = d3.select('.Choropleth-legend');
    const legendContainer = d3.select('.Choropleth-legend-container');

    const visibility = isVisible ? 'visible' : 'hidden';
    legend.attr('visibility', visibility);
    legendContainer.attr('visibility', visibility);

    if (!color) return;

    const thresholdScale = d3
      .scaleThreshold()
      .domain(color.domain())
      .range(color.range());

    const legendUpdate = legendColor()
      .labelFormat(d3.format('.2f'))
      .labels(legendHelpers.thresholdLabels)
      .scale(thresholdScale);

    legend.call(legendUpdate);
  };

  updateHeaders = (headerText, subHeaderText) => {
    this.setState({
      headerText: headerText,
      subHeaderText: subHeaderText,
    });
  };

  updateGraph = (type, i) => {
    const { colors, labels, subLabels, choroplethDataObj } = this.state;
    const color = colors[type];
    const isVisible = i === 0 || i === 8 ? false : true;

    this.updateLegend(color, isVisible, type);
    this.updateHeaders(labels[type], subLabels[type]);

    const subNation = d3.selectAll('path.sub-nation');
    // .transition()
    // .duration(250)
    // .style('opacity', 0.9);

    if (i === 0 || i === 8) {
      subNation.attr('fill', 'lightgrey').on('mouseenter', () => {});
      return;
    }

    if (choroplethDataObj) {
      subNation.attr('fill', (d) => {
        const dataValue = choroplethDataObj[d.properties.ADM1_CODE][type];
        const fillColor = dataValue === '-1' ? 'lightgrey' : color(dataValue);
        return fillColor;
      });
    }

    const tooltip = d3.select('.Choropleth-tooltip');
    subNation
      .on('mouseenter', (d) => {
        const offsetX =
          d3.event.x / window.innerWidth > 0.65
            ? d3.event.x - 175
            : d3.event.x + 25;
        const offsetY =
          d3.event.y / window.innerHeight > 0.65
            ? d3.event.y - 175
            : d3.event.y + 25;
        const country = d.properties.ADM0_NAME;
        const region = d.properties.ADM1_NAME;
        const dataString = choroplethDataObj[d.properties.ADM1_CODE][type];
        const dataValue = dataString.slice(0, dataString.indexOf('.') + 3);

        let regionHtml;
        if (region && color) {
          regionHtml = `<p class='Choropleth-tooltip-underline'>Sub-Region: ${region}</p>`;
        } else {
          regionHtml = '';
        }

        let dataHtml;
        if (dataValue !== '-1' && color) {
          dataHtml = `<div class='Choropleth-tooltip-data-container'>
          <span class='Choropleth-tooltip-data'>${dataValue}</span>
          <span class='Choropleth-tooltip-data-title'>${labels[type]}</span>
          </div>`;
        } else {
          dataHtml = '';
        }

        tooltip
          .transition()
          .duration(250)
          .style('opacity', 0.9)
          .transition()
          .duration(250)
          .style('z-index', 1);

        setTimeout(() => {
          tooltip.style('z-index', 1);
        }, 255);

        tooltip
          .html(
            `<p class='Choropleth-tooltip-header ${
              regionHtml ? '' : 'Choropleth-tooltip-underline'
            }'>${country}</p>
            ${regionHtml}
            ${dataHtml}`
          )
          .style('left', `${offsetX}px`)
          .style('top', `${offsetY}px`);
      })
      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(100)
          .style('opacity', 0);

        setTimeout(() => {
          tooltip.style('z-index', -1);
        }, 105);
      });
  };

  render() {
    const {
      types,
      legendWidth,
      legendHeight,
      headerText,
      subHeaderText,
    } = this.state;
    return (
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          <ChoroplethV2Mongolia />
          <div className="Choropleth-tooltip" />

          <div className="choropleth-bottom-bar__container">
            <svg
              className="Choropleth-legend-container"
              visibility="hidden"
              ref={this.ChoroplethLegendRef}
              style={{
                height: legendHeight || 1,
                width: legendWidth || 1,
              }}
            />
            <h1 className="Choropleth-header">{headerText}</h1>
          </div>
        </div>
        <div className="choropleth-text__container">
          {types.map((typeData, i) => {
            const { type, text } = typeData;
            return (
              <>
                <Waypoint
                  onEnter={() => this.updateGraph(type, i)}
                  bottomOffset="40%"
                />
                <div className="choropleth-text__block">
                  <p>{text}</p>
                </div>
                {i === 8 ? (
                  <div className="ChoroplethContainer-waypoint-buffer" />
                ) : null}
              </>
            );
          })}
            
<!--           <svg
            className="Choropleth-legend-container"
            visibility="hidden"
            ref={this.ChoroplethLegendRef}
            style={{
              height: legendHeight || 1,
              width: legendWidth || 1,
            }}
          />
          <div className="Choropleth-header-container">
            <h1 className="Choropleth-header">{headerText}</h1>
            <p className="Choropleth-subHeader">{subHeaderText}</p>
          </div> -->
            
        </div>
      </div>
    );
  }
}

export default ChoroplethContainer;
