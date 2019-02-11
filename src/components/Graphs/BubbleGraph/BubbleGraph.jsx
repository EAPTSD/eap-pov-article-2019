// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';

// Internal Imports
import formatPovertyData from '../../../utilities/formatPovertyData';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import './BubbleGraph.css';

// Data
import asean1_9 from '../../../data/asean_1.9.csv';
import asean3_2 from '../../../data/asean_3.2.csv';
import asean5_5 from '../../../data/asean_5.5.csv';

class BubbleGraph extends Component {
  state = {
    displayData: [],
    reserveData: [],
    index: 1,
    fixed: null,
    colors: ['#191970', '#1E90FF', '#87CEFA'],
    asean1_9: null,
    asean3_2: null,
    asean5_5: null
  };

  componentDidMount() {
    Promise.all([d3.csv(asean1_9), d3.csv(asean3_2), d3.csv(asean5_5)]).then(
      files => {
        const formattedPovertyData = files.map(file => {
          return formatPovertyData(file);
        });
        this.setState({
          reserveData: formattedPovertyData,
          asean1_9: formattedPovertyData[0],
          asean3_2: formattedPovertyData[1],
          asean5_5: formattedPovertyData[2]
        });
      }
    );
  }

  updateGraph = index => {
    this.setState({
      displayData: displayDataPopulator(this.state.reserveData, index)
    });
  };

  fixPosition = () => {
    this.setState({
      fixed: this.state.fixed ? null : 'fixed'
    });
  };

  render() {
    const { fixed } = this.state;
    return (
      <div className="BubbleGraph-sequence-container">
        <div className="testing">
          <Waypoint
            onLeave={() => {
              this.fixPosition();
              console.log('hello');
              this.updateGraph(0);
            }}
          />
        </div>
        <div className={`BubbleGraph-container ${fixed}`}>
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

        <div className="foo">No Year Data</div>

        <Waypoint onEnter={() => this.updateGraph(1)} />

        <div className="foo">2012</div>

        <Waypoint onEnter={() => this.updateGraph(2)} />

        <div className="foo">2013</div>

        <Waypoint onEnter={() => this.updateGraph(3)} />

        <div className="foo">2014</div>

        <Waypoint onEnter={() => this.updateGraph(4)} />

        <div className="foo">2015</div>

        <Waypoint onEnter={() => this.updateGraph(5)} />

        <div className="foo">2016</div>

        <Waypoint onEnter={() => this.updateGraph(6)} />

        <div className="foo">2017</div>

        <Waypoint onEnter={() => this.updateGraph(7)} />

        <div className="foo">2018</div>
      </div>
    );
  }
}

export default BubbleGraph;
