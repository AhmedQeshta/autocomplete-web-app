/* eslint-disable no-undef */
// ----- Helper Selector ---------------
const querySelector = (selector) => document.querySelector(selector);

const createElement = (tagName, className, parent) => {
  const element = document.createElement(tagName);
  element.className = className;
  parent.appendChild(element);
  return element;
};

const addListener = (selector, eventName, callback) => {
  querySelector(selector).addEventListener(eventName, callback);
};

const handleCountries = (countries) => {
  const countriesParent = querySelector('#countries');
  countries.forEach((country) => {
    const option = createElement('option', '', countriesParent);
    option.setAttribute('value', country);
  });
};

const countryInfoCard = (data) => {
  const cardContainer = querySelector('.country-details');

  const cardHeader = createElement('div', 'allign-item', cardContainer);

  const mqmargin = createElement('div', 'mq-margin', cardHeader);

  const countryName = createElement('h1', 'country-name', mqmargin);
  countryName.id = 'name';
  countryName.textContent = data.name.common;

  const countryContinent = createElement('h2', '', mqmargin);
  countryContinent.id = 'continent';

  const continents = data.continents[0];
  countryContinent.textContent = continents;

  const countryFlag = createElement('img', '', cardHeader);
  countryFlag.id = 'flag';
  countryFlag.src = data.flags.svg;

  const infoGrid = createElement('div', 'info-grid', cardContainer);

  const popE = createElement('p', 'emoji', infoGrid);
  popE.textContent = '👫';

  const pop = createElement('p', 'population', infoGrid);
  const populationText = (data.population / 1000000).toFixed(1);
  pop.textContent = `${populationText}M`;

  const langE = createElement('p', 'emoji', infoGrid);
  langE.textContent = '🗣';

  const lang = createElement('p', '', infoGrid);
  lang.id = 'lang';
  const languagesText = Object.values(data.languages)[0];
  lang.textContent = languagesText;

  const currE = createElement('p', 'emoji', infoGrid);
  currE.textContent = '💰';

  const curr = createElement('p', '', infoGrid);
  curr.id = 'currency';
  curr.textContent = Object.values(data.currencies)[0].name;

  const mapE = createElement('p', 'emoji', infoGrid);
  mapE.textContent = '🗺';

  const map = createElement('button', 'btn-location', infoGrid);
  map.id = 'btn-location';
  map.textContent = 'Go To Location';
  map.setAttribute(
    'onclick',
    `window.open('${data.maps.googleMaps}', '_blank')`
  );
};

addListener('button', 'click', () => {
  const formInput = querySelector('#country').value;
  post('/api/country/data', formInput, (data) => {
    const collection = querySelector('.country-details');
    if (data.status === 404) {
      collection.innerHTML = '';
      const div = createElement('div', 'default-svg', collection);
      div.id = 'default-svg';
      const img = createElement('img', '', div);
      img.src = 'https://i.top4top.io/p_2245ysaw51.png';
      querySelector('#text-error').classList.remove('hiden');
      querySelector('#text-error').textContent = data.message;
    } else {
      collection.innerHTML = '';
      querySelector('#text-error').classList.add('hiden');
      countryInfoCard(data[0]);
    }
  });
});

addListener('input', 'input', () => {
  const formInput = querySelector('#country').value;
  post('/api/country/filtered', formInput, (data) => {
    document.querySelectorAll('option').forEach((option) => {
      option.remove();
    });
    handleCountries(data);
  });
});
