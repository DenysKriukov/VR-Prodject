import { USERS } from "../mocks/users.js"

const authedHeaderAvatar = document.querySelector(".auth-header-avatar");

const renderItem = (user) =>{
    const divElement = document.createElement("div");

    divElement.innerHTML = `
    <button class="authed-header-btn">
    <img class="authed-header-btn-img"
    src="../assets/img/${user.img}.png"
    alt="user-icon"/>
    `;
    
    return divElement;
}

const renderList = (element, list, className) =>{
    const divElement = document.createElement("div");

    const completeDivElement = list.slice(0, 1).reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        divElement.classList.add(className);

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(authedHeaderAvatar, USERS, "auth-header-avatar");