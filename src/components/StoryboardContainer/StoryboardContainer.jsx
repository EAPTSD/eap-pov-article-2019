// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraph from '../Graphs/BarGraph';
import BarGraphPercentage from '../Graphs/BarGraphPercentage';
import BarGraphContainer from '../Graphs/BarGraphContainer';
import BubbleGraphContainer from '../Graphs/BubbleGraphContainer';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import ChoroplethV3Eap from '../Graphs/ChoroplethV3Eap';
import Header from '../Header';
import HeaderV2 from '../HeaderV2';
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
      firstText: textArray.slice(0, 3),
      secondText: textArray.slice(3, 6),
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
        <div className="StoryboardContainer">
          <HeaderV2 />
          <div className="bg-0">
            <div className="text-container-0">
              {firstText.map((text, i) => {
                return (
                  <p className="text-0" key={`0-text-${i}`}>
                    {i === 0 ? (
                      <>
                        <span className="dropcap-0">P</span>
                        <span className="leadtext-0">
                          IECING TOGETHER THE POVERTY PUZZLE
                        </span>
                      </>
                    ) : null}
                    {text}
                  </p>
                );
              })}
            </div>
            <div className="image-container-0" />
          </div>
          {/* <StackedAreaGraphContainer /> */}
          <div className="bg-1">
            <h2 className="introtext-1">
              Why are broader measures of poverty important?
            </h2>
            <div className="text-container-1">
              {secondText.map((text, i) => {
                return (
                  <p className="text-1" key={`text-${i}`}>
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
          <BubbleGraphContainer flowText={thirdText} />
          <div className="sb-text-container">
            {fourthText.map((text, i) => {
              return (
                <p className="pt-3 sb-text" key={`text-${i}`}>
                  {text}
                </p>
              );
            })}
          </div>
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
        </div>
      </div>
    );
  }
}

export default StoryboardContainer;
