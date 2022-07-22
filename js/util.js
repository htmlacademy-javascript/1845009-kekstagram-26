const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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

const getSuccessMessage = function (title) {
  const message = successMessageTemplate.cloneNode(true);
  message.querySelector('.success__title').textContent = title;
  message.querySelector('.success__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.querySelector('body').appendChild(message);
};

const getErrorMessage = function (title) {
  const message = errorMessageTemplate.cloneNode(true);
  message.querySelector('.error__title').textContent = title;
  message.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.addEventListener('click', (evt) => {
    if (evt.target !== document.querySelector('.success')) {
      message.remove();
    }
  });
  document.querySelector('body').appendChild(message);
};

const getErrorDataMessage = function (title) {
  const message = errorMessageTemplate.cloneNode(true);
  message.querySelector('.error__title').textContent = title;
  message.querySelector('.error__button').textContent = 'Перезагрузить страницу';
  message.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
    location.reload();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  }, {once: true});
  document.querySelector('body').appendChild(message);
};

export {getRandomPositiveInteger};
export {checkStringLength};
export {getRandomArrayElement};
export {getElementNoRepeat};
export {isEscapeKey};
export {getSuccessMessage};
export {getErrorMessage};
export {getErrorDataMessage};
