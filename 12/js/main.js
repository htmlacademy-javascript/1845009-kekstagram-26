import './photo-form.js';
import {displayDefaultUserPictures} from './preview-photos.js';
import {displayRandomUserPictures} from './preview-photos.js';
import {displayPopularFirstPictures} from './preview-photos.js';
import {getData} from './data-exchange.js';
import {setUserFormSubmit} from './photo-form.js';
import {setRandomButtonClick} from './preview-photos.js';
import {setPopularButtonClick} from './preview-photos.js';
import {setDefaultButtonClick} from './preview-photos.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  displayDefaultUserPictures(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setDefaultButtonClick(debounce(
    () => displayDefaultUserPictures(photos),
    RERENDER_DELAY));
  setRandomButtonClick(debounce(
    () => displayRandomUserPictures(photos),
    RERENDER_DELAY));
  setPopularButtonClick(debounce(
    () => displayPopularFirstPictures(photos),
    RERENDER_DELAY
  ));
});
setUserFormSubmit();

