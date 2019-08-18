// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import ChoroplethV2Eap from '../ChoroplethV2Eap';
import ChoroplethV2Mongolia from '../ChoroplethV2Mongolia';
import './ChoroplethContainer.css';

// Data
import choroplethTypes from './ChoroplethTypes';

class ChoroplethContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {},
      types: choroplethTypes,
      labels: {
        mpi2a_s: 'Education Attainment',
        mpi2b_s: 'Education Enrollment',
        mpi3b_s: 'Water',
        mpi3c_s: 'Sanitation',
      },
      legends: {
        start: [],
        mpi2a_s: [
          { color: 'rgb(255, 245, 240)', text: 'Less than 0.80' },
          { color: 'rgb(254, 224, 210)', text: '0.80 to 1.90' },
          { color: 'rgb(252, 187, 161)', text: '1.90 to 3.60' },
          { color: 'rgb(252, 146, 114)', text: '3.60 to 5.30' },
          { color: 'rgb(251, 106, 74)', text: '5.30 to 7.00' },
          { color: 'rgb(239, 59, 44)', text: '7.00 to 11.00' },
          { color: 'rgb(203, 24, 29)', text: '11.00 to 15.00' },
          { color: 'rgb(165, 15, 21)', text: '15.00 to 25.00' },
          { color: 'rgb(103, 0, 13)', text: '25.00 or more' },
        ],
        mpi2b_s: [
          { color: 'rgb(255, 245, 240)', text: 'Less than 0.50' },
          { color: 'rgb(254, 224, 210)', text: '0.50 to 1.50' },
          { color: 'rgb(252, 187, 161)', text: '1.50 to 2.80' },
          { color: 'rgb(252, 146, 114)', text: '2.80 to 3.60' },
          { color: 'rgb(251, 106, 74)', text: '3.60 to 5.50' },
          { color: 'rgb(239, 59, 44)', text: '5.50 to 8.70' },
          { color: 'rgb(203, 24, 29)', text: '8.70 to 12.00' },
          { color: 'rgb(165, 15, 21)', text: '12.00 to 29.00' },
          { color: 'rgb(103, 0, 13)', text: '29.00 or more' },
        ],
        mpi3b_s: [
          { color: 'rgb(247, 252, 245)', text: 'Less than 2.10' },
          { color: 'rgb(229, 245, 224)', text: '2.10 to 7.60' },
          { color: 'rgb(199, 233, 192)', text: '7.60 to 11.20' },
          { color: 'rgb(161, 217, 155)', text: '11.20 to 13.00' },
          { color: 'rgb(116, 196, 118)', text: '13.00 to 18.40' },
          { color: 'rgb(65, 171, 93)', text: '18.40 to 26.00' },
          { color: 'rgb(35, 139, 69)', text: '26.00 to 37.00' },
          { color: 'rgb(0, 109, 44)', text: '37.00 to 60.00' },
          { color: 'rgb(0, 68, 27)', text: '60.00 or more' },
        ],
        mpi3c_s: [
          { color: 'rgb(252, 251, 253)', text: 'Less than 1.10' },
          { color: 'rgb(239, 237, 245)', text: '1.10 to 3.50' },
          { color: 'rgb(218, 218, 235)', text: '3.50 to 9.70' },
          { color: 'rgb(188, 189, 220)', text: '9.70 to 12.70' },
          { color: 'rgb(158, 154, 200)', text: '12.70 to 20.00' },
          { color: 'rgb(128, 125, 186)', text: '20.00 to 29.00' },
          { color: 'rgb(106, 81, 163)', text: '29.00 to 43.00' },
          { color: 'rgb(84, 39, 143)', text: '43.00 to 66.00' },
          { color: 'rgb(63, 0, 125)', text: '66.00 or more' },
        ],
        end: [],
      },
      displayLegend: [],
      headerText: '',
      subHeaderText: '',
    };
  }

  componentDidMount() {
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

    const sanitationColor = d3
      .scaleThreshold()
      .domain([1.1, 3.5, 9.7, 12.7, 20, 29, 43, 66, 88])
      .range(d3.schemePurples[9]);

    const colors = {
      mpi2a_s: edAttainColor,
      mpi2b_s: edEnrollColor,
      mpi3b_s: waterColor,
      mpi3c_s: sanitationColor,
    };

    this.setState({
      colors: colors,
    });

    const elements = document.querySelectorAll('.ChoroplethContainer-sticky');
    Stickyfill.add(elements);
  }

  updateHeaders = (headerText) => {
    this.setState({
      headerText: headerText,
    });
  };

  updateLegend = (type) => {
    const { legends } = this.state;
    this.setState({
      displayLegend: legends[type],
    });
  };

  updateGraph = (type, i) => {
    const { colors, labels } = this.state;
    const color = colors[type];

    this.updateLegend(type);
    this.updateHeaders(labels[type]);

    const subNation = d3.selectAll('path.sub-nation');

    if (i === 0 || i === 8) {
      subNation.attr('fill', 'lightgrey').on('mouseenter', () => {});
      return;
    }

    subNation.attr('fill', (d) => {
      const dataValue = d.properties[type];
      const fillColor =
        dataValue === null || dataValue === undefined
          ? 'lightgrey'
          : color(dataValue.toString());
      return fillColor;
    });

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
        const country = d.properties.cntrynm;
        const region = d.properties.id;
        const data = d.properties[type];
        const dataString = data ? data.toString() : '-1';
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
    const { types, headerText, displayLegend } = this.state;
    return (
      <div className="ChoroplethContainer-sequence-container">
        <div className="ChoroplethContainer-container ChoroplethContainer-sticky">
          <ChoroplethV2Eap />
          <ChoroplethV2Mongolia />
          <div className="Choropleth-tooltip" />
          <div className="choropleth-bottom-bar__container">
            {displayLegend.length > 1 && (
              <div className="Choropleth-legend-container">
                {displayLegend.map((item, i) => {
                  return (
                    <div
                      className="ChoroplethLegend-item"
                      key={`choropleth-legend-item-${i}`}
                    >
                      <svg width={10} height={10}>
                        <rect width={10} height={10} fill={item.color} />
                      </svg>
                      <span className="ChoroplethLegend-item-text">
                        {' '}
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <h1 className="Choropleth-header">{headerText}</h1>
          </div>
        </div>
        <div className="choropleth-text__container">
          {types.map((typeData, i) => {
            const { type, text } = typeData;
            return (
              <>
                {i === 0 ? (
                  <div className="ChoroplethContainer-waypoint-buffer" />
                ) : null}
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
        </div>
      </div>
    );
  }
}

export default ChoroplethContainer;
