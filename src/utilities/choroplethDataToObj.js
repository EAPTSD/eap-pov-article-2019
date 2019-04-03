const choroplethDataToObj = (array) => {
  let obj = {};
  array.map((subObj) => {
    const key = subObj.adm1_code;
    return (obj[key] = subObj);
  });
  return obj;
};

export default choroplethDataToObj;
