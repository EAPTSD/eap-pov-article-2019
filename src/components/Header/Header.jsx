// External Imports
import React from 'react';

// Internal Imports
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container container-fluid">
      <div className="row full-height-div">
        <div className="left-image-container full-height-div col-sm" />
        <div className="middle-image-container full-height-div col-sm" />
        <div className="right-image-container full-height-div col-sm" />
      </div>
      <div className="Header-title-container">
        <h1 className="Header-title">Piecing Together the Poverty Puzzle</h1>
        <h2 className="Header-subtitle">
          A visual exploration of poverty in the developing East Asia and
          Pacific Region
        </h2>
      </div>
    </div>
  );
};

export default Header;
