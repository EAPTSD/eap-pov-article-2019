// External Imports
import React from 'react';
import { VictoryChart, VictoryStack, VictoryArea, VictoryTheme } from 'victory';

// Internal Imports
import './StackedAreaGraphTwo.css';

const StackedAreaGraphTwo = (props) => {
  const { color, data } = props;
  return (
    <div>
      <div className="StackedAreaGraphTwo-container">
        <VictoryChart
          scale={{ x: 'time' }}
          theme={VictoryTheme.material}
          animate={{ duration: 1000 }}
        >
          <VictoryStack colorScale={color}>
            {data.map((data, i) => {
              return <VictoryArea key={i} data={data} />;
            })}
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
};

export default StackedAreaGraphTwo;
