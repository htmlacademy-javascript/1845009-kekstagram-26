import {isEscapeKey} from './util.js';
import './photo-scale.js';
import {scaleDown, scaleUp, scaleReset} from './photo-scale.js';
import './select-effect.js';
import {effectReset} from './select-effect.js';
import {getSuccessMessage} from './util.js';
import {getErrorMessage} from './util.js';
import {sendData} from './data-exchange.js';
import './photo-upload.js';

const photoUploadForm = document.querySelector('.img-upload__overlay');
const photoUpload = document.querySelector('#upload-file');
const cancelUpload = document.querySelector('#upload-cancel');

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    photoFormClose();
  }
};

function photoFormOpen () {
  photoUploadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  photoUploadForm.querySelector('.scale__control--smaller').addEventListener('click', scaleDown);
  photoUploadForm.querySelector('.scale__control--bigger').addEventListener('click', scaleUp);
  document.addEventListener('keydown', onPopupEscKeydown);
  cancelUpload.addEventListener('click', () => {
    photoFormClose();
  });
}

function photoFormClose () {
  photoUpload.value = '';
  uploadForm.reset();
  pristine.reset();
  effectReset();
  scaleReset();
  photoUploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  cancelUpload.removeEventListener('click', photoFormClose);
}

photoUpload.addEventListener('change', () => {
  photoFormOpen();
});

hashtagsInput.addEventListener('focusin', () => {
  hashtagsInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
});

commentInput.addEventListener('focusin', () => {
  commentInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });
});

function validateHash (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element[0] === '#');
}

pristine.addValidator(hashtagsInput, validateHash, 'Добавьте хэш-тег');

function validateHashSymbols (value){
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element.match(/^[а-яА-ЯёЁa-zA-Z0-9#]+$/));
}

pristine.addValidator(hashtagsInput, validateHashSymbols, 'Введите корректные символы');

function validateHashLength (value) {
  if (value === '') {
    return true;
  }
  return value.split(' ').every((element) => element.length <= 20 && element.length >= 2);
}

pristine.addValidator(hashtagsInput, validateHashLength, 'Длина хэш-тега должна быть от 2 до 20 символов');

function  validateSimilarHashtags (value) {
  const array = value.split(' ');
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].toLowerCase() === array[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
}

pristine.addValidator(hashtagsInput, validateSimilarHashtags, 'Хэш-теги не должны повторяться! Регистр не учитывается');

function validateQuantityHashtags (value) {
  return value.split(' ').length <= 5;
}

pristine.addValidator(hashtagsInput, validateQuantityHashtags, 'Не больше 5 хэш-тегов');

function validateCommentLength (value) {
  return value.length <= 150;
}

pristine.addValidator(commentInput, validateCommentLength, 'Длина комментария не должна превышать 140 символов');

const blockSubmitButton = function () {
  submitButton.disabled = true;
};

const unblockSubmitButton = function () {
  submitButton.disabled = false;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          photoFormClose();
          getSuccessMessage('Изображение успешно загружено');
        },
        () => {
          unblockSubmitButton();
          getErrorMessage('Ошибка загрузки файла');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit, photoFormClose};


