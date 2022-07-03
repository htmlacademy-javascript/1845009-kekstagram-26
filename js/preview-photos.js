import {createPhotoDescriptions} from './data.js';
import {openPhotoCard} from './photo-view.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const photoDescriptions = createPhotoDescriptions();

photoDescriptions.forEach((picture) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;

  photoElement.addEventListener('click', () => {
    openPhotoCard(picture);
  });

  picturesFragment.appendChild(photoElement);
});

const displayUsersPictures = function () {
  return picturesContainer.appendChild(picturesFragment);
};

export {displayUsersPictures};
