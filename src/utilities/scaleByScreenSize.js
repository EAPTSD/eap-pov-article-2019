const scaleByScreenSize = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth <= 400) {
    return 200;
  } else if (windowWidth <= 550) {
    return 250;
  } else if (windowWidth <= 600) {
    return 275;
  } else if (windowWidth <= 650) {
    return 300;
  } else if (windowWidth <= 700) {
    return 325;
  } else if (windowWidth <= 750) {
    return 345;
  } else if (windowWidth <= 800) {
    return 360;
  } else if (windowWidth <= 900) {
    return 385;
  } else if (windowWidth <= 1440) {
    return 420;
  }
};

export default scaleByScreenSize;
