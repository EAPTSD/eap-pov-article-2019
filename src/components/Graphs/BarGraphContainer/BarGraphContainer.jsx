// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';

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
      this.setState(
        {
          higherPovertyDisplayData: formattedHigherPovertyData[0],
          reserveData: formattedHigherPovertyData,
        },
        () => {
          this.updateGraph();
        }
      );
    });
  }

  updateGraph = () => {
    setInterval(() => {
      const { reserveData, index, years } = this.state;
      this.setState({
        displayText: years[index].toString(),
        headerClass: 'fadeIn',
        higherPovertyDisplayData: reserveData[index],
        index: index === 16 ? 0 : index + 1,
      });
    }, 1300);
  };

  render() {
    const { higherPovertyDisplayData, displayText, headerClass } = this.state;
    return (
      <div className="BarGraphContainer-sequence-container container-fluid">
        <div className="row">
          <div className="col text-center">
            <h1 className="StackedAreaGraphContainer-header-text">
              EAP Economic Class
            </h1>
            <span
              className={`StackedAreaGraphContainer-header-text-change ${headerClass}`}
            >
              {displayText}
            </span>
          </div>
        </div>
        <div className="BarGraphContainer-container row">
          <div className="col-sm">
            <BarGraphV2 higherPovertyDisplayData={higherPovertyDisplayData} />
          </div>
        </div>
      </div>
    );
  }
}

export default BarGraphContainer;
