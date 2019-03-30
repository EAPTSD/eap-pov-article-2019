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
  const { color, data, isPercent, externalMutations } = props;
  return (
    <div className="StackedAreaGraphV2-container">
      <VictoryChart
        externalEventMutations={externalMutations}
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
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />
        <VictoryAxis
          crossAxis
          style={{
            tickLabels: { fontSize: 12, padding: 5 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default StackedAreaGraphV2;
