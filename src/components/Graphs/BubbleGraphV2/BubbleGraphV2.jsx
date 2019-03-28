// External Imports
import React from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
} from 'victory';

// Internal Imports
import './BubbleGraphV2.css';

const BubbleGraphV2 = (props) => {
  const { displayData } = props;
  return (
    <VictoryChart
      height={400}
      width={450}
      scale={{ x: 'time' }}
      domain={{
        x: [new Date(2011, 1, 1), new Date(2018, 1, 1)],
        y: [0, 70],
      }}
    >
      <VictoryLegend
        x={203}
        y={50}
        title={`Per-Capita Per-Day Poverty`}
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{
          data: { stroke: 'black', strokeWidth: 1 },
          border: { stroke: 'black' },
          title: { fontSize: 14 },
          labels: { fontSize: 12 },
        }}
        colorScale={['#87CEFA', '#325DDF', '#191970']}
        data={[{ name: '$5.50' }, { name: '$3.20' }, { name: '$1.90' }]}
      />
      <VictoryScatter
        bubbleProperty="size"
        data={displayData}
        style={{
          data: {
            fill: (d) => d.fill,
            stroke: 'black',
            strokeWidth: '1px',
          },
        }}
        labelComponent={<VictoryTooltip />}
        animate={{
          onExit: {
            duration: 500,
            before: () => ({ opacity: 0.3, _y: 0 }),
          },
          onEnter: {
            duration: 500,
            before: () => ({ opacity: 0.3, _y: 0 }),
            after: (datum) => ({ opacity: 1, _y: datum._y }),
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(tick) => `${tick}%`}
        label={'Poverty Rate (Percentage)'}
        axisLabelComponent={<VictoryLabel dy={-12} />}
        style={{
          axisLabel: { fontSize: 12 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      <VictoryAxis
        crossAxis
        style={{
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
    </VictoryChart>
  );
};

export default BubbleGraphV2;
