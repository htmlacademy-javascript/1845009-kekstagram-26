const photoCard = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = photoCard.querySelector('.social__comment');
const photoSource = photoCard.querySelector('.big-picture__img').querySelector('img');
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

const openPhotoCard = function (picture) {
  photoCard.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  photoSource.src = picture.url;
  photoCard.querySelector('.likes-count').textContent = picture.likes;

  const commentsNumber = picture.comments.length;

  photoCard.querySelector('.comments-count').textContent = commentsNumber;
  photoCard.querySelector('.social__comment-count').classList.add('hidden');
  photoCard.querySelector('.social__comments-loader').classList.add('hidden');

  photoCard.querySelector('.social__caption').textContent = picture.description;

  const commentsData = picture.comments;
  const fragment = document.createDocumentFragment();
  commentsData.forEach((comment) => fragment.appendChild(addComment(comment)));

  closedButton.addEventListener('click', () => {
    photoCard.classList.add('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      photoCard.classList.add('hidden');
    }
  });
  commentsList.innerHTML = '';
  return commentsList.appendChild(fragment);
};

export {openPhotoCard};
