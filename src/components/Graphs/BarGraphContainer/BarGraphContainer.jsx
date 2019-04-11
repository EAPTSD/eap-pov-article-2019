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
    years: [
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
    ],
  };

  componentDidMount() {
    const { years } = this.state;
    Promise.all([d3.csv(higherPovertyData)]).then((files) => {
      const formattedHigherPovertyData = formatHigherPovertyData(
        files[0],
        years
      );
      this.setState({
        // higherPovertyDisplayData: formattedHigherPovertyData[0],
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
          }, 2000);
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
      }, 1200);
      this.setState({
        displayText: years[index].toString(),
        headerClass: 'BarGraphContainer-fadeIn',
        higherPovertyDisplayData: reserveData[index],
        index: index === 16 ? 0 : index + 1,
        first: false,
      });
    }, 1500);
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
