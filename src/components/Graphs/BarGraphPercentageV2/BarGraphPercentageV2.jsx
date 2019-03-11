// External Imports
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryStack } from 'victory';

// Internal Imports
import './BarGraphPercentageV2.css';

const color = {
  '1': '#F1536D',
  '2': '#CCEBFF',
  '3': '#68C2FF',
  '4': '#006FC2',
  '5': '#004A92',
};

const BarGraphPercentageV2 = (props) => {
  const { percHigherPovertyDisplayData } = props;
  return (
    <div className="BarGraphPercentageV2-sequence-container">
      <div className="BarGraphPercentageV2-container">
        <VictoryChart height={400} width={400} domainPadding={{ x: 25 }}>
          <VictoryStack
            colorScale={['red', 'yellow', 'blue', 'black', 'green']}
          >
            {percHigherPovertyDisplayData &&
              percHigherPovertyDisplayData.map((data, i) => {
                return (
                  <VictoryBar
                    data={data}
                    style={{
                      data: {
                        fill: (d) => color[d.stack],
                      },
                    }}
                    key={i}
                    barWidth={25}
                    animate={{
                      onEnter: {
                        duration: 500,
                      },
                    }}
                  />
                );
              })}
          </VictoryStack>
          <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
          <VictoryAxis tickFormat={[2002, 2006, 2010, 2014, 2018]} />
        </VictoryChart>
      </div>
    </div>
  );
};

export default BarGraphPercentageV2;
