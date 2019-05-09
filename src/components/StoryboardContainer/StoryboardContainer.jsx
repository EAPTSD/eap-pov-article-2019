// External Imports
import React, { Component } from 'react';

// Internal Imports
import appText from '../../text/appText';
import BarGraphContainer from '../Graphs/BarGraphContainer';
import BubbleGraphContainer from '../Graphs/BubbleGraphContainer';
import StackedAreaGraphContainer from '../Graphs/StackedAreaGraphContainer';
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
      screenWidth: null,
    };
    this.StoryboardRef = React.createRef();
  }

  componentDidMount() {
    const textArray = extractText(appText);
    this.setState({
      firstText: textArray.slice(0, 3),
      secondText: textArray.slice(3, 7),
      thirdText: textArray.slice(7, 10),
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
    const { firstText, secondText, thirdText, screenWidth } = this.state;
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
                  <a
                    href="http://www.worldbank.org/en/publication/poverty-and-shared-prosperity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
            <BubbleGraphContainer flowText={secondText} />
            <BarGraphContainer />
            <div className="bg-1">
              <h2 className="introtext-1">
                Half a billion people are not yet economically secure
              </h2>
              <div className="text-container-1">
                <p className="text-1" key="text-1-0">
                  Based on definitions of economic classes discussed in the EAP{' '}
                  <a
                    href="http://documents.worldbank.org/curated/en/770241511445721465/Riding-the-wave-an-East-Asian-miracle-for-the-21st-century"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Riding the Wave
                  </a>{' '}
                  flagship, the economically secure are those that live on
                  between $5.50 to $15 a day (2011 PPP).
                </p>
              </div>
            </div>
            <StackedAreaGraphContainer />
            <div className="parallax-divider" />
            <div className="bg-3">
              <h2 className="introtext-3">
                Developing EAP is a diverse region, with some pockets still
                facing daunting challenges
              </h2>
              <div className="text-container-3">
                <p className="text-3" key="text-3-0">
                  While many countries in EAP have made good progress in
                  tackling poverty, it is important to bear in mind that
                  developing EAP is a diverse region and includes sub-regions
                  that still face daunting poverty reduction challenges.
                  Residents of EAP live at all levels of economic well-being,
                  stability, and environmental fragility. Eight out of{' '}
                  <a
                    href="http://pubdocs.worldbank.org/en/892921532529834051/FCSList-FY19-Final.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    36 countries
                  </a>{' '}
                  in fragile, conflict, or violent (FCV) settings worldwide are
                  located in EAP. Even in relatively stable countries, FCV areas
                  exist; such as Southern Thailand and Mindanao, Philippines.
                  Most developing EAP countries are island nations, which are
                  frequently hit by natural disasters. These disasters are not
                  limited to the seasonal and somewhat predictable, but also
                  include earthquakes and volcanic eruptions that are less
                  foreseeable.
                </p>
                <p className="text-3" key="text-3-0">
                  Large variation in poverty rates exists both within and across
                  countries. Across 78 sub-regions, the $3.20/day poverty rate
                  ranges from 0 percent in Bangkok, Thailand (2017) to 84.5
                  percent in Oecussi, Timor-Leste (2014) (Figure 3). In
                  non-monetary poverty, material deprivations in access to water
                  and sanitation are also higher in rural areas. Developing
                  EAP’s many mountainous regions and remote islands may
                  exacerbate unequal access to services. A more granular view of
                  non-monetary poverty has implications for policy by revealing
                  the types of deprivations of overall disadvantage.
                </p>
              </div>
            </div>
            <ChoroplethContainer />
            <div className="sb-text-container">
              {thirdText.map((text, i) => {
                return (
                  <p className="pt-3 sb-text" key={`text-4-${i}`}>
                    {text}
                  </p>
                );
              })}
              <p className="pt-3 sb-text" key="text-4-2">
                To read more about A Broader View of Poverty in East Asia and
                Pacific, please refer to Part 2A in the Spring 2019’s edition of
                the{' '}
                <a
                  href="https://openknowledge.worldbank.org/handle/10986/31500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  East Asia and Pacific Economic Update
                </a>
                .
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default StoryboardContainer;
