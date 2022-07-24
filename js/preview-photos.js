import {renderPhotoCard} from './fill-photo-card.js';
import {getElementNoRepeat} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const randomNumber = 10;
const buttonRandomPictures = document.querySelector('#filter-random');
const buttonPopularPictures = document.querySelector('#filter-discussed');
const buttonDefaultPictures = document.querySelector('#filter-default');

const picturesFragment = document.createDocumentFragment();

const displayUsersPictures = function (photos) {
  photos.forEach((picture) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length;

    photoElement.addEventListener('click', () => {
      renderPhotoCard(picture);
    });
    picturesFragment.appendChild(photoElement);
  });
  picturesContainer.appendChild(picturesFragment);
};

const displayDefaultUserPictures = function (photos) {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(photos);
};

const displayRandomUserPictures = function (photos) {
  const photosArray = [];
  const getRandomPhoto = getElementNoRepeat(0, photos.length - 1);
  for (let i = 0; i < randomNumber; i++) {
    photosArray.push(photos[getRandomPhoto()]);
  }
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(photosArray);
};

const displayPopularFirstPictures = function (photos) {
  const sortedPhotos = photos.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(sortedPhotos);
};

const setDefaultButtonClick = function (cb) {
  buttonDefaultPictures.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonDefaultPictures.classList.add('img-filters__button--active');
    cb();
  });
};

const setRandomButtonClick = function (cb) {
  buttonRandomPictures.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonRandomPictures.classList.add('img-filters__button--active');
    cb();
  });
};

const setPopularButtonClick = function (cb) {
  buttonPopularPictures.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonPopularPictures.classList.add('img-filters__button--active');
    cb();
  });
};

export {displayDefaultUserPictures, displayRandomUserPictures, displayPopularFirstPictures, setDefaultButtonClick, setRandomButtonClick, setPopularButtonClick};
