const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const form = document.querySelector("#form");
const listpictures=  document.querySelector(".pictures-wrapper");

runEvent();

function runEvent(){
    searchButton.addEventListener("click",clear);
    searchButton.addEventListener("click",search);
    clearButton.addEventListener("click",clear)
}

function search(e) {
    let value = document.querySelector("#input").value
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method :`GET`,
        headers:{
            Authorization: `Client-ID LHSSgmRP1V7xRp7OiWISSOTaEmneHAfFiF97Lx9sN1k`
        }
    })
    .then((response)=>response.json())
    .then(showPictures)
    .catch((err)=>console.log(err))
    document.querySelector("#input").value="";
    e.preventDefault();
}
function clear(e) {
    Array.from(listpictures.children).forEach((item)=>item.remove())
    e.preventDefault();
}
function showPictures(pictures) {
    Array.from(pictures.results).forEach((item)=>{
        let div = createElement(item.urls.small)
        listpictures.appendChild(div);
    })
}
function createElement(url) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = url
    img.height="400"
    img.width="400"
    div.className = "card"
    div.appendChild(img);
    return div
}