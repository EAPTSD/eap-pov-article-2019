// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';

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
  }

  handleClick = (e) => {
    const countryIndex = e.target.value;
    this.setState({
      data: this.state.formattedClassData[countryIndex],
      activeCountry: this.state.countries[countryIndex],
    });
  };

  render() {
    const { data, percentageData } = this.state;
    return (
      <div>
        <StackedAreaGraphTwo data={data} color={'blue'} />
        <StackedAreaGraphTwo data={percentageData} color={'red'} />
      </div>
    );
  }
}

export default StackedAreaGraphContainer;
