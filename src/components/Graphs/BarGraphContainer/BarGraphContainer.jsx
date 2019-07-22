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
    displayText: '',
    headerClass: '',
    higherPovertyDisplayData: [],
    index: 0,
    reserveData: [],
    start: false,
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
    const { start } = this.state;
    if (!start) {
      this.setState(
        {
          start: true,
        },
        () => {
          this.updateGraph();
        }
      );
    }
  };

  stopGraph = () => {
    if (this.bgInt) {
      clearInterval(this.bgInt);
      this.setState({
        start: false,
        index: 0,
        headerClass: '',
        higherPovertyDisplayData: [],
        displayText: '',
      });
    }
  };

  updateGraph = () => {
    this.bgInt = setInterval(() => {
      const { reserveData, index, years } = this.state;
      this.setState({
        displayText: years[index].toString(),
        headerClass: 'BarGraphContainer-fadeIn',
        higherPovertyDisplayData: reserveData[index],
        index: index === 4 ? 0 : index + 1,
      });
      setTimeout(() => {
        this.setState({
          headerClass: 'BarGraphContainer-fadeOut',
        });
      }, 2000);
    }, 2500);
  };

  render() {
    const {
      higherPovertyDisplayData,
      displayText,
      headerClass,
      first,
      start,
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
            <h2
              className={`BarGraphContainer-header-text-change ${
                start ? headerClass : ''
              }`}
            >
              {displayText}
            </h2>
          </div>
        </div>
        <div className="BarGraphContainer-container">
          <BarGraphV2
            higherPovertyDisplayData={higherPovertyDisplayData}
            first={first}
          />
        </div>
        <Waypoint
          onLeave={() => {
            this.stopGraph();
          }}
          onEnter={(currentPosition) => {
            if (currentPosition.previousPosition === 'above') {
              this.startGraph();
            }
          }}
        />
      </div>
    );
  }
}

export default BarGraphContainer;
