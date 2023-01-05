import { CARDS } from "../mocks/cards.js"

const initialCards = [...CARDS];
const cardsList = document.querySelector(".games-section");
const CardsDataSelect = document.querySelector(".select-option-game");
const resetButton = document.querySelector(".reset-button");
const selectId = document.getElementById("select");

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

//default cards:

const handleBtnReset = () =>{
    cardsList.innerHTML = "";
    resetButton.style.display = "none";
    selectId.value = "default";

    renderList(cardsList, initialCards, "games-section");
}

//sort cards:

const handleSortCards = (e) =>{
    cardsList.innerHTML = "";
    const sortType = e.target.value;
    let sortedGames = null;

//sort:

    switch (sortType) {
        case "new-first": 
            resetButton.style.display = "block";
            sortedGames = CARDS.sort((a, b) => b.date - a.date);
            break;
        case "new-second":
            resetButton.style.display = "block";
            sortedGames = CARDS.sort((a, b) => a.date - b.date);
            break;        
        }

        renderList(cardsList, sortedGames, "games-section");
        resetButton.addEventListener("click", handleBtnReset);
    }

    CardsDataSelect.addEventListener("change", handleSortCards);
