// External Imports
import React, { Component } from 'react';
import * as d3 from 'd3';

// Internal Imports
import BarGraphV2 from '../BarGraphV2';
import formatHigherPovertyData from '../../../utilities/formatHigherPovertyData';
import './BarGraphContainer.css';

// Data
import higherPovertyData from '../../../data/BarGraphData/EAP_higher_pov.csv';

class BarGraphContainer extends Component {
  state = {
    higherPovertyDisplayData: [],
    reserveData: [],
    years: [
      2002,
      2003,
      2004,
      2005,
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
    ],
    index: 1,
  };

  componentDidMount() {
    const { years } = this.state;
    console.log(years.length);
    Promise.all([d3.csv(higherPovertyData)]).then((files) => {
      const formattedHigherPovertyData = formatHigherPovertyData(
        files[0],
        years
      );
      this.setState(
        {
          higherPovertyDisplayData: formattedHigherPovertyData[0],
          reserveData: formattedHigherPovertyData,
        },
        () => {
          this.updateGraph();
        }
      );
    });
  }

  updateGraph = () => {
    setInterval(() => {
      const { reserveData, index } = this.state;
      console.log(index);
      console.log(reserveData[index]);
      this.setState({
        higherPovertyDisplayData: reserveData[index],
        index: index === 16 ? 0 : index + 1,
      });
    }, 1300);
  };

  render() {
    const { higherPovertyDisplayData } = this.state;
    // console.log(higherPovertyDisplayData);
    return (
      <div className="BarGraphContainer-sequence-container BarGraphContainer-sticky container-fluid">
        <div className="BarGraphContainer-container row">
          <div className="col-sm">
            <BarGraphV2 higherPovertyDisplayData={higherPovertyDisplayData} />
          </div>
        </div>
      </div>
    );
  }
}

export default BarGraphContainer;
