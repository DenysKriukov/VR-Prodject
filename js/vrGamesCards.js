import { CARDS } from "../mocks/cards.js"

const initialCards = [...CARDS];
const cardsList = document.querySelector(".games-section");

//render cards:

const renderItem = (card) =>{
    const liElement = document.createElement("li");
    liElement.classList.add("game-card-list");



    liElement.innerHTML = `
    <div class="game-card" data-aos="flip-right">
        <img class="game-img" src="../assets/img/games/${card.img}.png" alt=${card.alt}> 
        <div class="card-wrap-text">
            <div class="card-wrap-text-left">
                <h4 class="game-name">${card.gameName}</h4>
                <p class="game-description">${card.gameDescription}</p>
            </div> 
            <diw class="card-wrap-text-right">
                <h4 class="user-name">${card.user.userName}</h4>
                <p class="user-review">${card.user.userReview}</p>
            </diw>
        </div>
    </div>
    `;

    return liElement;
}

const renderList = (element, list, className) => {
    const divElement = document.createElement("div");
      divElement.classList.add(className);
    

    const completeDivElement = list.slice(0,12).reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(cardsList, CARDS, "games-section");