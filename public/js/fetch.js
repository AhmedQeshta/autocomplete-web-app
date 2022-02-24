// -------------- fetch method -------------------------
/*
    to Use it ===> fetch(YourMethod,YourUrl,YourCallback)
    Ex: fetch("GET","http://example.com",(element)=>{
        console.log(element)
    });
*/

const fetch = (method, url, payload, cb) => {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest();
  const payloadString = JSON.stringify(payload);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      } else {
        cb(true);
      }
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(payloadString);
};

const get = (url, cb) => {
  fetch('GET', url, null, cb);
};
const post = (url, payload, cb) => {
  fetch('POST', url, payload, cb);
};

if (typeof module !== 'undefined') {
  module.exports = { get, post };
}
