const displayDataPopulator = (array, index) => {
  return array.map((subArr, i) => {
    return subArr.slice(0, index);
  });
};

export default displayDataPopulator;
