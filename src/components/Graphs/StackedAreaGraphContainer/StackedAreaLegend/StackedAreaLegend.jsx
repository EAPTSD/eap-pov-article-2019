// External Imports
import React from 'react';

// Internal Imports
import './StackedAreaLegend.css';

const StackedAreaLegend = (props) => {
  const { povClasses, coolColors, purpColors } = props;
  return povClasses.map((povClass, i) => {
    return (
      <div className="StackedAreaLegend-item" key={`legend-item-${i}`}>
        <svg width={60} height={25}>
          <circle
            className="legend-circle"
            cx={25}
            cy={12.5}
            r={7.5}
            stroke="black"
            strokeWidth="1"
            fill={coolColors[i]}
          />
          <circle
            className="legend-circle"
            cx={45}
            cy={12.5}
            r={7.5}
            stroke="black"
            strokeWidth="1"
            fill={purpColors[i]}
          />
        </svg>
        <span className="StackedAreaLegend-item-text">{povClass}</span>
      </div>
    );
  });
};

export default StackedAreaLegend;
