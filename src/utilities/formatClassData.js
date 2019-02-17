import { values } from 'core-js-pure/es/object';

const formatClassData = (array) => {
  return array.map((d, i) => {
    const obj = {};
    const arrObj = Object.keys(d).map((year, i) => {
      return (obj[i] = { x: parseInt(year) });
    });
    values(d).map((value, i) => {
      return (arrObj[i].y = parseFloat(value));
    });
    return i <= 18 ? arrObj.slice(0, 18) : null;
  });
};

export default formatClassData;
