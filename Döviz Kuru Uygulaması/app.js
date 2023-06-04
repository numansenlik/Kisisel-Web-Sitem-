const form = document.querySelector("#form");
const input =document.querySelector("#input");
const output=document.querySelector("#output");
const baseKur= document.querySelector("#baseKur");
const secondKur=document.querySelector("#secondKur");

runEvent();

function runEvent() {
    window.addEventListener("load",showKurOptions);
    input.addEventListener("keyup",changeKur);
    baseKur.addEventListener("change",changeKur);
    secondKur.addEventListener("change",changeKur);
    input.addEventListener("change",changeKur);
    
}

function showKurOptions() {
    fetch("https://api.freecurrencyapi.com/v1/latest?apikey=aUph67WhH0bCjMbyjCI6CbLyJ5WosGLgUARbkh8Y")
    .then((response)=>response.json())
    .then(kurOlusturma)
    .catch((err)=>console.log(err))
}

function kurOlusturma(data) {
    for (const key in data.data) {
        let option= document.createElement("option");
        let option2 = document.createElement("option")
        option2.name=key
        option2.text=key
        option.name=key;
        option.text=key;
        if (key == "USD") {
            option.selected= true;   
        }else if(key == "TRY"){
            option2.selected = true;
        }
        baseKur.appendChild(option);
        secondKur.appendChild(option2);
    }
}
function changeKur(e) {
    let baseOption= baseKur.value;
    let secondOption = secondKur.value;
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=aUph67WhH0bCjMbyjCI6CbLyJ5WosGLgUARbkh8Y&base_currency=${baseOption}`)
    .then(response=>response.json())
    .then(calculate)
}

function calculate(data) {
    for (const kur in data.data) {
        if (kur === secondKur.value) {
            let value = data.data[kur]
            let sonuc = parseFloat(value) * parseFloat(input.value);
            if (isNaN(parseInt(sonuc))) {
                output.value= 0
            }else{
                output.value =parseFloat(sonuc).toFixed(2);
            }
            
        }
    }

}