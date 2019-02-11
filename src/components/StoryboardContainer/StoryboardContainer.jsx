// External Imports
import React from 'react';

// Internal Imports
import StackedAreaGraph from '../Graphs/StackedAreaGraph';
import BubbleGraph from '../Graphs/BubbleGraph';
import './StoryboardContainer.css';

const StoryboardContainer = () => {
  return (
    <div>
      <div className="bg-black full-height-container" />
      <div className="bg-blue full-height-container">
        <StackedAreaGraph />
      </div>
      <BubbleGraph />
      <div className="bg-blue full-height-container" />
      <div className="bg-blue full-height-container" />
      <div className="bg-black full-height-container" />
      <div className="bg-grey full-height-container" />
      <div className="bg-grey full-height-container" />
      <div className="bg-grey full-height-container" />
      <div className="bg-black full-height-container" />
      <div className="bg-white full-height-container" />
      <div className="bg-white full-height-container" />
      <div className="bg-white full-height-container" />
      <div className="bg-black full-height-container" />
    </div>
  );
};

export default StoryboardContainer;
