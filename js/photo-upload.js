const TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const previewPhotoElement = document.querySelector('.img-upload__preview').querySelector('img');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewPhotoElement.src = URL.createObjectURL(file);
  }
});
