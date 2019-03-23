// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';

// Internal Imports
import formatClassData from '../../../utilities/formatClassData';
import StackedAreaGraphV2 from '../StackedAreaGraphV2';
import StackedAreaLegend from './StackedAreaLegend';
import './StackedAreaGraphContainer.css';

// Data
import eapClassData from '../../../data/StackedAreaGraphData/eap_economic_class.csv';
import eapExChinaClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class.csv';
import eapPercentageClassData from '../../../data/StackedAreaGraphData/eap_economic_class_percentage.csv';
import eapExChinaPercentageClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class_percentage.csv';

class StackedAreaGraphContainer extends Component {
  state = {
    data: [],
    povClasses: [
      'Extreme Poor',
      'Moderate Poor',
      'Economically Vulnerable',
      'Economically Secure',
      'Middle Class',
    ],
    coolColors: ['#002C61', '#004B8F', '#006BC9', '#3795E5', '#65B4F4'],
    purpColors: ['#2E0854', '#580fa2', '#831ce9', '#ad6af1', '#d8b7f8'],
    displayText: '',
    formattedClassData: [],
    index: 0,
    percentageData: [],
    stackedAreaText: [
      'EAP Economic Class with China',
      'EAP Economic Class without China',
    ],
    externalMutations: undefined,
  };

  componentDidMount() {
    Promise.all([
      d3.csv(eapClassData),
      d3.csv(eapExChinaClassData),
      d3.csv(eapPercentageClassData),
      d3.csv(eapExChinaPercentageClassData),
    ]).then((files) => {
      const formattedClassData = files.map((file) => {
        return formatClassData(file);
      });
      this.setState(
        {
          data: formattedClassData[0],
          displayText: this.state.stackedAreaText[0],
          percentageData: formattedClassData[2],
          formattedClassData,
        },
        () => {
          this.updateGraph();
        }
      );
    });
  }

  updateGraph = () => {
    setInterval(() => {
      const { index, formattedClassData, stackedAreaText } = this.state;
      this.setState({
        data: formattedClassData[index],
        displayText: stackedAreaText[index],
        percentageData: formattedClassData[index + 2],
        index: index === 1 ? 0 : 1,
      });
    }, 5000);
  };

  removeMutation = () => {
    this.setState({
      externalMutations: undefined,
    });
  };

  highlightArea = (i) => {
    const callback = this.removeMutation;
    const area = `area-${i}`;
    this.setState({
      externalMutations: [
        {
          childName: area,
          target: 'data',
          eventKey: 'all',
          mutation: () => ({ style: { fill: 'gold' } }),
          callback,
        },
      ],
    });
  };

  unhighlightArea = (i) => {
    const callback = this.removeMutation;
    const area = `area-${i}`;
    this.setState({
      externalMutations: [
        {
          childName: area,
          target: 'data',
          eventKey: 'all',
          mutation: () => ({ style: undefined }),
          callback,
        },
      ],
    });
  };

  render() {
    const {
      data,
      coolColors,
      purpColors,
      povClasses,
      percentageData,
      displayText,
      externalMutations,
    } = this.state;
    return (
      <div>
        <div className="StackedAreaGraphContainer-sequence-container container-fluid">
          <div className="row">
            <div className="col text-center">
              <h1 className="StackedAreaGraphContainer-header-text">
                {displayText}
              </h1>
            </div>
          </div>
          <div className="StackedAreaGraphContainer-container row">
            <div className="col-sm">
              <StackedAreaGraphV2
                data={data}
                color={'blue'}
                externalMutations={externalMutations}
              />
            </div>
            <div className="col-sm">
              <StackedAreaGraphV2
                data={percentageData}
                color={purpColors}
                isPercent={true}
                externalMutations={externalMutations}
              />
            </div>
          </div>
          <div className="row text-center legend-container">
            <div className="col-sm">
              <StackedAreaLegend
                povClasses={povClasses}
                coolColors={coolColors}
                purpColors={purpColors}
                highlightArea={this.highlightArea}
                unhighlightArea={this.unhighlightArea}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StackedAreaGraphContainer;
