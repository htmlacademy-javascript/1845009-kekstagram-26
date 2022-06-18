const NAMES = [
  'Патрик',
  'Декстер',
  'Джек',
  'Антон',
  'Майкл',
  'Элли',
  'Кэрри',
  'Лори',
  'Энни',
  'Селина',
];

const SURNAMES = [
  'Бейтман',
  'Морган',
  'Торренс',
  'Чигур',
  'Крамер',
  'Драйвер',
  'Уайт',
  'Куэйд',
  'Уилкс',
  'Кайл'
];

const DESCRIPTIONS = [
  'Мое самое любимое фото за последнее время... и единственное',
  'Этому шедевру нужно больше лайков',
  'Обойдемся без занудных описаний',
  'Лайк. Репост. Подписка',
  'Такое навсегда остается в воспоминаниях'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTO_COUNT = 25;

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

checkStringLength('Hello', 6);

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

// получение сообщения в комментарий
const getMessage = function() {
  let message = getRandomArrayElement(MESSAGES);
  const count = getRandomPositiveInteger(1, 2);
  if (count > 1) {
    message = `${message} ${getRandomArrayElement(MESSAGES.filter((item) => item !== message))}`;
  }
  return message;
};

const PHOTO_ID = getArray(1 , 25);
const PHOTO_URL = getArray(1, 25);
const COMMENTS_ID = [];

// создание комментария
const createComment = function () {
  let idComment;
  do {
    idComment = getRandomPositiveInteger(1, 150);
  } while (COMMENTS_ID.includes(idComment));
  COMMENTS_ID.push(idComment);
  return {
    id: idComment,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getMessage(),
    name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
  };
};

// создание описания к фотографии
const createFotoDescription = function () {
  return {
    id: getElementNoRepeat(PHOTO_ID),
    url: `photo/${getElementNoRepeat(PHOTO_URL)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 3)}, createComment),
  };
};

Array.from({length: SIMILAR_PHOTO_COUNT}, createFotoDescription);

