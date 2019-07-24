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

// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { Waypoint } from 'react-waypoint';;

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
    index: 1,
    percentageData: [],
    stackedAreaText: ['with China', 'without China'],
    headerClass: '',
    start: false,
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
        displayText: this.state.stackedAreaText[0],
        percentageData: formattedClassData[2],
        formattedClassData,
      });
    });
  }

  startGraph = () => {
    const { start } = this.state;
    if (!start) {
      this.setState(
        {
          start: true,
        },
        () => {
          this.updateGraph();
        }
      );
    }
  };

  stopGraph = () => {
    if (this.saInt) {
      this.setState(
        {
          start: false,
        },
        () => {
          clearInterval(this.saInt);
        }
      );
    }
  };

  updateGraph = () => {
    this.graphUpdater();
    this.saInt = setInterval(() => {
      this.graphUpdater();
    }, 3000);
  };

  graphUpdater = () => {
    const { index, formattedClassData, stackedAreaText } = this.state;
    setTimeout(() => {
      this.setState({
        headerClass: 'fadeOut',
      });
    }, 2000);
    this.setState({
      data: formattedClassData[index],
      displayText: stackedAreaText[index],
      headerClass: 'fadeIn',
      percentageData: formattedClassData[index + 2],
      index: index === 1 ? 0 : 1,
    });
  }

  render() {
    const {
      start,
      data,
      coolColors,
      purpColors,
      povClasses,
      percentageData,
      displayText,
      headerClass,
    } = this.state;
    return (
      <div className="StackedAreaGraphContainer-sequence-container container-fluid">
        <Waypoint
          onEnter={() => {
            this.startGraph();
          }}
        />
        <div className="row">
          <div className="col text-center">
            <h1 className="StackedAreaGraphContainer-header-text">
              EAP Economic Class
            </h1>
            <h2
              className={`StackedAreaGraphContainer-header-text-change ${
                start ? headerClass : ''
              }`}
            >
              {displayText}
            </h2>
          </div>
        </div>
        <div className="StackedAreaGraphContainer-container row">
          <div className="col-sm">
            <StackedAreaGraphV2 data={data} color={'blue'} />
          </div>
          <div className="col-sm">
            <StackedAreaGraphV2
              data={percentageData}
              color={purpColors}
              isPercent={true}
            />
          </div>
        </div>
        <div className="row text-center StackedAreaLegend-container">
          <div className="col-sm">
            <StackedAreaLegend
              povClasses={povClasses}
              coolColors={coolColors}
              purpColors={purpColors}
            />
          </div>
        </div>
        <Waypoint
          onLeave={() => {
            this.stopGraph();
          }}
          onEnter={(currentPosition) => {
            if (currentPosition.previousPosition === 'above') {
              this.startGraph();
            }
          }}
        />
      </div>
    );
  }
}

export default StackedAreaGraphContainer;
