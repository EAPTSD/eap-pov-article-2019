// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryBar, Bar } from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import './BarGraph.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraph extends Component {
  state = {
    higherPovertyDisplayData: null,
    reserveData: null,
    years: [2002, 2006, 2010, 2014, 2018],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(higherPovertyData), //
    ]).then((files) => {
      const formattedHigherPovertyData = files.map((file) => {
        return formatHigherPovertyData(file, 2002);
      });
      this.setState(
        {
          higherPovertyDisplayData: formattedHigherPovertyData[0],
          reserveData: files,
        },
        () => console.log(this.state.higherPovertyData)
      );
    });

    const elements = document.querySelectorAll('.BarGraph-sticky');
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
    const { higherPovertyDisplayData, years } = this.state;
    return (
      <div className="BarGraph-sequence-container">
        <div className="BarGraph-container BarGraph-sticky">
          <VictoryChart
            height={400}
            width={400}
            domainPadding={{ x: 50 }}
            animate={{ duration: 500 }}
          >
            <VictoryBar data={higherPovertyDisplayData} />
          </VictoryChart>
        </div>
        {years.map((year) => {
          return (
            <>
              <div className="BubbleGraph-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(year)} />
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraph;
