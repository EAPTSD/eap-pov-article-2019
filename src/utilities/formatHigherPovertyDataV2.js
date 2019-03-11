import { values } from 'core-js-pure/es/object';

const transformDataforDisplay = (dataset) => {
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].y;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.x, y: (datum.y / totals[i]) * 100 };
    });
  });
};

const formatHigherPovertyDataV2 = (array) => {
  const structuredArray = array.map((d, i) => {
    const obj = {};
    const arrObj = Object.keys(d).map((year, i) => {
      return (obj[i] = { x: parseInt(year) });
    });
    values(d).map((value, i) => {
      return (arrObj[i].y = parseFloat(value));
    });
    return i <= 5 ? arrObj.slice(0, 5) : null;
  });

  return transformDataforDisplay(structuredArray);
};

export default formatHigherPovertyDataV2;
