let currentScale = 1;
let currentScalePercent = 100;
const EFFECTSCALE = 25;
const loadedPhotoElement = document.querySelector('.img-upload__preview');
const scaleValueElement = document.querySelector('.scale__control--value');
scaleValueElement.value = `${currentScalePercent}%`;

const scaleDown = function () {
  if (currentScale > EFFECTSCALE / 100) {
    currentScale = currentScale - EFFECTSCALE / 100;
    currentScalePercent = currentScalePercent - EFFECTSCALE;
    loadedPhotoElement.style.transform = `scale(${currentScale})`;
    scaleValueElement.value = `${currentScalePercent}%`;
  }
};

const scaleUp = function () {
  if (currentScale < 1) {
    currentScale = currentScale + EFFECTSCALE / 100;
    currentScalePercent = currentScalePercent + EFFECTSCALE;
    loadedPhotoElement.style.transform = `scale(${currentScale})`;
    scaleValueElement.value = `${currentScalePercent}%`;
  }
};

const scaleReset = function () {
  currentScale = 1;
  currentScalePercent = 100;
  loadedPhotoElement.style.transform = `scale(${currentScale})`;
  scaleValueElement.value = `${currentScalePercent}%`;
};

export {scaleDown, scaleUp, scaleReset};
