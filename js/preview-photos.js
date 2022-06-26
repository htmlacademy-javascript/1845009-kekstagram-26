import {createFotoDescriptions} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const fotoDescriptions = createFotoDescriptions();

fotoDescriptions.forEach(({url, likes, comments}) => {
  const fotoElement = pictureTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = url;
  fotoElement.querySelector('.picture__likes').textContent = likes;
  fotoElement.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(fotoElement);
});

const displayUsersPictures = function () {
  return picturesContainer.appendChild(picturesFragment);
};

export {displayUsersPictures};
