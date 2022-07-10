const photoCard = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = photoCard.querySelector('.social__comment');
const photoSource = photoCard.querySelector('.big-picture__img').querySelector('img');

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
  photoSource.src = picture.url;
  photoCard.querySelector('.likes-count').textContent = picture.likes;
  photoCard.querySelector('.comments-count').textContent = picture.comments.length;
  photoCard.querySelector('.social__comment-count').classList.add('hidden');
  photoCard.querySelector('.social__comments-loader').classList.add('hidden');

  photoCard.querySelector('.social__caption').textContent = picture.description;

  const commentsData = picture.comments;
  const fragment = document.createDocumentFragment();
  commentsData.forEach((comment) => fragment.appendChild(addComment(comment)));
  commentsList.innerHTML = '';
  commentsList.appendChild(fragment);
};

export {renderPhotoCard};
