import React from 'react';

const StackedAreaLegend = (props) => {
  const { povClasses, coolColors, warmColors } = props;
  return povClasses.map((povClass, i) => {
    return (
      <>
        <svg width={60} height={25}>
          <circle
            cx={25}
            cy={12.5}
            r={7.5}
            stroke="black"
            stroke-width="1"
            fill={coolColors[i]}
          />
          <circle
            cx={45}
            cy={12.5}
            r={7.5}
            stroke="black"
            stroke-width="1"
            fill={warmColors[i]}
          />
        </svg>
        <span>{povClass}</span>
      </>
    );
  });
};

export default StackedAreaLegend;
