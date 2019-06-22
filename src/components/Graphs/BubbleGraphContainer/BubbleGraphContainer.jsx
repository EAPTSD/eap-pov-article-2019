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
import asean_woChina_1_9 from '../../../data/BubbleGraphData/asean_woChina_1.9.csv';
import asean_woChina_3_2 from '../../../data/BubbleGraphData/asean_woChina_3.2.csv';
import asean_woChina_5_5 from '../../../data/BubbleGraphData/asean_woChina_5.5.csv';

class BubbleGraphContainer extends Component {
  state = {
    displayData: [],
    reserveDataWChina: [],
    reserveDataWoChina: [],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    colors: ['#191970', '#325DDF', '#87CEFA'],
    asean1_9: null,
    asean3_2: null,
    asean5_5: null,
    bubbleGraphText: ['with China', 'without China'],
    displayText: 'with China',
    headerClass: 'hide-text',
  };

  componentDidMount() {
    const { colors } = this.state;
    Promise.all([
      d3.csv(asean_wChina_1_9),
      d3.csv(asean_wChina_3_2),
      d3.csv(asean_wChina_5_5),
      d3.csv(asean_woChina_1_9),
      d3.csv(asean_woChina_3_2),
      d3.csv(asean_woChina_5_5),
    ]).then((files) => {
      const povertyDataWChina = files.slice(0, 3);
      const povertyDataWoChina = files.slice(3, 6);

      const formattedPovertyDataWChina = povertyDataWChina.map((file, i) => {
        const tractColor = colors[i];
        return formatPovertyData(file, tractColor);
      });

      const displayArrChina = displayDataPopulator(
        formattedPovertyDataWChina,
        7
      );
      const resChina = [];
      for (let i = 0; i < displayArrChina[0].length; i++) {
        resChina.push(displayArrChina[0][i]);
        resChina.push(displayArrChina[1][i]);
        resChina.push(displayArrChina[2][i]);
      }

      const formattedPovertyDataWoChina = povertyDataWoChina.map((file, i) => {
        const tractColor = colors[i];
        return formatPovertyData(file, tractColor);
      });

      const displayArrWoChina = displayDataPopulator(
        formattedPovertyDataWoChina,
        7
      );
      const resWoChina = [];
      for (let i = 0; i < displayArrWoChina[0].length; i++) {
        resWoChina.push(displayArrWoChina[0][i]);
        resWoChina.push(displayArrWoChina[1][i]);
        resWoChina.push(displayArrWoChina[2][i]);
      }

      this.setState({
        reserveDataWChina: resChina,
        reserveDataWoChina: resWoChina,
      });
    });

    const elements = document.querySelectorAll('.BubbleGraphContainer-sticky');
    Stickyfill.add(elements);
  }

  updateGraph = (withChina) => {
    const {
      reserveDataWChina,
      reserveDataWoChina,
      bubbleGraphText,
    } = this.state;

    let headerClass;
    let displayText;
    let displayData = [];

    if (withChina === true) {
      headerClass = 'fadeIn';
      displayText = bubbleGraphText[0];
      displayData = reserveDataWChina;
    } else if (withChina === false) {
      headerClass = 'fadeIn';
      displayText = bubbleGraphText[1];
      displayData = reserveDataWoChina;
    } else if (withChina === 'end') {
      headerClass = 'fadeOut';
      displayText = bubbleGraphText[1];
      displayData = [];
    } else {
      headerClass = 'fadeOut';
      displayText = bubbleGraphText[0];
      displayData = [];
    }

    this.setState({
      displayData: displayData,
      headerClass: headerClass,
      displayText: displayText,
    });
  };

  render() {
    const { displayData, headerClass, displayText } = this.state;
    return (
      <div className="BubbleGraphContainer-sequence-container">
        <div className="BubbleGraphContainer-container BubbleGraphContainer-sticky container-fluid">
          <div className="row h-100">
            <div className="col-6" />
            <div className="col-6 BubbleGraphContainer-align-center">
              <div className="BubbleGraphContainer-header-container text-center">
                <h1 className="BubbleGraphContainer-header-text">
                  Developing EAP
                </h1>
                <span
                  className={`BubbleGraphContainer-header-text-change ${headerClass}`}
                >
                  {displayText}
                </span>
                <BubbleGraphV2 displayData={displayData} />
              </div>
            </div>
          </div>
        </div>
        <Waypoint
          onEnter={({ previousPosition }) => {
            if (previousPosition === 'above') {
              return this.updateGraph();
            } else {
              setTimeout(() => {
                this.updateGraph(true);
              }, 400);
            }
          }}
        />
        <div className="temp" />
        <p className="introtext-1" key="text-1-0">
          Where the poverty threshold is set makes a tremendous difference in
          how policymakers think about who and how many people are poor.
        </p>
        <p className="text-1" key="text-1-1">
          Monitoring poverty at higher poverty lines is becoming increasingly
          important to ensure an appropriate policy response for the poor living
          in countries with higher costs of living and rising aspirations.
        </p>
        <Waypoint
          onEnter={({ previousPosition }) => {
            if (previousPosition === 'above') {
              return this.updateGraph(true);
            } else {
              setTimeout(() => {
                this.updateGraph(false);
              }, 400);
            }
          }}
        />
        <div className="temp" />
        <p className="text-1" key="text-1-2">
          In developing EAP in 2018, an estimated 30 million people lived on
          less than $1.90 a day, while 168 million lived on less than $3.20 a
          day, and 538 million on less than $5.50 a day.
        </p>
        <p className="text-1-last" key="text-1-3">
          Although $5.50 is slightly less than three times higher than the
          International poverty line ($1.90 a day), the number of poor at this
          higher line is almost eighteen times more than the number of extreme
          poor because such a large proportion of the population lives between
          $1.90/day and $5.50/day.
        </p>
        <Waypoint
          onEnter={({ previousPosition }) => {
            if (previousPosition === 'above') {
              return this.updateGraph(false);
            } else {
              setTimeout(() => {
                this.updateGraph('end');
              }, 400);
            }
          }}
        />
        <div className="temp" />
      </div>
    );
  }
}

export default BubbleGraphContainer;
