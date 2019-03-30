const formatHigherPovertyData = (array, years) => {
  const category = ['< $1.9', '$1.9-$3.2', '$3.2-$5.5', '$5.5-$15', '> $15'];
  return years.map((year) => {
    return array.map((d, i) => {
      let obj = {};
      obj.x = category[i];
      obj.y = parseFloat(d[year]);
      return obj;
    });
  });
};

export default formatHigherPovertyData;
