// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import BarGraphV2 from '../BarGraphV2';
import BarGraphPercentageV2 from '../BarGraphPercentageV2';
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import './BarGraphContainer.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraphContainer extends Component {
  state = {
    higherPovertyDisplayData: null,
    reserveData: null,
    years: [2002, 2006, 2010, 2014, 2018],
    index: [1, 2, 3, 4, 5],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(higherPovertyData), //
    ]).then((files) => {
      const formattedHigherPovertyData = files.map((file) => {
        return formatHigherPovertyData(file, 2002);
      });
      this.setState({
        higherPovertyDisplayData: formattedHigherPovertyData[0],
        reserveData: files,
      });
    });

    const elements = document.querySelectorAll('.BarGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (year) => {
    const { reserveData } = this.state;
    const updatedHigherPovertyData = reserveData.map((data) => {
      return formatHigherPovertyData(data, year);
    });
    this.setState({
      higherPovertyDisplayData: updatedHigherPovertyData[0],
    });
  };

  render() {
    const { years, higherPovertyDisplayData } = this.state;
    return (
      <div>
        <div className="BarGraphContainer-sequence-container BarGraphContainer-sticky container-fluid">
          <div className="BarGraphContainer-container row">
            <div className="col-sm">
              <BarGraphV2 higherPovertyDisplayData={higherPovertyDisplayData} />
            </div>
            <div className="col-sm">
              <BarGraphPercentageV2 />
            </div>
          </div>
        </div>
        {years.map((year) => {
          return (
            <>
              <div className="BarGraphContainer-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(year)} />
              <div className="BarGraphContainer-waypoint-buffer" />
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraphContainer;
