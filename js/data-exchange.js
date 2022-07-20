import {displayUsersPictures} from './preview-photos.js';

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    displayUsersPictures(photos);
  });
