import { values } from 'core-js-pure/es/object';

const formatPovertyData = (array, color) => {
  const obj = {};

  // eslint-disable-next-line
  array.map((d, i) => {
    if (i === 0) {
      const arrObj = Object.keys(d).map((year, i) => {
        return (obj[i] = { x: new Date(year, 1, 1), fill: color });
      });
      values(d).map((value, i) => {
        return (arrObj[i].y = parseFloat(value));
      });
      return i <= 7 ? arrObj.slice(0, 7) : null;
    }
    values(d).map((value, i) => {
      return (obj[i].size = parseFloat(value) / 100);
    });
  });

  const arr = [obj];
  delete arr[0][7];
  return values(arr[0]);
};

export default formatPovertyData;
