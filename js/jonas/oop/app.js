'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // #필드: private 필드
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      // getCurrentPosition(성공 콜백 함수, 에러 콜백 함수)
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        console.log('Error,,');
      });
    }
  }

  _loadMap = (position) => {
    // position: coords: {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed}
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm);
  };

  _showForm = (event) => {
    this.#mapEvent = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  };

  _toggleElevationField() {
    // closest(): 해당 요소와 가장 가까운 상위 요소 선택
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    inputDistance.value = '';
    inputCadence.value = '';
    inputDuration.value = '';
    inputElevation.value = '';

    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Hello World!')
      .openPopup();
  }
}

const app = new App();
