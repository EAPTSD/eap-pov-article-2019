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
      <div className="Header-title">
        <h1>Lorem Ipsum</h1>
      </div>
    </div>
  );
};

export default Header;
