// External Imports
import React from 'react';

// Internal Imports
import './StackedAreaLegend.css';

const StackedAreaLegend = (props) => {
  const {
    povClasses,
    coolColors,
    purpColors,
    highlightArea,
    unhighlightArea,
  } = props;
  return povClasses.map((povClass, i) => {
    return (
      <div
        className="StackedAreaLegend-item"
        onMouseEnter={(event) => highlightArea(i, event)}
        onMouseLeave={(event) => unhighlightArea(i, event)}
      >
        <svg width={60} height={25}>
          <circle
            className="legend-circle"
            cx={25}
            cy={12.5}
            r={7.5}
            stroke="black"
            stroke-width="1"
            fill={coolColors[i]}
          />
          <circle
            className="legend-circle"
            cx={45}
            cy={12.5}
            r={7.5}
            stroke="black"
            stroke-width="1"
            fill={purpColors[i]}
          />
        </svg>
        <span>{povClass}</span>
      </div>
    );
  });
};

export default StackedAreaLegend;
