import {isEscapeKey} from './util.js';

const photoCard = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = photoCard.querySelector('.social__comment');
const photoSource = photoCard.querySelector('.big-picture__img').querySelector('img');
const commentsLoader = photoCard.querySelector('.comments-loader');
const photoLikes = photoCard.querySelector('.likes-count');
const photoDescription = photoCard.querySelector('.social__caption');
const closedButton = photoCard.querySelector('.big-picture__cancel');

const addComment = function (comment) {
  const commentObject = commentTemplate.cloneNode(true);
  const commentPicture = commentObject.querySelector('.social__picture');
  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  const commentText = commentObject.querySelector('.social__text');
  commentText.textContent = comment.message;
  return commentObject;
};

const renderPhotoCard = function (picture) {

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoCard();
    }
  };

  photoCard.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  closedButton.addEventListener('click', closePhotoCard);

  photoSource.src = picture.url;
  photoLikes.textContent = picture.likes;
  photoDescription.textContent = picture.description;
  const commentsData = picture.comments;
  commentsLoader.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  let countShownComments = 5;
  if (commentsData.length < 5) {
    countShownComments = commentsData.length;
  }
  for (let i =  0; i < countShownComments; i++) {
    fragment.appendChild(addComment(commentsData[i]));
  }


  photoCard.querySelector('.social__comment-count').textContent = `${countShownComments  } из ${picture.comments.length} комментариев`;

  commentsList.innerHTML = '';

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
    commentsList.appendChild(fragment1);
    if (countShownComments === commentsData.length) {
      commentsLoader.classList.add('hidden');
    }
    photoCard.querySelector('.social__comment-count').innerHTML = `${countShownComments  } из ${picture.comments.length} комментариев`;
  };

  if (commentsData.length > 5) {
    commentsLoader.classList.remove('visually-hidden');
    commentsLoader.addEventListener('click', updateComments);
  } else {
    commentsLoader.classList.add('visually-hidden');
  }

  function closePhotoCard () {
    photoCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
    closedButton.removeEventListener('click', closePhotoCard);
    commentsLoader.removeEventListener('click', updateComments);
  }
  commentsList.appendChild(fragment);
};

export {renderPhotoCard};
