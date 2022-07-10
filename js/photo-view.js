import {isEscapeKey} from './util.js';
import {renderPhotoCard} from './fill-photo-card.js';

const photoCard = document.querySelector('.big-picture');
const closedButton = photoCard.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoCard();
  }
};

function openPhotoCard (picture) {
  photoCard.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  renderPhotoCard(picture);
  closedButton.addEventListener('click', closePhotoCard);
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closePhotoCard () {
  photoCard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  closedButton.removeEventListener('click', closePhotoCard);
}

export {openPhotoCard};
