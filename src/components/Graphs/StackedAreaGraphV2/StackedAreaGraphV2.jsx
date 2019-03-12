// External Imports
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryStack, VictoryArea } from 'victory';

// Internal Imports
import './StackedAreaGraphV2.css';

const StackedAreaGraphV2 = (props) => {
  const { color, data, isPercent } = props;
  return (
    <div>
      <div className="StackedAreaGraphV2-container">
        <VictoryChart
          scale={{ x: 'time' }}
          animate={{ duration: 1500 }}
          width={350}
          height={300}
        >
          <VictoryStack colorScale={color}>
            {data.map((data, i) => {
              return <VictoryArea key={i} data={data} interpolation="basis" />;
            })}
          </VictoryStack>
          {isPercent && (
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
          )}
          {isPercent && <VictoryAxis crossAxis />}
        </VictoryChart>
      </div>
    </div>
  );
};

export default StackedAreaGraphV2;
