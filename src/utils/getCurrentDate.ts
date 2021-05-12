const getCurrentDate = (): string => {
  const addZero = (n: number) => {
    return n < 10 ? "0" + n : n;
  };

  const date = new Date();

  const result =
    date.getFullYear().toString() +
    addZero(date.getMonth() + 1) +
    addZero(date.getDate()) +
    addZero(date.getHours()) +
    addZero(date.getMinutes()) +
    addZero(date.getSeconds());

  return result;
};

export default getCurrentDate;
