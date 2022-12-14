import { USERS } from "../mocks/users.js"

const heroPeople = document.querySelector(".hero-people-list");

const renderItem = (user) =>{
    const liElement = document.createElement("li");
    liElement.classList.add("hero-people-list-item");

    liElement.innerHTML = `
    <li>
    <img src="../assets/img/${user.img}.png" 
    class="hero-people-img" 
    alt="client avatar">
    </li>
    `;

    return liElement;
}

const renderList = (element, list, className) =>{
    const divElement = document.createElement("div");

    const completeDivElement = list.slice(0, 4).reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        divElement.classList.add(className);

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(heroPeople, USERS, "hero-people-list");