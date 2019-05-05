// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraphContainer from '../Graphs/BarGraphContainer';
import BubbleGraphContainer from '../Graphs/BubbleGraphContainer';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import HeaderV2 from '../HeaderV2';
import RotatePhone from '../RotatePhone';
import extractText from '../../utilities/extractText';
import './StoryboardContainer.css';

class StoryboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstText: [],
      secondText: [],
      thirdText: [],
      fourthText: [],
      fifthText: [],
      sixthText: [],
      screenWidth: null,
    };
    this.StoryboardRef = React.createRef();
  }

  componentDidMount() {
    const textArray = extractText(appText);
    this.setState({
      firstText: textArray.slice(0, 3),
      secondText: textArray.slice(3, 4),
      thirdText: textArray.slice(4, 6),
      fourthText: textArray.slice(6, 9),
      fifthText: textArray.slice(9, 11),
      sixthText: textArray.slice(9, 11),
      screenWidth: window.innerWidth,
    });

    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
    });
  };

  render() {
    const {
      firstText,
      secondText,
      thirdText,
      fourthText,
      fifthText,
      sixthText,
      screenWidth,
    } = this.state;
    return (
      <div className="StoryboardContainer" ref={this.StoryboardRef}>
        {screenWidth < 485 ? (
          <RotatePhone />
        ) : (
          <>
            <HeaderV2 />
            <div className="bg-0">
              <h2 className="introtext-0">
                Higher standards are required to match higher aspirations in
                middle-income countries
              </h2>
              <div className="text-container-0">
                {firstText.map((text, i) => {
                  return (
                    <p className="text-0" key={`text-0-${i + 1}`}>
                      {text}
                    </p>
                  );
                })}
                <p className="text-0" key="text-0-4">
                  New pieces of the poverty puzzle were introduced in the{' '}
                  <a href="http://www.worldbank.org/en/publication/poverty-and-shared-prosperity">
                    2018 Poverty and Shared Prosperity
                  </a>{' '}
                  flagship to complement the existing World Bank measures of
                  poverty, aimed at meeting the twin goals of ending extreme
                  poverty and boosting shared prosperity. These new pieces
                  include higher poverty lines and a multidimensional poverty
                  measure.
                </p>
              </div>
            </div>
            <div className="bg-1">
              <h2 className="introtext-1">
                Why are broader measures of poverty important?
              </h2>
              <div className="text-container-1">
                {secondText.map((text, i) => {
                  return (
                    <p className="text-1" key={`text-1a-${i}`}>
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
            <BarGraphContainer />
            <div className="bg-1-special">
              <div className="text-container-1">
                {thirdText.map((text, i) => {
                  return (
                    <p className="text-1" key={`text-1b-${i}`}>
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
            <BubbleGraphContainer flowText={fourthText} />
            <div className="parallax-divider" />
            <div className="bg-3">
              <h2 className="introtext-3">
                Non-monetary measures are important to tackle poverty in all its
                forms
              </h2>
              <div className="text-container-3">
                {fifthText.map((text, i) => {
                  return (
                    <p className="text-3" key={`text-3-${i}`}>
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
            <ChoroplethContainer />
            <div className="sb-text-container">
              {sixthText.map((text, i) => {
                return (
                  <p className="pt-3 sb-text" key={`text-${i}`}>
                    {text}
                  </p>
                );
              })}
            </div>
            {/* <StackedAreaGraphContainer /> */}
          </>
        )}
      </div>
    );
  }
}

export default StoryboardContainer;
