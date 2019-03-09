// External Imports
import React, { Component } from 'react';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryStack } from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatHigherPovertyDataV2 from '../../../utilities/formatHigherPovertyDataV2';
import './BarGraphV2.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraphV2 extends Component {
  state = {
    higherPovertyDisplayData: null,
    reserveData: null,
    years: [2006, 2010, 2014, 2018],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(higherPovertyData), //
    ]).then((files) => {
      const formattedHigherPovertyData = files.map((file) => {
        return formatHigherPovertyDataV2(file, 2002);
      });
      this.setState({
        higherPovertyDisplayData: this.transformDataforDisplay(
          formattedHigherPovertyData[0]
        ),
        reserveData: files,
      });
    });

    const elements = document.querySelectorAll('.BarGraph-sticky');
    Stickyfill.add(elements);
  }

  transformDataforDisplay = (dataset) => {
    const totals = dataset[0].map((data, i) => {
      return dataset.reduce((memo, curr) => {
        return memo + curr[i].y;
      }, 0);
    });
    return dataset.map((data) => {
      return data.map((datum, i) => {
        return { x: datum.x, y: (datum.y / totals[i]) * 100 };
      });
    });
  };

  updateGraph = (year) => {
    const { reserveData, higherPovertyDisplayData } = this.state;
    const updatedHigherPovertyData = reserveData.map((data) => {
      return formatHigherPovertyDataV2(data, year);
    });
    const upUp = this.transformDataforDisplay(updatedHigherPovertyData[0]);
    higherPovertyDisplayData.forEach((element, i) => {
      element.push(upUp[i][0]);
    });
    this.setState({
      higherPovertyDisplayData: higherPovertyDisplayData,
    });
  };

  render() {
    const { higherPovertyDisplayData, years } = this.state;
    return (
      <div className="BarGraphV2-sequence-container">
        <div className="BarGraphV2-container BarGraph-sticky">
          <VictoryChart
            height={400}
            width={400}
            domainPadding={{ x: 25 }}
            animate={{ duration: 500 }}
          >
            <VictoryStack
              colorScale={['red', 'yellow', 'blue', 'black', 'green']}
            >
              {higherPovertyDisplayData &&
                higherPovertyDisplayData.map((data, i) => {
                  return <VictoryBar data={data} key={i} />;
                })}
            </VictoryStack>
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
            <VictoryAxis tickFormat={[2002, 2006, 2010, 2014, 2018]} />
          </VictoryChart>
        </div>
        {years.map((year) => {
          return (
            <>
              <div className="BarGraphV2-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(year)} />
              <div className="BarGraphV2-waypoint-buffer" />
            </>
          );
        })}
      </div>
    );
  }
}

export default BarGraphV2;
