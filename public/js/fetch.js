// -------------- fetch method -------------------------
/*
    to Use it ===> fetch(YourMethod,YourUrl,YourCallback)
    Ex: fetch("GET","http://example.com",(element)=>{
        console.log(element)
    });
*/
const fetch = (method, url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                return callback(response);
            } else if (xhr.status === 404) {
                window.location.href = "../html/error.html";
            }
        }
    };
    xhr.open(method, url, false);
    xhr.send();
};
