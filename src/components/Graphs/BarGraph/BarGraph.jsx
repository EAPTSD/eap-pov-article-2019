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
    higherPovertyData: null,
  };

  componentDidMount() {
    Promise.all([d3.csv(higherPovertyData)]).then((files) => {
      const formattedHigherPovertyData = files.map((file) => {
        return formatHigherPovertyData(file, 2002);
      });
      this.setState(
        {
          higherPovertyData: formattedHigherPovertyData[0],
        },
        () => console.log(this.state.higherPovertyData)
      );
    });

    const elements = document.querySelectorAll('.BarGraph-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = () => {};

  render() {
    const { higherPovertyData } = this.state;
    return (
      <div className="BarGraph-sequence-container">
        <div className="BarGraph-container BarGraph-sticky">
          <VictoryChart
            height={400}
            width={400}
            domainPadding={{ x: 50, y: [0, 20] }}
          >
            <VictoryBar data={higherPovertyData} />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default BarGraph;
