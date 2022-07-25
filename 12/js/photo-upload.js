const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const previewPhoto = document.querySelector('.img-upload__preview').querySelector('img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
});
