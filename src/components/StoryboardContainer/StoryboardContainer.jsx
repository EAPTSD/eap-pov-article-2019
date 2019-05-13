// External Imports
import React, { Component } from 'react';

// Internal Imports
import BarGraphContainer from '../Graphs/BarGraphContainer';
import BubbleGraphContainer from '../Graphs/BubbleGraphContainer';
import StackedAreaGraphContainer from '../Graphs/StackedAreaGraphContainer';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import HeaderV2 from '../HeaderV2';
import RotatePhone from '../RotatePhone';
import './StoryboardContainer.css';

class StoryboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: null,
    };
    this.StoryboardRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
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
    const { screenWidth } = this.state;
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
                <p className="text-0" key="text-0-0">
                  Economic progress in East Asia and Pacific (EAP) has greatly
                  contributed to the global reduction of extreme poverty. The
                  more prosperous countries in the region – China, Thailand, and
                  Malaysia – now have poverty rates measured by the $1.90/day
                  (2011 PPP) International Poverty Line of less than 1 percent.
                </p>
                <p className="text-0" key="text-0-1">
                  Yet, many citizens in developing EAP would not believe that
                  their societies are without poverty. Rising incomes and wealth
                  over the past three decades have led to questions as to
                  whether the $1.90 International Poverty Line is now too low to
                  adequately capture whether or not someone is poor in the
                  region. This concern is especially relevant for developing
                  EAP, which is composed exclusively of lower-middle- and
                  upper-middle-income countries. Conceptions of poverty and the
                  standards of living to which people aspire are much higher
                  than what is benchmarked by the International Poverty Line.
                </p>
                <p className="text-0" key="text-0-2">
                  At the same time, poverty is a complex and multifaceted
                  problem. In addition to monetary deprivation, individuals may
                  suffer from lack of access to basic infrastructure, education,
                  and other critical services. Piecing together the poverty
                  puzzle means widening the ways in which we define and measure
                  poverty, acknowledging that poverty is not one-dimensional nor
                  solely monetary in nature.
                </p>
                <p className="text-0" key="text-0-3">
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
            <BubbleGraphContainer />
            <BarGraphContainer />
            <div className="bg-2">
              <h2 className="introtext-2">
                Half a billion people are not yet economically secure
              </h2>
              <div className="text-container-2">
                <p className="text-2" key="text-2-0">
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
                <p className="text-3" key="text-3-1">
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
            <div className="bg-4">
              <div className="text-container-4">
                <p className="text-4" key="text-4-0">
                  Our conceptualization of what poverty is in developing East
                  Asia and Pacific should adapt as incomes and aspirations rise,
                  and countries work on expanding their middle-class societies
                  and transitioning to high-income status. As societies prosper,
                  higher standards for monitoring refer not only to higher
                  poverty lines to account for higher costs of living in
                  wealthier societies but also to accessible and high-quality
                  public services. A broader view of poverty, including higher
                  poverty lines and multidimensional poverty measures, reveals
                  there is still much work to be done in middle-income
                  countries, even though extreme poverty is now less prevalent.
                </p>
                <p className="text-4" key="text-4-1">
                  This view helps to enhance policy dialogue and craft policies
                  that are more relevant and targeted. A larger suite of global
                  measures, grounded in tools that countries already use to
                  monitor progress, can facilitate enhanced dialogue by offering
                  a rich set of comparable instruments for countries to assess
                  their performance. To facilitate relevant and targeted
                  policies, new and existing indicators should be monitored in a
                  more disaggregated manner, both geographically as well as at
                  the individual level. When this is done, pockets of poor are
                  more noticeable, even in relatively well-off countries.
                </p>
                <p className="text-4 pt-3" key="text-4-2">
                  To read more about A Broader View of Poverty in East Asia and
                  Pacific, please refer to Part 2A in the Spring 2019’s edition
                  of the{' '}
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
            </div>
          </>
        )}
      </div>
    );
  }
}

export default StoryboardContainer;
