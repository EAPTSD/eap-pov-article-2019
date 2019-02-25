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
          //theme={VictoryTheme.grayscale}
          animate={{ duration: 1500 }}
          width={450}
          height={400}
        >
          <VictoryStack colorScale={color}>
            {data.map((data, i) => {
              return <VictoryArea key={i} data={data} interpolation="basis" />;
            })}
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
};

export default StackedAreaGraphTwo;
