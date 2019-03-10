// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryBar } from 'victory';
import * as d3 from 'd3';

// Internal Imports
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import './BarGraphV2.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraphV2 extends Component {
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
  }

  render() {
    const { higherPovertyDisplayData } = this.state;
    return (
      <div className="BarGraphV2-sequence-container">
        <div className="BarGraphV2-container">
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
      </div>
    );
  }
}

export default BarGraphV2;
