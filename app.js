
const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

let selects = document.querySelectorAll(".conversion select");
let output=document.querySelector(".btn button");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let result=document.querySelector("#res");

for(let select of selects){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.value=currCode;
        newOption.innerText=currCode;
        if(select.name==="from" && newOption.value==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && newOption.value==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

const updatecurrency = async () => {
    let input = document.querySelector(".input #amt");
    let inputval=input.value;
    if(inputval==="" || inputval < 1){
        inputval=1;
        input.value="1";
    }
    const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let responce=await fetch(URL);
    let data=await responce.json();
    let f1=fromcurr.value.toLowerCase();
    let t1=tocurr.value.toLowerCase();
    let r1=data[f1][t1];
    let final=inputval*r1;
    result.innerText=`${inputval} ${fromcurr.value} = ${final} ${tocurr.value}`;
};

output.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updatecurrency();
});