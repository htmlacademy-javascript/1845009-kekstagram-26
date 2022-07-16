const loadedPhoto = document.querySelector('.img-upload__preview').querySelector('img');
const effectsRadios = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
let currentClass;

const setChromeEffect = function () {
  currentClass = 'effects__preview--chrome';
  return loadedPhoto.classList.add(currentClass);
};

const setSepiaEffect = function () {
  currentClass = 'effects__preview--sepia';
  return loadedPhoto.classList.add(currentClass);
};

const setMarvinEffect = function () {
  currentClass = 'effects__preview--marvin';
  return loadedPhoto.classList.add(currentClass);
};

const setPhobosEffect = function () {
  currentClass = 'effects__preview--phobos';
  return loadedPhoto.classList.add(currentClass);
};

const setHeatEffect = function () {
  currentClass = 'effects__preview--heat';
  return loadedPhoto.classList.add(currentClass);
};

const sliderReset = function () {
  loadedPhoto.style.filter = '';
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

effectsRadios.forEach((effectRadio) => {
  effectRadio.addEventListener('change', (evt) => {
    evt.preventDefault();
    sliderReset();
    loadedPhoto.classList.remove(currentClass);
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
        sliderContainer.classList.remove('visually-hidden');
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
        sliderContainer.classList.remove('visually-hidden');
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
        sliderContainer.classList.remove('visually-hidden');
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
        sliderContainer.classList.remove('visually-hidden');
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
        sliderContainer.classList.remove('visually-hidden');
        break;
      case 'none':
        sliderContainer.classList.add('visually-hidden');
    }
  });
});

sliderElement.noUiSlider.on('update', () => {
  let activeElement;
  for (let i = 0; i < effectsRadios.length; i++) {
    if (effectsRadios[i].checked === true) {
      activeElement = effectsRadios[i];
    }
  }
  effectLevel.value = sliderElement.noUiSlider.get();
  switch (activeElement.value) {
    case 'chrome':
      loadedPhoto.style.filter = `grayscale(${effectLevel.value})`;
      break;
    case 'sepia':
      loadedPhoto.style.filter = `sepia(${effectLevel.value})`;
      break;
    case 'marvin':
      loadedPhoto.style.filter = `invert(${effectLevel.value}%)`;
      break;
    case 'phobos':
      loadedPhoto.style.filter = `blur(${effectLevel.value}px)`;
      break;
    case 'heat':
      loadedPhoto.style.filter = `brightness(${effectLevel.value})`;
      break;
  }
});

const effectReset = function () {
  loadedPhoto.classList.remove(currentClass);
  loadedPhoto.style.filter = '';
  sliderContainer.classList.add('visually-hidden');
  document.querySelector('#effect-none').checked = true;
};

export {effectReset};
