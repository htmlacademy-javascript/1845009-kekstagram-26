import {isEscapeKey} from './util.js';
import './photo-scale.js';
import {scaleDown, scaleUp, scaleReset} from './photo-scale.js';
import './select-effect.js';
import {resetEffets} from './select-effect.js';
import {getSuccessMessage} from './util.js';
import {getErrorMessage} from './util.js';
import {sendData} from './data-exchange.js';
import './photo-upload.js';

const photoUploadFormElement = document.querySelector('.img-upload__overlay');
const photoUploadElement = document.querySelector('#upload-file');
const cancelUploadElement = document.querySelector('#upload-cancel');

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const LIMITHASHTAGS = 5;
const LIMITSYMBOLS = 140;

const pristine = new Pristine (uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const photoFormClose = function () {
  photoUploadElement.value = '';
  uploadFormElement.reset();
  pristine.reset();
  resetEffets();
  scaleReset();
  photoUploadFormElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  cancelUploadElement.removeEventListener('click', photoFormClose);
};

const photoFormOpen = function () {
  photoUploadFormElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  photoUploadFormElement.querySelector('.scale__control--smaller').addEventListener('click', scaleDown);
  photoUploadFormElement.querySelector('.scale__control--bigger').addEventListener('click', scaleUp);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      photoFormClose();
    }
  }, {once : true});
  cancelUploadElement.addEventListener('click', () => {
    photoFormClose();
  });
};

photoUploadElement.addEventListener('change', () => {
  photoFormOpen();
});

hashtagsInputElement.addEventListener('focusin', () => {
  hashtagsInputElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
});

commentInputElement.addEventListener('focusin', () => {
  commentInputElement.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
});

const validateHash = function (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element[0] === '#');
};

pristine.addValidator(hashtagsInputElement, validateHash, '???????????????? ??????-??????');

const validateHashSymbols = function (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element.match(/^[??-????-??????a-zA-Z0-9#]+$/));
};

pristine.addValidator(hashtagsInputElement, validateHashSymbols, '?????????????? ???????????????????? ??????????????');

const validateHashLength = function (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element.length <= 20 && element.length >= 2);
};

pristine.addValidator(hashtagsInputElement, validateHashLength, '?????????? ??????-???????? ???????????? ???????? ???? 2 ???? 20 ????????????????');

const validateSimilarHashtags = function (value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].toLowerCase() === array[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(hashtagsInputElement, validateSimilarHashtags, '??????-???????? ???? ???????????? ??????????????????????! ?????????????? ???? ??????????????????????');

const validateQuantityHashtags = function (value) {
  return value.split(' ').length <= LIMITHASHTAGS;
};

pristine.addValidator(hashtagsInputElement, validateQuantityHashtags, `???? ???????????? ${LIMITHASHTAGS} ??????-??????????`);

const validateCommentLength = function (value) {
  return value.length <= LIMITSYMBOLS;
};

pristine.addValidator(commentInputElement, validateCommentLength, `?????????? ?????????????????????? ???? ???????????? ?????????????????? ${LIMITSYMBOLS} ????????????????`);

const blockSubmitButton = function () {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = function () {
  submitButtonElement.disabled = false;
};

const setUserFormSubmit = function () {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          photoFormClose();
          getSuccessMessage('?????????????????????? ?????????????? ??????????????????');
        },
        () => {
          unblockSubmitButton();
          getErrorMessage('???????????? ???????????????? ??????????');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, photoFormClose};


