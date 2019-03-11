// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Stickyfill from 'stickyfilljs';
import Waypoint from 'react-waypoint';

// Internal Imports
import BarGraphV2 from '../BarGraphV2';
import BarGraphPercentageV2 from '../BarGraphPercentageV2';
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import formatHigherPovertyDataV2 from '../../../utilities/formatHigherPovertyDataV2';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import './BarGraphContainer.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';
import percHigherPovertyData from '../../../data/BarGraphData/EAP_higher_pov_V2.csv';

class BarGraphContainer extends Component {
  state = {
    higherPovertyDisplayData: [],
    reserveData: [],
    percHigherPovertyDisplayData: [],
    percReserveData: [],
    years: [2002, 2006, 2010, 2014, 2018],
    index: [1, 2, 3, 4, 5],
    buffer: [0, 1, 2, 3, 4],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(higherPovertyData), //
      d3.csv(percHigherPovertyData),
    ]).then((files) => {
      const formattedHigherPovertyData = formatHigherPovertyData(
        files[0],
        2002
      );
      const formattedPercHigherPovertyData = formatHigherPovertyDataV2(
        files[1]
      );
      const displayArr = displayDataPopulator(
        formattedPercHigherPovertyData,
        1
      );
      this.setState({
        higherPovertyDisplayData: formattedHigherPovertyData,
        percHigherPovertyDisplayData: displayArr,
        reserveData: files[0],
        percReserveData: formattedPercHigherPovertyData,
      });
    });

    const elements = document.querySelectorAll('.BarGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (buffer) => {
    const { years, index, reserveData, percReserveData } = this.state;
    const year = years[buffer];
    const i = index[buffer];
    const updatedHigherPovertyData = formatHigherPovertyData(reserveData, year);
    const displayArr = displayDataPopulator(percReserveData, i);
    this.setState({
      higherPovertyDisplayData: updatedHigherPovertyData,
      percHigherPovertyDisplayData: displayArr,
    });
  };

  render() {
    const {
      buffer,
      higherPovertyDisplayData,
      percHigherPovertyDisplayData,
    } = this.state;
    return (
      <div>
        <div className="BarGraphContainer-sequence-container BarGraphContainer-sticky container-fluid">
          <div className="BarGraphContainer-container row">
            <div className="col-sm">
              <BarGraphV2 higherPovertyDisplayData={higherPovertyDisplayData} />
            </div>
            <div className="col-sm">
              <BarGraphPercentageV2
                percHigherPovertyDisplayData={percHigherPovertyDisplayData}
              />
            </div>
          </div>
        </div>
        {buffer.map((buffer) => {
          return (
            <>
              <div className="BarGraphContainer-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(buffer)} />
              <div className="BarGraphContainer-waypoint-buffer" />
              {buffer === 4 ? (
                <div className="BarGraphContainer-waypoint-buffer" />
              ) : null}
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraphContainer;
