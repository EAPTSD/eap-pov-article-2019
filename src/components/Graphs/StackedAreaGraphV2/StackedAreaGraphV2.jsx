// External Imports
import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryStack,
  VictoryArea,
  VictoryLabel,
} from 'victory';

// Internal Imports
import './StackedAreaGraphV2.css';

const StackedAreaGraphV2 = (props) => {
  const { color, data, isPercent } = props;
  return (
    <div className="StackedAreaGraphV2-container">
      <VictoryChart
        events={[
          {
            target: 'data',
          },
        ]}
        scale={{ x: 'time' }}
        animate={{ duration: 1500 }}
        width={500}
        height={450}
      >
        <VictoryStack colorScale={color}>
          {data.map((data, i) => {
            return (
              <VictoryArea
                name={`area-${i}`}
                key={i}
                data={data}
                interpolation="basis"
              />
            );
          })}
        </VictoryStack>
        <VictoryAxis
          dependentAxis
          tickFormat={isPercent ? (tick) => `${tick}%` : null}
          label={isPercent ? 'Population (Percentage)' : 'Population (Million)'}
          axisLabelComponent={<VictoryLabel dy={-12} />}
          style={{
            axisLabel: { fontSize: 12, fontFamily: 'Lora, serif' },
            tickLabels: { fontSize: 10, padding: 5, fontFamily: 'Lora, serif' },
          }}
        />
        <VictoryAxis
          crossAxis
          style={{
            tickLabels: { fontSize: 10, padding: 5, fontFamily: 'Lora, serif' },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default StackedAreaGraphV2;
