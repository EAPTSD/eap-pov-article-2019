// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';

// Internal Imports
import BarGraphV2 from '../BarGraphV2';
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import './BarGraphContainer.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraphContainer extends Component {
  state = {
    displayText: '2002',
    headerClass: '',
    higherPovertyDisplayData: [],
    index: 1,
    reserveData: [],
    start: false,
    first: true,
    years: [2002, 2006, 2010, 2014, 2018],
  };

  componentDidMount() {
    const { years } = this.state;
    Promise.all([d3.csv(higherPovertyData)]).then((files) => {
      const formattedHigherPovertyData = formatHigherPovertyData(
        files[0],
        years
      );
      this.setState({
        reserveData: formattedHigherPovertyData,
      });
    });
  }

  startGraph = () => {
    const { start, reserveData } = this.state;
    if (!start) {
      this.setState(
        {
          start: true,
          higherPovertyDisplayData: reserveData[0],
        },
        () => {
          setTimeout(() => {
            this.updateGraph();
          }, 2500);
        }
      );
    }
  };

  updateGraph = () => {
    setInterval(() => {
      const { reserveData, index, years } = this.state;
      setTimeout(() => {
        this.setState({
          headerClass: 'BarGraphContainer-fadeOut',
        });
      }, 2000);
      this.setState({
        displayText: years[index].toString(),
        headerClass: 'BarGraphContainer-fadeIn',
        higherPovertyDisplayData: reserveData[index],
        index: index === 4 ? 0 : index + 1,
        first: false,
      });
    }, 2500);
  };

  render() {
    const {
      higherPovertyDisplayData,
      displayText,
      headerClass,
      first,
    } = this.state;
    return (
      <div className="BarGraphContainer-sequence-container container-fluid">
        <Waypoint
          onEnter={() => {
            this.startGraph();
          }}
        />
        <div className="temp" />
        <div className="row">
          <div className="col text-center">
            <h1 className="BarGraphContainer-header-text">
              Developing EAP Poor Population with China
            </h1>
            <span
              className={`BarGraphContainer-header-text-change ${headerClass}`}
            >
              {displayText}
            </span>
          </div>
        </div>
        <div className="BarGraphContainer-container">
          <BarGraphV2
            higherPovertyDisplayData={higherPovertyDisplayData}
            first={first}
          />
        </div>
      </div>
    );
  }
}

export default BarGraphContainer;
