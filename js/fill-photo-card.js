const photoCard = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = photoCard.querySelector('.social__comment');
const photoSource = photoCard.querySelector('.big-picture__img').querySelector('img');
const commentsLoader = photoCard.querySelector('.comments-loader');
const photoLikes = photoCard.querySelector('.likes-count');
const photoDescription = photoCard.querySelector('.social__caption');

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
  photoLikes.textContent = picture.likes;
  photoDescription.textContent = picture.description;
  const commentsData = picture.comments;
  commentsLoader.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  let countShownComments = 5;
  if (commentsData.length < 5) {
    countShownComments = commentsData.length;
  }
  console.log(countShownComments);
  for (let i =  0; i < countShownComments; i++) {
    fragment.appendChild(addComment(commentsData[i]));
  }

  photoCard.querySelector('.social__comment-count').textContent = `${countShownComments  } из ${picture.comments.length} комментариев`;

  commentsList.innerHTML = '';

  commentsList.appendChild(fragment);
};

export {renderPhotoCard};
