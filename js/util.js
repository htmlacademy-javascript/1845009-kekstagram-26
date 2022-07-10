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

// получение случайного значения из массива
const getRandomArrayElement = function (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
};

// получение случайного значения без повтора в диапазоне
const getElementNoRepeat = function (min, max) {
  const numbers = [];
  return function () {
    let randomNumber = getRandomPositiveInteger(min, max);
    if (numbers.length >= (max - min + 1)) {
      return null;
    }
    while (numbers.includes(randomNumber)) {
      randomNumber = getRandomPositiveInteger(min, max);
    }
    numbers.push(randomNumber);
    return randomNumber;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomPositiveInteger};
export {checkStringLength};
export {getRandomArrayElement};
export {getElementNoRepeat};
export {isEscapeKey};
