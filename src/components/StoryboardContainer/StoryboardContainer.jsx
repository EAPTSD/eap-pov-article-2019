// External Imports
import React from 'react';

// Internal Imports
import BarGraph from '../Graphs/BarGraph';
import BubbleGraph from '../Graphs/BubbleGraph';
import Choropleth from '../Graphs/Choropleth';
import Header from '../Header';
import StackedAreaGraph from '../Graphs/StackedAreaGraph';
import './StoryboardContainer.css';

const StoryboardContainer = () => {
  return (
    <div>
      <Header />
      <div className="bg-black full-height-container" />
      <div className="bg-blue full-height-container">
        <StackedAreaGraph />
      </div>
      <div className="bg-blue full-height-container" />
      <BubbleGraph />
      <div className="bg-black full-height-container" />
      <div className="bg-grey full-height-container" />
      <BarGraph />
      <div className="bg-grey full-height-container" />
      <div className="bg-grey full-height-container" />
      <div className="bg-black full-height-container" />
      <Choropleth />
      <div className="bg-white full-height-container" />
      <div className="bg-white full-height-container" />
      <div className="bg-black full-height-container" />
    </div>
  );
};

export default StoryboardContainer;
