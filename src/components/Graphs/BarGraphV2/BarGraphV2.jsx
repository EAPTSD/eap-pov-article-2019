// External Imports
import React from 'react';
import { VictoryChart, VictoryBar } from 'victory';

// Internal Imports
import './BarGraphV2.css';

const BarGraphV2 = (props) => {
  const { higherPovertyDisplayData } = props;
  return (
    <div className="BarGraphV2-sequence-container">
      <div className="BarGraphV2-container">
        <VictoryChart
          height={400}
          width={400}
          // domain={{ y: [0, 1000] }}
          domainPadding={{ x: 25 }}
          animate={{ duration: 500 }}
        >
          <VictoryBar
            style={{
              data: {
                fill: (d) => (d.xName === '< $1.9' ? '#c43a31' : '#000000'),
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
