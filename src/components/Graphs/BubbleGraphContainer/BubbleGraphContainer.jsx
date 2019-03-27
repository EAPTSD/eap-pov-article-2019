// External Imports
import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
} from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatPovertyData from '../../../utilities/formatPovertyData';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import BubbleGraphV2 from '../BubbleGraphV2';
import './BubbleGraphContainer.css';

// Data
import asean1_9 from '../../../data/BubbleGraphData/asean_1.9.csv';
import asean3_2 from '../../../data/BubbleGraphData/asean_3.2.csv';
import asean5_5 from '../../../data/BubbleGraphData/asean_5.5.csv';

class BubbleGraphContainer extends Component {
  state = {
    displayData: [],
    reserveData: [],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    colors: ['#191970', '#325DDF', '#87CEFA'],
    asean1_9: null,
    asean3_2: null,
    asean5_5: null,
  };

  componentDidMount() {
    const { colors } = this.state;
    Promise.all([d3.csv(asean1_9), d3.csv(asean3_2), d3.csv(asean5_5)]).then(
      (files) => {
        const formattedPovertyData = files.map((file, i) => {
          const tractColor = colors[i];
          return formatPovertyData(file, tractColor);
        });
        this.setState({
          reserveData: formattedPovertyData,
          asean1_9: formattedPovertyData[0],
          asean3_2: formattedPovertyData[1],
          asean5_5: formattedPovertyData[2],
        });
      }
    );

    const elements = document.querySelectorAll('.BubbleGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (index) => {
    const { reserveData } = this.state;
    const displayArr = displayDataPopulator(reserveData, index);
    const res = [];
    for (let i = 0; i < displayArr[0].length; i++) {
      res.push(displayArr[0][i]);
      res.push(displayArr[1][i]);
      res.push(displayArr[2][i]);
    }
    this.setState({
      displayData: res,
    });
  };

  render() {
    const { index, displayData } = this.state;
    const { flowText } = this.props;
    return (
      <div className="BubbleGraphContainer-sequence-container">
        <h1>hi</h1>
        <div className="BubbleGraphContainer-container BubbleGraphContainer-sticky">
          <BubbleGraphV2 displayData={displayData} />
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="BubbleGraphContainer-waypoint-buffer" />
              {i === 0 ? (
                <Waypoint onEnter={() => this.updateGraph(0)} />
              ) : null}
              {i === 1 ? (
                <Waypoint onEnter={() => this.updateGraph(7)} />
              ) : null}
              <div className="BubbleGraphContainer-waypoint-buffer">
                <p className="bg-text">{flowText[i]}</p>
              </div>
              {i === 7 ? (
                <div className="BubbleGraphContainer-waypoint-buffer" />
              ) : null}
            </>
          );
        })}
      </div>
    );
  }
}

export default BubbleGraphContainer;
