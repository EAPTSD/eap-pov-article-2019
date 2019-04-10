// External Imports
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

// Internal Imports
import './BarGraphV2.css';

const color = {
  '< $1.9': '#F1536D',
  '$1.9 - $3.2': '#CCEBFF',
  '$3.2 - $5.5': '#68C2FF',
  '$5.5 - $15': '#006FC2',
  '> $15': '#004A92',
};

const BarGraphV2 = (props) => {
  const { higherPovertyDisplayData } = props;
  return (
    <div className="BarGraphV2-container">
      <VictoryChart
        height={400}
        width={450}
        // domain={{ y: [0, 1000] }}
        domainPadding={{ x: 35 }}
        animate={{ duration: 800 }}
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
            x: ['< $1.9', '$1.9 - $3.2', '$3.2 - $5.5', '$5.5 - $15', '> $15'],
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
