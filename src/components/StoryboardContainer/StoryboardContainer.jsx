// External Imports
import React from 'react';

// Internal Imports
import BarGraphContainer from '../Graphs/BarGraphContainer';
//import BubbleGraphContainer from '../Graphs/BubbleGraphContainer';
import StackedAreaGraphContainer from '../Graphs/StackedAreaGraphContainer';
import ChoroplethContainer from '../Graphs/ChoroplethContainer';
import HeaderV2 from '../HeaderV2';
import RotatePhone from '../RotatePhone';
import './StoryboardContainer.css';

const StoryboardContainer = () => {
  return (
    <div className="StoryboardContainer">
      <RotatePhone />
      <div className="StoryboardContent">
        <HeaderV2 />
        <div className="bg-0">
          <h2 className="introtext-0">
          Piecing together the poverty puzzle means widening the ways in which we define and measure poverty. 
          </h2>
          <div className="text-container-0">
            <p className="text-0" key="text-0-0">
            Our conceptualization of what poverty is in the developing East Asia and Pacific (EAP) region should change as incomes and aspirations rise in these middle income countries. A larger suite of poverty measures helps to broaden our view and understanding of poverty.
            </p>
            <p className="text-0" key="text-0-1">
            Monitoring poverty at higher poverty lines is increasingly important as countries grow richer. Poverty is also multi-faceted and non-monetary in nature.   
            </p>
            <p className="text-0" key="text-0-2">
            A broader view of poverty reveals there is still much work to be done in developing EAP, even though extreme poverty is now less prevalent.
            </p>
            <p className="text-0" key="text-0-3">
            This article discusses pieces of the poverty puzzle that were introduced in the{' '}
              <a
                href="http://www.worldbank.org/en/publication/poverty-and-shared-prosperity"
                target="_blank"
                rel="noopener noreferrer"
              >
                2018 Poverty and Shared Prosperity
              </a>{' '}
              flagship to complement the existing World Bank twin goals of ending extreme poverty and boosting shared prosperity.
            </p>
          </div>
        </div>
        
        {/* --------------------BAR GRAPH SECTION, CHANGING POPULATION OVER TIME----------------------*/}

        <div className="bg-2">
          <h2 className="introtext-2">Almost a billion people have been lifted out of extreme poverty over the past quarter century.</h2>
          
          <div className="text-container-2">
            <p className="text-2" key="text-2-0">
              Today, the majority of developing EAP, over a billion people are economically secure, living between $5.5 and $15/day.
            </p>
          </div>

          <BarGraphContainer />
          
          <h2 className="introtext-2">However, half a billion people are not yet economically secure.</h2>
          
          <div className="text-container-2">
           <p className="text-2" key="text-2-0"> 
           ADD SOMETHING ON ECONOMIC SECURITY
           </p>
          </div>

          <div className="text-container-2">
            <p className="text-2" key="text-2-0">
              For defintions of economic classes used in developing EAP, see the {' '}
              <a
                href="http://documents.worldbank.org/curated/en/770241511445721465/Riding-the-wave-an-East-Asian-miracle-for-the-21st-century"
                target="_blank"
                rel="noopener noreferrer"
              >
                Riding the Wave
              </a>{' '}
              flagship.
            </p>          
          </div>
        </div>


                  
        {/* --------------------STACKED GRAPH SECTION---------------------*/}

        <div className="bg-3">
          <h2 className="introtext-3">
          In 2018, about a quarter of developing EAP were middle-class.
          
          </h2>
          <div className="text-container-3">          
          <p className="text-3" key="text-3-1">
            While EAP has been extremely successful at reducing poverty, building middle-class societies may be more challenging for the region. 
             Outside of EAP’s wealthiest countries, the middle-class is small in size or growing slowly. In the Philippines, the size of the middle-class has hardly changed over the last decade.
           </p>
           <p className="text-3" key="text-3-1">
            Growth strategies that helped to eradicate extreme poverty in most of developing EAP will likely not be sufficient to also lift households into the middle-class.  
            Outward oriented growth, basic human capital development, and sound economic governance helped lift a billion people in EAP out of extreme poverty. 
            Yet, these foundational policies will not guarantee that a billion people will also be lifted into the middle-class. 
            The EAP regional middle-class poverty line is almost eight times higher than the international poverty line. 
            Countries and challenges are also evolving. Even as the size of the middle-class is increasing, middle-class households can still be exposed to risks and fall back into poverty. 
            This is a relevant concern as the region experiences uncertainties from trade tensions, slowing growth, and elections. 
            </p>
          </div>
        </div>
        
        {/* --------------------BUBBLE GRAPH SECTION---------------------*/}

         {/* <BubbleGraphContainer /> */}

        {/* ----------------------------------------------------------------------------------------*/}

       < StackedAreaGraphContainer />

        {/* ---------------- MAP SECTION -----------------------------------------------------------*/}


        <div className="bg-4">
          <h2 className="introtext-4">
            Developing EAP is a diverse region, with some areas still facing daunting challenges
          </h2>
          <div className="text-container-4">
            <p className="text-4" key="text-4-0">
              While many countries in EAP have made good progress in tackling
              poverty, it is important to bear in mind that developing EAP is a
              diverse region and includes sub-regions that still face daunting
              poverty reduction challenges. Residents of EAP live at all levels
              of economic well-being, stability, and environmental fragility.
              Eight out of{' '}
              <a
                href="http://pubdocs.worldbank.org/en/892921532529834051/FCSList-FY19-Final.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                36 countries
              </a>{' '}
              in fragile, conflict, or violent (FCV) settings worldwide are
              located in EAP. Even in relatively stable countries, FCV areas
              exist; such as Southern Thailand and Mindanao, Philippines. Most
              developing EAP countries are island nations, which are frequently
              hit by natural disasters. These disasters are not limited to the
              seasonal and somewhat predictable, but also include earthquakes
              and volcanic eruptions that are less foreseeable.
            </p>
            <p className="text-4" key="text-4-1">
              Large variation in poverty rates exists both within and across
              countries. Across 78 sub-regions, the $3.20/day poverty rate
              ranges from 0 percent in Bangkok, Thailand (2017) to 84.5 percent
              in Oecussi, Timor-Leste (2014) (Figure 3). In non-monetary
              poverty, material deprivations in access to water and sanitation
              are also higher in rural areas. Developing EAP’s many mountainous
              regions and remote islands may exacerbate unequal access to
              services. A more granular view of non-monetary poverty has
              implications for policy by revealing the types of deprivations of
              overall disadvantage.
            </p>
          </div>
        </div>
        <ChoroplethContainer />


        {/* ----CLOSING SECTION------------------------------------------------------------------------------------*/}
        <div className="bg-5">
          <div className="text-container-5">
            <p className="text-5" key="text-5-0">
              Our conceptualization of what poverty is in developing East Asia
              and Pacific should adapt as incomes and aspirations rise, and
              countries work on expanding their middle-class societies and
              transitioning to high-income status. As societies prosper, higher
              standards for monitoring refer not only to higher poverty lines to
              account for higher costs of living in wealthier societies but also
              to accessible and high-quality public services. A broader view of
              poverty, including higher poverty lines and multidimensional
              poverty measures, reveals there is still much work to be done in
              middle-income countries, even though extreme poverty is now less
              prevalent.
            </p>
            <p className="text-5" key="text-5-1">
              This view helps to enhance policy dialogue and craft policies that
              are more relevant and targeted. A larger suite of global measures,
              grounded in tools that countries already use to monitor progress,
              can facilitate enhanced dialogue by offering a rich set of
              comparable instruments for countries to assess their performance.
              To facilitate relevant and targeted policies, new and existing
              indicators should be monitored in a more disaggregated manner,
              both geographically as well as at the individual level. When this
              is done, pockets of poor are more noticeable, even in relatively
              well-off countries.
            </p>
          </div>
        </div>
        <div className="bg-6">
          <div className="text-container-6">
            <p className="text-6" key="text-6-0">
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
        </div>
      </div>
    </div>
  );
};

export default StoryboardContainer;
