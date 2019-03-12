// External Imports
import React, { Component } from 'react';
import { VictoryChart, VictoryStack, VictoryArea, VictoryAxis } from 'victory';
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

// Images
import ASEAN from '../../../images/1200px-Flag_of_ASEAN.svg.png';
import Indonesia from '../../../images/1200px-Flag_of_Indonesia.svg.png';
import Myanmar from '../../../images/1200px-Flag_of_Myanmar.svg.png';
import Vietnam from '../../../images/1200px-Flag_of_Vietnam.svg.png';
import LoaPDR from '../../../images/2000px-Flag_of_Laos.svg.png';
import Philippines from '../../../images/2000px-Flag_of_the_Philippines.svg.png';
import Thailand from '../../../images/th.png';
import Malaysia from '../../../images/my.png';

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
    flags: {
      ASEAN: ASEAN,
      Indonesia: Indonesia,
      'Lao PDR': LoaPDR,
      Malaysia: Malaysia,
      Myanmar: Myanmar,
      Philippines: Philippines,
      Thailand: Thailand,
      Vietnam: Vietnam,
    },
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

  handleClick = (i) => {
    const { formattedClassData, countries } = this.state;
    const countryIndex = i;
    console.log(i);

    this.setState({
      data: formattedClassData[countryIndex],
      activeCountry: countries[countryIndex],
    });
  };

  render() {
    const { activeCountry, data, countries, flags } = this.state;
    return (
      <div>
        <div className="text-center">
          <h1>{activeCountry}</h1>
        </div>
        <div className="stacked-area-container">
          <VictoryChart
            scale={{ x: 'time' }}
            animate={{ duration: 1000 }}
            width={700}
            height={500}
          >
            <VictoryStack colorScale="blue">
              {data.map((data, i) => {
                return (
                  <VictoryArea key={i} data={data} interpolation="basis" />
                );
              })}
            </VictoryStack>
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
            <VictoryAxis crossAxis />
          </VictoryChart>
        </div>
        <div className="button-container fluid-container text-center p-3">
          <div className="row">
            {countries.map((country, i) => {
              //   return (
              //     <Button
              //       outline
              //       color="primary"
              //       className={`mr-2 ${
              //         activeCountry === country ? 'active' : null
              //       }`}
              //       key={`country-button-${i}`}
              //       value={i}
              //       onClick={(e) => this.handleClick(e)}
              //     >
              //       {country}
              //     </Button>
              //   );
              // })
              return (
                <div
                  className="col-sm-3 button-container pb-5"
                  key={`country-button-${i}`}
                  value={i}
                  onClick={() => this.handleClick(i)}
                >
                  <img className="bg-button" src={flags[country]} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default StackedAreaGraph;
