// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryBar } from 'victory';
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
      this.setState({
        higherPovertyDisplayData: formattedHigherPovertyData[0],
        reserveData: files,
      });
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
            // domain={{ y: [0, 1000] }}
            domainPadding={{ x: 25 }}
            animate={{ duration: 500 }}
          >
            <VictoryBar
              style={{
                data: {
                  fill: (d) => (d.xName === '< $1.9' ? '#c43a31' : '#000000'),
                },
              }}
              categories={{
                x: ['< $1.9', '$1.9-$3.2', '$3.2-$5.5', '$5.5-$15', '> $15'],
              }}
              data={higherPovertyDisplayData}
            />
          </VictoryChart>
        </div>
        {years.map((year, i) => {
          return (
            <>
              {i === 0 ? <div className="BarGraph-waypoint-buffer" /> : null}
              <div className="BarGraph-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(year)} />
              <div className="BarGraph-waypoint-buffer" />
              {i === 5 ? <div className="BarGraph-waypoint-buffer" /> : null}
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraph;
