const formatHigherPovertyData = (array, year) => {
  // eslint-disable-next-line
  const arr = array.map((d, i) => {
    let obj = {};
    obj.x = i;
    obj.y = parseFloat(d[year]);
    return obj;
  });

  return arr;
};

export default formatHigherPovertyData;
