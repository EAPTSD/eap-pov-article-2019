// External Imports
import React, { Component } from 'react';

// Internal Imports
import './HeaderV2.css';

class HeaderV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayOpacity: {
        opacity: 0,
      },
    };
    this.HeaderImageRef = React.createRef();
    this.HeaderOverlayRef = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {
    const headerImage = this.HeaderImageRef.current.getBoundingClientRect();
    const headerHeight = headerImage.height;
    const headerOffset = headerImage.y;
    const opacity = (headerOffset / headerHeight) * -1;

    if (headerOffset && opacity < 1.01) {
      this.setState({
        overlayOpacity: {
          opacity: opacity,
        },
      });
    } else if (!headerOffset) {
      this.setState({
        overlayOpacity: {
          opacity: 0,
        },
      });
    }
  };

  render() {
    const { overlayOpacity } = this.state;
    return (
      <div className="HeaderV2-container">
        <div className="full-height-div">
          <div className="HeaderV2-image-container" ref={this.HeaderImageRef} />
          <div className="HeaderV2-bg-overlay" style={overlayOpacity} />
        </div>
        <div className="HeaderV2-intro-slide">
          <div className="HeaderV2-title-container">
            <h1 className="HeaderV2-title">
              Piecing Together
              <br />
              the Poverty Puzzle
            </h1>
            <h2 className="HeaderV2-subtitle">
              A visual exploration of poverty in the developing East Asia and
              Pacific Region
            </h2>
            <span className="byline">
              WORLD BANK - By JUDY YANG, SHIYAO WANG, and DARWIN RINDERER
              <br />
              June 2019
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderV2;
