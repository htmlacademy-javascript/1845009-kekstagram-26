import {renderPhotoCard} from './fill-photo-card.js';
import {getElementNoRepeat} from './util.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const randomNumber = 10;
const buttonRandomPictureElements = document.querySelector('#filter-random');
const buttonPopularPictureElements = document.querySelector('#filter-discussed');
const buttonDefaultPictureElements = document.querySelector('#filter-default');

const picturesFragment = document.createDocumentFragment();

const displayUsersPictures = function (photos) {
  photos.forEach((picture) => {
    const photoElement = pictureTemplateElement.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length;

    photoElement.addEventListener('click', () => {
      renderPhotoCard(picture);
    });
    picturesFragment.appendChild(photoElement);
  });
  picturesContainerElement.appendChild(picturesFragment);
};

const displayDefaultUserPictures = function (photos) {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(photos);
};

const displayRandomUserPictures = function (photos) {
  const randomPhotos = [];
  const getRandomPhoto = getElementNoRepeat(0, photos.length - 1);
  for (let i = 0; i < randomNumber; i++) {
    randomPhotos.push(photos[getRandomPhoto()]);
  }
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(randomPhotos);
};

const displayPopularFirstPictures = function (photos) {
  const sortedPhotos = photos.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  displayUsersPictures(sortedPhotos);
};

const setDefaultButtonClick = function (cb) {
  buttonDefaultPictureElements.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonDefaultPictureElements.classList.add('img-filters__button--active');
    cb();
  });
};

const setRandomButtonClick = function (cb) {
  buttonRandomPictureElements.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonRandomPictureElements.classList.add('img-filters__button--active');
    cb();
  });
};

const setPopularButtonClick = function (cb) {
  buttonPopularPictureElements.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    buttonPopularPictureElements.classList.add('img-filters__button--active');
    cb();
  });
};

export {displayDefaultUserPictures, displayRandomUserPictures, displayPopularFirstPictures, setDefaultButtonClick, setRandomButtonClick, setPopularButtonClick};
