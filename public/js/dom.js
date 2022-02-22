// ----- Helper Selector ---------------
const querySelector = (selector) => {
    return document.querySelector(selector);
};

const createElement = (tagName, value, parent) => {
    let element = document.createElement(tagName);
    element.setAttribute("value", value);
    parent.appendChild(element);
    return element;
};

const addListener = (selector, eventName, callback) => {
    querySelector(selector).addEventListener(eventName, callback);
};

const handleCountries = (countries) => {
    const countriesParent = querySelector("#countries");

    Object.keys(countries).forEach((key) => {
        createElement("option", countries[key], countriesParent);
    });
};

window.onload = () => {
    const countries = {
        Palestine: "palestine",
        Egypt: "egypt",
    };
    handleCountries(countries);
};
