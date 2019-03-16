// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraph from '../Graphs/BarGraph';
import BarGraphPercentage from '../Graphs/BarGraphPercentage';
import BarGraphContainer from '../Graphs/BarGraphContainer';
import BubbleGraph from '../Graphs/BubbleGraph';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import ChoroplethV3Eap from '../Graphs/ChoroplethV3Eap';
import Header from '../Header';
import StackedAreaGraph from '../Graphs/StackedAreaGraph';
import StackedAreaGraphContainer from '../Graphs/StackedAreaGraphContainer';
import extractText from '../../utilities/extractText';
import './StoryboardContainer.css';

class StoryboardContainer extends Component {
  state = {
    firstText: [],
    secondTextA: [],
    secondTextB: [],
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
      secondTextA: textArray.slice(4, 9),
      secondTextB: textArray.slice(9, 14),
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
      secondTextA,
      secondTextB,
      thirdText,
      fourthText,
      fifthText,
      sixthText,
      seventhText,
    } = this.state;
    return (
      <div>
        <ChoroplethV3Eap />
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
            {secondTextA.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
          <StackedAreaGraph />
          <div className="sb-text-container">
            {secondTextB.map((text, i) => {
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
          <BarGraphContainer />
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
