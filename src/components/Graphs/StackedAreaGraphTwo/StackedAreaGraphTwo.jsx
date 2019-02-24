// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory';
import * as d3 from 'd3';
import { Button } from 'reactstrap';

// Internal Imports
import formatClassData from '../../../utilities/formatClassData';
import './StackedAreaGraphTwo.css';

// Data
import eapClassData from '../../../data/StackedAreaGraphData/eap_economic_class.csv';
import eapExChinaClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class.csv';
import eapPercentageClassData from '../../../data/StackedAreaGraphData/eap_economic_class_percentage.csv';
import eapExChinaPercentageClassData from '../../../data/StackedAreaGraphData/eap_ex_china_economic_class_percentage.csv';

class StackedAreaGraphTwo extends Component {
  state = {
    data: [],
    formattedClassData: [],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(eapClassData),
      d3.csv(eapExChinaClassData),
      d3.csv(eapPercentageClassData),
      d3.csv(eapExChinaPercentageClassData),
    ]).then((files) => {
      console.log(files);
      const formattedClassData = files.map((file) => {
        return formatClassData(file);
      });
      this.setState({
        data: formattedClassData[0],
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
    const { data } = this.state;
    const { color } = this.props;
    return (
      <div>
        <div className="stacked-area-two-container">
          <VictoryChart
            scale={{ x: 'time' }}
            theme={VictoryTheme.material}
            animate={{ duration: 1000 }}
          >
            <VictoryStack colorScale="blue">
              {data.map((data, i) => {
                return (
                  <VictoryArea key={i} data={data} interpolation="basis" />
                );
              })}
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default StackedAreaGraphTwo;
