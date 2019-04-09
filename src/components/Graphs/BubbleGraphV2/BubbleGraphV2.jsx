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
      domainPadding={[0, 10]}
      domain={{
        x: [new Date(2011, 1, 1), new Date(2018, 1, 1)],
        y: [0, 60],
      }}
    >
      <VictoryLegend
        x={230}
        y={40}
        title={`Per-Capita Per-Day Poverty`}
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{
          data: { stroke: 'black', strokeWidth: 1, fontFamily: 'Lora, serif' },
          border: { stroke: 'black' },
          title: { fontSize: 12, fontFamily: 'Lora, serif' },
          labels: { fontSize: 10, fontFamily: 'Lora, serif' },
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
            fontFamily: 'Lora, serif',
          },
        }}
        labelComponent={<VictoryTooltip />}
        animate={{
          onExit: {
            duration: 1000,
            before: () => ({ opacity: 0.3, _y: 0 }),
          },
          onEnter: {
            duration: 1000,
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
  );
};

export default BubbleGraphV2;
