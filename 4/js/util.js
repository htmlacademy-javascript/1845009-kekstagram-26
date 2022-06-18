// создание случайного числа. Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// проверка строки
const checkStringLength = function (userString, maxLength) {
  return !(userString.length > maxLength);
};

// создание массива значений в заданном диапазоне
const getArray = function (startValue, lastValue) {
  const idArray = [];
  for (let i = startValue; i <= lastValue; i++) {
    idArray.push(i);
  }
  return idArray;
};

// получение случайного значения из массива
const getRandomArrayElement = function (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

// получение и удаление (с целью избежания повторения) случайного значения из массива
const getElementNoRepeat = function (array) {
  return array.splice(getRandomPositiveInteger(0, array.length - 1), 1)[0];
};

export {getRandomPositiveInteger};
export {checkStringLength};
export {getArray};
export {getRandomArrayElement};
export {getElementNoRepeat};
