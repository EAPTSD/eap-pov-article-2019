// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraph from '../Graphs/BarGraph';
import BubbleGraph from '../Graphs/BubbleGraph';
import Choropleth from '../Graphs/Choropleth';
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
        <StackedAreaGraphContainer />
        {/* <Header />
        <div>
          {firstText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div>
        <StackedAreaGraph />
        <div>
          {secondText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div>
        <BubbleGraph flowText={thirdText} />
        <div>
          {fourthText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div>
        <BarGraph />
        <div>
          {fifthText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div>
        <div>
          {sixthText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div>
        <Choropleth />
        <div>
          {seventhText.map((text, i) => {
            return (
              <p className="pt-3 sb-text" key={`text-${i}`}>
                {text}
              </p>
            );
          })}
        </div> */}
      </div>
    );
  }
}

export default StoryboardContainer;
