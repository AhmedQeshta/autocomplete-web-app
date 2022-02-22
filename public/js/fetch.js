// -------------- fetch method -------------------------
/*
    to Use it ===> fetch(YourMethod,YourUrl,YourCallback)
    Ex: fetch("GET","http://example.com",(element)=>{
        console.log(element)
    });
*/
function fetch (method, url, payload, cb) {
    const xhr = new XMLHttpRequest();
    const payloadString = JSON.stringify(payload);

    xhr.onreadystatechange = function () {
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

  const get = function (url, cb) { fetch('GET', url, null, cb); }
  const post = function (url, payload, cb) { fetch('POST', url, payload, cb); }
  