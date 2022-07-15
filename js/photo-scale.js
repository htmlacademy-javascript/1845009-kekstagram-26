let currentScale = 1;
let currentScalePercent = 100;
const loadedPhoto = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');
scaleValue.value = `${currentScalePercent}%`;

const scaleDown = function () {
  if (currentScale > 0.25) {
    currentScale = currentScale - 0.25;
    currentScalePercent = currentScalePercent - 25;
    loadedPhoto.style.transform = `scale(${currentScale})`;
    scaleValue.value = `${currentScalePercent}%`;
  }
};

const scaleUp = function () {
  if (currentScale < 1) {
    currentScale = currentScale + 0.25;
    currentScalePercent = currentScalePercent + 25;
    loadedPhoto.style.transform = `scale(${currentScale})`;
    scaleValue.value = `${currentScalePercent}%`;
  }
};

const scaleReset = function () {
  currentScale = 1;
  currentScalePercent = 100;
  loadedPhoto.style.transform = `scale(${currentScale})`;
  scaleValue.value = `${currentScalePercent}%`;
};

export {scaleDown, scaleUp, scaleReset};
