import { CARDS } from '../mocks/cards';

// const initialCards = [...CARDS];
const cardsList = document.querySelector(".games-section");
// const filterSearchBoxView = document.querySelector(".filter__search-box-view");
// const resetButton = document.querySelector(".reset-button");
// const selectId = document.getElementById("select");


//render cards:

const renderItem = (card) =>{
    const liElement = document.createElement("li");
    // liElement.classList.add("game-card");
    // liElement.setAttribute("id", card.id);

    liElement.innerHTML = `
        <img class="game-img" src="../assets/img/games/${card.img}.png" alt=${card.alt}
        <div class="card-wrap-text">
            <div class="card-wrap-text-left">
                <h4 class="game-name">${card.gameName}</h4>
                <p class="game-description">${card.gameDescription}</p>
            </div> 
            <diw class="card-wrap-text-right">
                <h4 class="user-name">${card.userName}</h4>
                <p class="user-review">${card.userReview}</p>
            </diw>
        </div>
    `;

    return liElement;
}

const renderList = (element, list, className) => {
    const divElement = document.createElement("div");
    // divElement.classList.add(className);
    

    const completeDivElement = list.reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        divElement.classList.add(className);

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(cardsList, CARDS, "games-section");