// External Imports
import React, { Component } from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
} from 'victory';
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

    const elements = document.querySelectorAll('.BubbleGraph-sticky');
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
      <div className="BubbleGraph-sequence-container">
        <div className="BubbleGraph-container BubbleGraph-sticky">
          <VictoryChart
            height={400}
            width={450}
            scale={{ x: 'time' }}
            domain={{
              x: [new Date(2011, 1, 1), new Date(2018, 1, 1)],
              y: [0, 60],
            }}
          >
            <VictoryLegend
              x={325}
              y={50}
              orientation="horizontal"
              gutter={20}
              style={{
                data: { stroke: 'black', strokeWidth: 1 },
                border: { stroke: 'black' },
              }}
              colorScale={['#87CEFA', '#325DDF', '#191970']}
              data={[{ name: 'One' }, { name: 'Two' }, { name: 'Three' }]}
              itemsPerRow={1}
            />
            <VictoryScatter
              bubbleProperty="size"
              data={displayData}
              style={{
                data: {
                  fill: (d) => d.fill,
                  stroke: 'black',
                  strokeWidth: '1px',
                },
              }}
              animate={{
                onExit: {
                  duration: 500,
                  before: () => ({ opacity: 0.3, _y: 0 }),
                },
                onEnter: {
                  duration: 500,
                  before: () => ({ opacity: 0.3, _y: 0 }),
                  after: (datum) => ({ opacity: 1, _y: datum._y }),
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}%`}
              label={'Poverty Rate (Percentage)'}
              axisLabelComponent={<VictoryLabel dy={-12} />}
              style={{
                axisLabel: { fontSize: 12 },
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
            <VictoryAxis
              crossAxis
              style={{
                tickLabels: { fontSize: 10, padding: 5 },
              }}
            />
          </VictoryChart>
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="BubbleGraph-waypoint-buffer" />
              {i === 0 ? (
                <Waypoint onEnter={() => this.updateGraph(0)} />
              ) : null}
              {i === 1 ? (
                <Waypoint onEnter={() => this.updateGraph(7)} />
              ) : null}
              <div className="BubbleGraph-waypoint-buffer">
                <p className="bg-text">{flowText[i]}</p>
              </div>
              {i === 7 ? <div className="BubbleGraph-waypoint-buffer" /> : null}
            </>
          );
        })}
      </div>
    );
  }
}

export default BubbleGraph;
