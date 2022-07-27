const loadedPhotoElement = document.querySelector('.img-upload__preview').querySelector('img');
const effectsRadioElements = document.querySelectorAll('.effects__radio');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.effect-level__value');
let currentClass;

const setChromeEffect = function () {
  currentClass = 'effects__preview--chrome';
  return loadedPhotoElement.classList.add(currentClass);
};

const setSepiaEffect = function () {
  currentClass = 'effects__preview--sepia';
  return loadedPhotoElement.classList.add(currentClass);
};

const setMarvinEffect = function () {
  currentClass = 'effects__preview--marvin';
  return loadedPhotoElement.classList.add(currentClass);
};

const setPhobosEffect = function () {
  currentClass = 'effects__preview--phobos';
  return loadedPhotoElement.classList.add(currentClass);
};

const setHeatEffect = function () {
  currentClass = 'effects__preview--heat';
  return loadedPhotoElement.classList.add(currentClass);
};

const sliderReset = function () {
  loadedPhotoElement.style.filter = '';
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectsRadioElements.forEach((effectRadio) => {
  effectRadio.addEventListener('change', (evt) => {
    evt.preventDefault();
    sliderReset();
    loadedPhotoElement.classList.remove(currentClass);
    switch(effectRadio.value) {
      case 'chrome':
        setChromeEffect();
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });
        sliderContainerElement.classList.remove('visually-hidden');
        break;
      case 'sepia':
        setSepiaEffect();
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });
        sliderContainerElement.classList.remove('visually-hidden');
        break;
      case 'marvin':
        setMarvinEffect();
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          start: 100,
        });
        sliderContainerElement.classList.remove('visually-hidden');
        break;
      case 'phobos':
        setPhobosEffect();
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        sliderContainerElement.classList.remove('visually-hidden');
        break;
      case 'heat':
        setHeatEffect();
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        sliderContainerElement.classList.remove('visually-hidden');
        break;
      case 'none':
        sliderContainerElement.classList.add('visually-hidden');
    }
  });
});

sliderElement.noUiSlider.on('update', () => {
  let activeElement;
  for (let i = 0; i < effectsRadioElements.length; i++) {
    if (effectsRadioElements[i].checked === true) {
      activeElement = effectsRadioElements[i];
    }
  }
  effectLevelElement.value = sliderElement.noUiSlider.get();
  switch (activeElement.value) {
    case 'chrome':
      loadedPhotoElement.style.filter = `grayscale(${effectLevelElement.value})`;
      break;
    case 'sepia':
      loadedPhotoElement.style.filter = `sepia(${effectLevelElement.value})`;
      break;
    case 'marvin':
      loadedPhotoElement.style.filter = `invert(${effectLevelElement.value}%)`;
      break;
    case 'phobos':
      loadedPhotoElement.style.filter = `blur(${effectLevelElement.value}px)`;
      break;
    case 'heat':
      loadedPhotoElement.style.filter = `brightness(${effectLevelElement.value})`;
      break;
  }
});

const resetEffets = function () {
  loadedPhotoElement.classList.remove(currentClass);
  loadedPhotoElement.style.filter = '';
  sliderContainerElement.classList.add('visually-hidden');
  document.querySelector('#effect-none').checked = true;
};

export {resetEffets};
