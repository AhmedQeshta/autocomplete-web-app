// ----- Helper Selector ---------------
const querySelector = (selector) => {
    return document.querySelector(selector);
};

const createElement = (tagName, className, parent) => {
    let element = document.createElement(tagName);
    element.className = className;
    parent.appendChild(element);
    return element;
};

const addListener = (selector, eventName, callback) => {
    querySelector(selector).addEventListener(eventName, callback);
};

const handleCountries = (countries) => {
    const countriesParent = querySelector("#countries");
    countries.forEach((country) => {
        const option = createElement("option", "", countriesParent);
        option.setAttribute("value", country);
    });
};

const countryInfoCard = (data) => {
    const cardContainer = querySelector(".country-card");

    const infoGrid = createElement("div", "info-grid", cardContainer);

    const popE = createElement("p", "emoji", infoGrid);
    popE.textContent = "👫";

    const pop = createElement("p", "population", infoGrid);
    pop.textContent = (data.population / 1000000).toFixed(1) + "M";

    const langE = createElement("p", "emoji", infoGrid);
    langE.textContent = "🗣";

    const lang = createElement("p", "", infoGrid);
    lang.id = "lang";
    lang.textContent = Object.values(data.languages)[0];

    const currE = createElement("p", "emoji", infoGrid);
    currE.textContent = "💰";

    const curr = createElement("p", "", infoGrid);
    curr.id = "currency";
    curr.textContent = Object.values(data.currencies)[0].name;

    const mapE = createElement("p", "emoji", infoGrid);
    mapE.textContent = "🗺";

    const map = createElement("button", "", infoGrid);
    map.id = "now-weather";
    map.setAttribute(
        "onclick",
        `window.open('${Object.values(data.maps.googleMaps)}', '_blank')`,
    );
};

addListener("button", "click", () => {
    const formInput = querySelector("#country").value;
    post("../api/country/data", formInput, (data) => {
        countryInfoCard(data[0]);
    });
});

addListener("input", "input", () => {
  const formInput = querySelector("#country").value;
    post("../api/country/filtered",formInput, (data) => {
        document.querySelectorAll("option").forEach((option) => {
          option.remove();
        });
        handleCountries(data);
    });
});
