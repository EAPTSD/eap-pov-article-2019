// External Imports
import React from 'react';

// Internal Imports
import PleaseRotate from '../../images/PleaseRotate';
import './RotatePhone.css';

const RotatePhone = () => {
  return (
    <div className="RotatePhone-container">
      <div className="RotatePhone-img-container">
        <PleaseRotate />
      </div>
      <h1 className="RotatePhone-header">Kindly Rotate Your Phone</h1>
      <h2 className="RotatePhone-subheader">
        This experience contains maps and other imagery best viewed in landscape
        orientation
      </h2>
    </div>
  );
};

export default RotatePhone;
