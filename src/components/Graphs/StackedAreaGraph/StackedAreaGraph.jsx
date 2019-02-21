// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory';
import * as d3 from 'd3';
import { Button } from 'reactstrap';

// Internal Imports
import formatClassData from '../../../utilities/formatClassData';
import './StackedAreaGraph.css';

// Data
import aseanClassData from '../../../data/StackedAreaGraphData/asean_economic_class.csv';
import indonesiaClassData from '../../../data/StackedAreaGraphData/indonesia_economic_class.csv';
import laoClassData from '../../../data/StackedAreaGraphData/lao_economic_class.csv';
import malaysiaClassData from '../../../data/StackedAreaGraphData/malaysia_economic_class.csv';
import myanmarClassData from '../../../data/StackedAreaGraphData/myanmar_economic_class.csv';
import philippinesClassData from '../../../data/StackedAreaGraphData/philippines_economic_class.csv';
import thailandClassData from '../../../data/StackedAreaGraphData/thailand_economic_class.csv';
import vietnamClassData from '../../../data/StackedAreaGraphData/vietnam_economic_class.csv';

class StackedAreaGraph extends Component {
  state = {
    data: [],
    countries: [
      'ASEAN',
      'Indonesia',
      'Lao PDR',
      'Malaysia',
      'Myanmar',
      'Philippines',
      'Thailand',
      'Vietnam',
    ],
    activeCountry: 'ASEAN',
    formattedClassData: [],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(aseanClassData),
      d3.csv(indonesiaClassData),
      d3.csv(laoClassData),
      d3.csv(malaysiaClassData),
      d3.csv(myanmarClassData),
      d3.csv(philippinesClassData),
      d3.csv(thailandClassData),
      d3.csv(vietnamClassData),
    ]).then((files) => {
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
    const { activeCountry, data, countries } = this.state;
    return (
      <div>
        <div className="button-container text-center p-3">
          {countries.map((country, i) => {
            return (
              <Button
                outline
                color="primary"
                className={`mr-2 ${
                  activeCountry === country ? 'active' : null
                }`}
                key={`country-button-${i}`}
                value={i}
                onClick={(e) => this.handleClick(e)}
              >
                {country}
              </Button>
            );
          })}
        </div>
        <div className="stacked-area-container">
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

export default StackedAreaGraph;