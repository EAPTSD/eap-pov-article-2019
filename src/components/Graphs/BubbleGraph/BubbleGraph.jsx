// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatPovertyData from '../../../utilities/formatPovertyData';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import './BubbleGraph.css';

// Data
import asean1_9 from '../../../data/BubbleGraphData/asean_1.9.csv';
import asean3_2 from '../../../data/BubbleGraphData/asean_3.2.csv';
import asean5_5 from '../../../data/BubbleGraphData/asean_5.5.csv';

class BubbleGraph extends Component {
  state = {
    displayData: [],
    reserveData: [],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    colors: ['#191970', '#1E90FF', '#87CEFA'],
    asean1_9: null,
    asean3_2: null,
    asean5_5: null,
  };

  componentDidMount() {
    Promise.all([d3.csv(asean1_9), d3.csv(asean3_2), d3.csv(asean5_5)]).then(
      (files) => {
        const formattedPovertyData = files.map((file) => {
          return formatPovertyData(file);
        });
        this.setState({
          reserveData: formattedPovertyData,
          asean1_9: formattedPovertyData[0],
          asean3_2: formattedPovertyData[1],
          asean5_5: formattedPovertyData[2],
        });
      }
    );

    const elements = document.querySelectorAll('.BubbleGraph-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (index) => {
    console.log('hello');
    this.setState({
      displayData: displayDataPopulator(this.state.reserveData, index),
    });
  };

  render() {
    const { index } = this.state;
    return (
      <div className="BubbleGraph-sequence-container">
        <div className="BubbleGraph-container BubbleGraph-sticky">
          <VictoryChart
            theme={VictoryTheme.material}
            animate={{ duration: 1000 }}
            domain={{ x: [2012, 2018], y: [0, 100] }}
          >
            {this.state.displayData.map((data, i) => {
              return (
                <VictoryScatter
                  style={{ data: { fill: this.state.colors[i] } }}
                  bubbleProperty="size"
                  data={data}
                />
              );
            })}
          </VictoryChart>
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="BubbleGraph-waypoint-buffer" />
              <Waypoint onEnter={() => this.updateGraph(i)} />
            </>
          );
        })}
      </div>
    );
  }
}

export default BubbleGraph;
