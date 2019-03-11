// External Imports
import React from 'react';
import { VictoryChart, VictoryBar } from 'victory';

// Internal Imports
import './BarGraphV2.css';

const color = {
  '< $1.9': '#F1536D',
  '$1.9-$3.2': '#CCEBFF',
  '$3.2-$5.5': '#68C2FF',
  '$5.5-$15': '#006FC2',
  '> $15': '#004A92',
};

const BarGraphV2 = (props) => {
  const { higherPovertyDisplayData } = props;
  return (
    <div className="BarGraphV2-sequence-container">
      <div className="BarGraphV2-container">
        <VictoryChart
          height={400}
          width={400}
          domain={{ y: [0, 1000] }}
          domainPadding={{ x: 25 }}
          animate={{ duration: 1000 }}
        >
          <VictoryBar
            barWidth={35}
            style={{
              data: {
                fill: (d) => color[d.xName],
              },
            }}
            categories={{
              x: ['< $1.9', '$1.9-$3.2', '$3.2-$5.5', '$5.5-$15', '> $15'],
            }}
            data={higherPovertyDisplayData}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default BarGraphV2;
