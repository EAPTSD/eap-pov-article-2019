// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Waypoint from 'react-waypoint';
import Stickyfill from 'stickyfilljs';

// Internal Imports
import formatClassData from '../../../utilities/formatClassData';
import StackedAreaGraphTwo from '../StackedAreaGraphTwo';
import './StackedAreaGraphContainer.css';

// Data
import eapClassData from '../../../data/StackedAreaGraphData/eap_economic_class.csv';
import eapExChinaClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class.csv';
import eapPercentageClassData from '../../../data/StackedAreaGraphData/eap_economic_class_percentage.csv';
import eapExChinaPercentageClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class_percentage.csv';

class StackedAreaGraphContainer extends Component {
  state = {
    data: [],
    percentageData: [],
    formattedClassData: [],
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
      this.setState({
        data: formattedClassData[0],
        percentageData: formattedClassData[2],
        formattedClassData,
      });
    });

    const elements = document.querySelectorAll(
      '.StackedAreaGraphContainer-sticky'
    );
    Stickyfill.add(elements);
  }

  updateGraph = () => {
    const { formattedClassData } = this.state;
    this.setState({
      data: formattedClassData[1],
      percentageData: formattedClassData[3],
    });
  };

  render() {
    const { data, percentageData } = this.state;
    return (
      <div>
        <div className="StackedAreaGraphContainer-sequence-container StackedAreaGraphContainer-sticky container-fluid">
          <div className="StackedAreaGraphContainer-container row">
            <div className="col-sm">
              <StackedAreaGraphTwo data={data} color={'blue'} />
            </div>
            <div className="col-sm">
              <StackedAreaGraphTwo data={percentageData} color={'warm'} />
            </div>
          </div>
        </div>
        <div>
          <div className="StackedAreaGraphContainer-waypoint-buffer" />
          <Waypoint onEnter={() => this.updateGraph()} />
          <div className="StackedAreaGraphContainer-waypoint-buffer" />
        </div>
      </div>
    );
  }
}

export default StackedAreaGraphContainer;
