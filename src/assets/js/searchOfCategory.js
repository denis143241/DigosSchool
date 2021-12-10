export const searchOfCategory = (data, category) => {
  return data.filter((test) => test.category === category);
};
