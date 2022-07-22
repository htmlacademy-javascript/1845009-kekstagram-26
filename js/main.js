import './photo-form.js';
import {displayUsersPictures} from './preview-photos.js';
import {getData} from './data-exchange.js';
import {setUserFormSubmit} from './photo-form.js';

getData(displayUsersPictures);
setUserFormSubmit();

