// External Imports
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

// Internal Imports
import './BarGraphV2.css';

const color = {
  'Extreme-Poor': '#F1536D',
  'Moderately-Poor': '#CCEBFF',
  'Vulnerable': '#68C2FF',
  'Secure': '#006FC2',
  'Middle-Class': '#004A92',
};

const BarGraphV2 = (props) => {
  const { higherPovertyDisplayData } = props;
  return (
    <div className="BarGraphV2-container">
      <VictoryChart
        height={400}
        width={600}
        domain={{ y: [0, 1000] }}
        domainPadding={{ x: 35 }}
        animate={{ duration: 800, easing: 'cubic' }}
      >
        <VictoryBar
          barWidth={40}
          style={{
            data: {
              fill: (d) => color[d.xName],
              fontFamily: 'Lora, serif',
            },
          }}
          categories={{
            x: ['Extreme-Poor', 'Moderately-Poor', 'Vulnerable', 'Secure', 'Middle-Class'],
          }}
          data={higherPovertyDisplayData}

        />
        <VictoryAxis
          dependentAxis
          label={'Population (Million)'}
          axisLabelComponent={<VictoryLabel dy={-12} />}
          style={{
            tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Lora, serif' },
            axisLabel: { fontFamily: 'Lora, serif' },
          }}
        />
        <VictoryAxis
          crossAxis
          style={{
            tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Lora, serif' },
            axisLabel: { fontFamily: 'Lora, serif' },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BarGraphV2;
