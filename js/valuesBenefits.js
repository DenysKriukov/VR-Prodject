import { BENEFITS } from "../mocks/benefits.js";

const valuesBenefits = document.querySelector(".company-values-benefits");

const renderItem = (benefit) =>{
    const divElement = document.createElement("div");
    divElement.classList.add("company-values-benefits");
    divElement.style.display = "flex";
    divElement.style.flexDirection = "column";
    divElement.style.textAlign = "center";
    divElement.style.width = "110px";

    divElement.innerHTML = `
        <img
        src="../assets/icons/${benefit.img}.svg"
        alt="${benefit.alt}"/>
        <p>${benefit.caption}</p>
    `;
   

    return divElement;
}

const renderList = (element, list) =>{
    const divElement = document.createElement("div");

    const completeDivElement = list.reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        divElement.style.display = "flex";
        divElement.style.flexWrap = "wrap";
        divElement.style.justifyContent = "space-between";
        divElement.style.width = "234px";
        divElement.style.gap = "9px";
        
        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(valuesBenefits, BENEFITS);