module.exports = (app) => {
  const notExists = (value, msg) => {
    if (!value) throw msg;
  };

  const notEquals = (valueA, valueB, msg) => {
    if (valueA !== valueB) throw msg;
  };

  return { notExists, notEquals };
};
