import { COMMENTS } from "../mocks/comments.js"

const commentsList = document.querySelector(".clients-say-comments");

const renderItem = (comment) =>{
    const liElement = document.createElement("li");

    liElement.innerHTML = `
    <li class="clients-say-comments-list">
        <h5 class="clients-say-comments-name">${comment.genre}
        <span class="clients-say-comments-name2"> star </span>  </h5>
        <p class="clients-say-comments-text">${comment.comment}</p>
    <div class="clients-info">
        <img class="clients-img" src="../assets/img/${comment.img}.png" alt="client1 avatar">
        <div class="clients-name">
            <p>${comment.userName}</p>
            <a href="mailto:">@${comment.userNickName}</a>
        </div>
    </div>
    </li>
    `;

    return liElement;
}

const renderList = (element, list, className) =>{
    const divElement = document.createElement("div");
    divElement.classList.add("clients-say-comment");

    const completeDivElement = list.reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        divElement.classList.add(className);

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(commentsList, COMMENTS, "clients-say-comment");