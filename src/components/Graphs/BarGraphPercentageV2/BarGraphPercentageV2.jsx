// External Imports
import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryStack } from 'victory';
import * as d3 from 'd3';

// Internal Imports
import formatHigherPovertyDataV2 from '../../../utilities/formatHigherPovertyDataV2';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import './BarGraphPercentageV2.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov_V2.csv';

class BarGraphPercentageV2 extends Component {
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
  }

  render() {
    const { higherPovertyDisplayData } = this.state;
    return (
      <div className="BarGraphPercentageV2-sequence-container">
        <div className="BarGraphPercentageV2-container">
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
      </div>
    );
  }
}

export default BarGraphPercentageV2;
