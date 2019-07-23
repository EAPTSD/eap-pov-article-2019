const formatHigherPovertyData = (array, years) => {
  const category = [
    'Extreme-Poor',
    'Moderately-Poor',
    'Vulnerable',
    'Secure',
    'Middle-Class',
  ];
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
