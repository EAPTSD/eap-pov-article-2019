// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatPovertyData from '../../../utilities/formatPovertyData';
import displayDataPopulator from '../../../utilities/displayDataPopulator';
import BubbleGraphV2 from '../BubbleGraphV2';
import './BubbleGraphContainer.css';

// Data
import asean_wChina_1_9 from '../../../data/BubbleGraphData/asean_wChina_1.9.csv';
import asean_wChina_3_2 from '../../../data/BubbleGraphData/asean_wChina_3.2.csv';
import asean_wChina_5_5 from '../../../data/BubbleGraphData/asean_wChina_5.5.csv';

class BubbleGraphContainer extends Component {
  state = {
    displayData: [],
    reserveDataWChina: [],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    colors: ['#191970', '#325DDF', '#87CEFA'],
    asean1_9: null,
    asean3_2: null,
    asean5_5: null,
    bubbleGraphText: ['with China', 'without China'],
    displayText: '',
    headerClass: '',
  };

  componentDidMount() {
    const { colors } = this.state;
    Promise.all([
      d3.csv(asean_wChina_1_9),
      d3.csv(asean_wChina_3_2),
      d3.csv(asean_wChina_5_5),
    ]).then((files) => {
      const formattedPovertyDataWChina = files.map((file, i) => {
        const tractColor = colors[i];
        return formatPovertyData(file, tractColor);
      });
      this.setState({
        reserveDataWChina: formattedPovertyDataWChina,
      });
    });

    const elements = document.querySelectorAll('.BubbleGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (index, withChina) => {
    let headerClass;
    let displayText;
    const { reserveDataWChina, bubbleGraphText } = this.state;
    const displayArr = displayDataPopulator(reserveDataWChina, index);
    const res = [];
    for (let i = 0; i < displayArr[0].length; i++) {
      res.push(displayArr[0][i]);
      res.push(displayArr[1][i]);
      res.push(displayArr[2][i]);
    }
    if (withChina === 'reset') {
      headerClass = 'fadeOut';
      displayText = bubbleGraphText[0];
    } else if (withChina === true) {
      headerClass = 'fadeIn';
      displayText = bubbleGraphText[0];
    } else {
    }
    this.setState({
      displayData: res,
      headerClass: headerClass,
      displayText: displayText,
    });
  };

  render() {
    const { index, displayData, headerClass, displayText } = this.state;
    const { flowText } = this.props;
    return (
      <div className="BubbleGraphContainer-sequence-container">
        <div className="BubbleGraphContainer-container BubbleGraphContainer-sticky">
          <div className="BubbleGraphContainer-header-container text-center">
            <h1 className="BubbleGraphContainer-header-text">Developing EAP</h1>
            <span
              className={`BubbleGraphContainer-header-text-change ${headerClass}`}
            >
              {displayText}
            </span>
          </div>
          <BubbleGraphV2 displayData={displayData} />
        </div>
        {index.map((i) => {
          return (
            <>
              <div className="BubbleGraphContainer-waypoint-buffer" />
              {i === 0 || i === 4 ? (
                <Waypoint onEnter={() => this.updateGraph(0, 'reset')} />
              ) : null}
              {i === 1 ? (
                <Waypoint onEnter={() => this.updateGraph(7, true)} />
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
