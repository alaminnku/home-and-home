export const createSlug = (name) => name.toLowerCase().split(" ").join("-");

export const convertNumber = (number) =>
  parseFloat(number).toLocaleString("en-US");
