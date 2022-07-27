import {isEscapeKey} from './util.js';

const photoCardElement = document.querySelector('.big-picture');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = photoCardElement.querySelector('.social__comment');
const photoSourceElement = photoCardElement.querySelector('.big-picture__img').querySelector('img');
const commentsLoaderElement = photoCardElement.querySelector('.comments-loader');
const photoLikesElement = photoCardElement.querySelector('.likes-count');
const photoDescriptionElement = photoCardElement.querySelector('.social__caption');
const closedButtonElement = photoCardElement.querySelector('.big-picture__cancel');

const addComment = function (comment) {
  const commentObject = commentTemplateElement.cloneNode(true);
  const commentPictureElement = commentObject.querySelector('.social__picture');
  commentPictureElement.src = comment.avatar;
  commentPictureElement.alt = comment.name;
  const commentTextElement = commentObject.querySelector('.social__text');
  commentTextElement.textContent = comment.message;
  return commentObject;
};

const renderPhotoCard = function (picture) {
  photoCardElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  photoSourceElement.src = picture.url;
  photoLikesElement.textContent = picture.likes;
  photoDescriptionElement.textContent = picture.description;
  const commentsData = picture.comments;
  commentsLoaderElement.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  let countShownComments = 5;
  if (commentsData.length < 5) {
    countShownComments = commentsData.length;
  }
  for (let i =  0; i < countShownComments; i++) {
    fragment.appendChild(addComment(commentsData[i]));
  }


  photoCardElement.querySelector('.social__comment-count').textContent = `${countShownComments  } из ${picture.comments.length} комментариев`;

  commentsListElement.innerHTML = '';

  const updateComments = function (evt) {
    evt.preventDefault();
    const fragment1 = document.createDocumentFragment();
    let count = 5;
    if ((commentsData.length - countShownComments) < 5 && (commentsData.length - countShownComments) > 0) {
      count = commentsData.length - countShownComments;
    }
    for (let i = countShownComments; i < countShownComments + count; i++) {
      fragment1.appendChild(addComment(commentsData[i]));
    }
    countShownComments = countShownComments + fragment1.children.length;
    commentsListElement.appendChild(fragment1);
    if (countShownComments === commentsData.length) {
      commentsLoaderElement.classList.add('hidden');
    }
    photoCardElement.querySelector('.social__comment-count').textContent = `${countShownComments  } из ${picture.comments.length} комментариев`;
  };

  const closePhotoCard = function () {
    photoCardElement.classList.add('hidden');
    closedButtonElement.removeEventListener('click', closePhotoCard);
    commentsLoaderElement.removeEventListener('click', updateComments);
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoCard();
    }
  }, {once: true});
  closedButtonElement.addEventListener('click', closePhotoCard);

  if (commentsData.length > 5) {
    commentsLoaderElement.classList.remove('visually-hidden');
    commentsLoaderElement.addEventListener('click', updateComments);
  } else {
    commentsLoaderElement.classList.add('visually-hidden');
  }

  commentsListElement.appendChild(fragment);
};

export {renderPhotoCard};
