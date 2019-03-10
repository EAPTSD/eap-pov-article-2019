// External Imports
import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryStack } from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatHigherPovertyDataV2 from '../../../utilities/formatHigherPovertyDataV2';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import './BarGraphPercentage.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov_V2.csv';

class BarGraphPercentage extends Component {
  state = {
    higherPovertyDisplayData: [],
    reserveData: null,
    index: [1, 2, 3, 4, 5],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(higherPovertyData), //
    ]).then((files) => {
      const formattedHigherPovertyData = files.map((file) => {
        return formatHigherPovertyDataV2(file);
      });
      const displayArr = displayDataPopulator(formattedHigherPovertyData[0], 1);
      this.setState({
        higherPovertyDisplayData: displayArr,
        reserveData: formattedHigherPovertyData[0],
      });
    });

    const elements = document.querySelectorAll('.BarGraph-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (index) => {
    const { reserveData } = this.state;
    const displayArr = displayDataPopulator(reserveData, index);
    this.setState({
      higherPovertyDisplayData: displayArr,
    });
  };

  render() {
    const { higherPovertyDisplayData, index } = this.state;
    return (
      <div className="BarGraphPercentage-sequence-container">
        <div className="BarGraphPercentage-container BarGraph-sticky">
          <VictoryChart height={400} width={400} domainPadding={{ x: 25 }}>
            <VictoryStack
              colorScale={['red', 'yellow', 'blue', 'black', 'green']}
            >
              {higherPovertyDisplayData &&
                higherPovertyDisplayData.map((data, i) => {
                  return (
                    <VictoryBar
                      data={data}
                      key={i}
                      barWidth={25}
                      animate={{
                        onEnter: {
                          duration: 500,
                        },
                      }}
                    />
                  );
                })}
            </VictoryStack>
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
            <VictoryAxis tickFormat={[2002, 2006, 2010, 2014, 2018]} />
          </VictoryChart>
        </div>
        {index.map((index) => {
          return (
            <>
              <div className="BarGraphPercentage-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(index)} />
              <div className="BarGraphPercentage-waypoint-buffer" />
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraphPercentage;
