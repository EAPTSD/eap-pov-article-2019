// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraph from '../Graphs/BarGraph';
import BarGraphPercentage from '../Graphs/BarGraphPercentage';
import BubbleGraph from '../Graphs/BubbleGraph';
import Choropleth from '../Graphs/Choropleth';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import ChoroplethV2Mongolia from '../Graphs/ChoroplethV2Mongolia';
import ChoroplethV2Eap from '../Graphs/ChoroplethV2Eap';
import Header from '../Header';
import StackedAreaGraph from '../Graphs/StackedAreaGraph';
import StackedAreaGraphContainer from '../Graphs/StackedAreaGraphContainer';
import extractText from '../../utilities/extractText';
import './StoryboardContainer.css';

class StoryboardContainer extends Component {
  state = {
    firstText: [],
    secondText: [],
    thirdText: [],
    fourthText: [],
    fifthText: [],
    sixthText: [],
    seventhText: [],
  };

  componentDidMount() {
    const textArray = extractText(appText);
    this.setState({
      firstText: textArray.slice(0, 4),
      secondText: textArray.slice(4, 14),
      thirdText: textArray.slice(14, 24),
      fourthText: textArray.slice(24, 34),
      fifthText: textArray.slice(34, 44),
      sixthText: textArray.slice(44, 54),
      seventhText: textArray.slice(54),
    });
  }

  render() {
    const {
      firstText,
      secondText,
      thirdText,
      fourthText,
      fifthText,
      sixthText,
      seventhText,
    } = this.state;
    return (
      <div>
        <BarGraphPercentage />
        {/* <ChoroplethV2Eap /> */}
        {/* <ChoroplethV2Mongolia /> */}
        {/* <ChoroplethContainer /> */}
        {/* <Header />
        <div className="StoryboardContainer">
          <div className="sb-text-container">
            {firstText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <StackedAreaGraphContainer />
          <div className="sb-text-container">
            {secondText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <BubbleGraph flowText={thirdText} />
          <div className="sb-text-container">
            {fourthText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <BarGraph />
          <BarGraphPercentage /> 
          <div className="sb-text-container">
            {fifthText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <div className="sb-text-container">
            {sixthText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <Choropleth />
          <ChoroplethContainer />
          <div className="sb-text-container">
            {seventhText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
        </div> */}
      </div>
    );
  }
}

export default StoryboardContainer;
