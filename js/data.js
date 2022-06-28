import {getRandomPositiveInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getElementNoRepeat} from './util.js';

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

// получение сообщения в комментарий
const getMessage = function() {
  let message = getRandomArrayElement(MESSAGES);
  const count = getRandomPositiveInteger(1, 2);
  if (count > 1) {
    message = `${message} ${getRandomArrayElement(MESSAGES.filter((item) => item !== message))}`;
  }
  return message;
};

const getPhotoId = getElementNoRepeat(1, 25);
const getUrl = getElementNoRepeat(1, 25);
const getIdComment = getElementNoRepeat(100, 200);

// создание комментария
const createComment = function () {
  return {
    id: getIdComment(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getMessage(),
    name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
  };
};

// создание описания к фотографии
const createFotoDescription = function () {
  return {
    id: getPhotoId(),
    url: `photos/${getUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 3)}, createComment),
  };
};

const createFotoDescriptions = function() {
  return Array.from({length: SIMILAR_PHOTO_COUNT}, createFotoDescription);
};

export {createFotoDescriptions};
