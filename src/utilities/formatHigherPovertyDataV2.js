const formatHigherPovertyDataV2 = (array, year) => {
  const arr = array.map((d, i) => {
    let obj = {};
    obj.x = year;
    obj.y = parseFloat(d[year]);
    return [obj];
  });

  return arr;
};

export default formatHigherPovertyDataV2;