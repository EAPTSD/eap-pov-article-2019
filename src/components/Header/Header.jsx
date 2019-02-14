// External Imports
import React from 'react';

// Internal Imports
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container container-fluid">
      <div class="row full-height-div">
        <div class="left-image-container full-height-div col-sm" />
        <div class="middle-image-container full-height-div col-sm" />
        <div class="right-image-container full-height-div col-sm" />
      </div>
    </div>
  );
};

export default Header;
