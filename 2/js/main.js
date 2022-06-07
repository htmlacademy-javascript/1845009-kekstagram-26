const getRandomNumber = function(min, max) {
  if (min < 0 || min >= max) {
    return 'Необходимо задать корректные значения диапазона: стартовое значение больше или равно нулю и меньше конечного';
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkStringLength = function(userString, maxLength) {
  return !(userString.length > maxLength);
};

getRandomNumber(0, 52);
checkStringLength('sdfsdfsdfsd', 140);
